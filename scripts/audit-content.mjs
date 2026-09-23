import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const LOCALES = ["en", "fr", "de", "es", "ko", "zh"];
const PROJECTS_SOURCE = "src/components/sections/projects-page-content.tsx";
const PATENTS_SOURCE = "src/data/patents.ts";
const PATENT_TITLES = "src/data/patent-titles.json";
const PATENT_LOCALIZATIONS = "src/data/patent-localizations.json";
const PROJECTS_GENERATED = "src/data/projects.generated.json";
const PROJECT_ASSET_MANIFEST = "public/assets/projects/manifest.json";

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function flattenMessages(value, prefix = "", output = {}) {
  for (const [key, child] of Object.entries(value)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (child && typeof child === "object" && !Array.isArray(child)) {
      flattenMessages(child, nextKey, output);
    } else {
      output[nextKey] = child;
    }
  }

  return output;
}

function unique(values) {
  return [...new Set(values)];
}

function reportIssue(title, values) {
  if (!values.length) return false;

  console.error(`\n${title}`);
  for (const value of values) console.error(`- ${value}`);
  return true;
}

let hasErrors = false;

const projectsSource = readText(PROJECTS_SOURCE);
const projectsAst = ts.createSourceFile(
  PROJECTS_SOURCE,
  projectsSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
const patentsSource = readText(PATENTS_SOURCE);
const patentIds = new Set(
  [...patentsSource.matchAll(/"id": "([^"]+)"/g)].map((match) => match[1]),
);
const relatedPatentIds = unique(
  [...projectsSource.matchAll(/relatedPatent\(\s*"([^"]+)"/g)].map(
    (match) => match[1],
  ),
);

hasErrors =
  reportIssue(
    "Project links reference missing patent IDs:",
    relatedPatentIds.filter((patentId) => !patentIds.has(patentId)),
  ) || hasErrors;

const patentTitles = readJson(PATENT_TITLES);
const patentLocalizations = readJson(PATENT_LOCALIZATIONS);
const generatedProjects = readJson(PROJECTS_GENERATED);
const patentTitleIssues = [];

for (const locale of LOCALES) {
  const titles = patentTitles[locale] ?? {};
  const maxTitleLength = locale === "ko" ? 75 : locale === "zh" ? 55 : 130;

  for (const patentId of patentIds) {
    if (!titles[patentId]?.trim()) {
      patentTitleIssues.push(`${locale}.${patentId}: missing editorial title`);
    }
  }

  for (const [patentId, rawTitle] of Object.entries(titles)) {
    const title = rawTitle.trim();
    if (!title) {
      patentTitleIssues.push(`${locale}.${patentId}: empty editorial title`);
      continue;
    }
    if (title.length > maxTitleLength) {
      patentTitleIssues.push(`${locale}.${patentId}: title is ${title.length} characters`);
    }
    if (locale === "ko" && !/[가-힣]/u.test(title)) {
      patentTitleIssues.push(`${locale}.${patentId}: Korean title has no Hangul`);
    }
    if (locale === "zh" && !/[\u3400-\u9fff]/u.test(title)) {
      patentTitleIssues.push(`${locale}.${patentId}: Chinese title has no Han characters`);
    }
    if ((locale === "ko" || locale === "zh") && /[A-Za-z]{3,}/u.test(title)) {
      patentTitleIssues.push(`${locale}.${patentId}: untranslated Latin wording`);
    }
    if (locale !== "fr" && /\b(?:dispositif|rayonnement|détartrage)\b/iu.test(title)) {
      patentTitleIssues.push(`${locale}.${patentId}: untranslated French wording`);
    }
    if (/(?:e\.g\.|i\.e\.|par ex\.|z\. ?B\.|p\. ?e\.)/iu.test(title)) {
      patentTitleIssues.push(`${locale}.${patentId}: title contains source-summary shorthand`);
    }
  }

  for (const project of generatedProjects[locale] ?? []) {
    for (const patent of project.relatedPatents ?? []) {
      if (patent.title !== titles[patent.patentId]) {
        patentTitleIssues.push(
          `${locale}.${project.id}.${patent.patentId}: project title differs from patent title`,
        );
      }
    }
  }

  if (locale !== "en") {
    for (const patentId of Object.keys(patentLocalizations[locale] ?? {})) {
      if (!titles[patentId]?.trim()) {
        patentTitleIssues.push(`${locale}.${patentId}: abstract has no editorial title`);
      }
    }
    for (const patentId of patentIds) {
      if (!patentLocalizations[locale]?.[patentId]) {
        patentTitleIssues.push(`${locale}.${patentId}: missing abstract localization`);
      }
    }
  }
}

hasErrors = reportIssue("Patent title quality and project consistency:", patentTitleIssues) || hasErrors;

function nodeName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }

  return undefined;
}

function propertyName(node) {
  return node.name ? nodeName(node.name) : undefined;
}

function findVariableInitializer(name) {
  let initializer;

  function visit(node) {
    if (initializer) return;

    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
      initializer = node.initializer;
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(projectsAst);
  return initializer;
}

function objectProperties(objectExpression) {
  const properties = new Map();
  if (!objectExpression || !ts.isObjectLiteralExpression(objectExpression)) return properties;

  for (const property of objectExpression.properties) {
    if (!ts.isPropertyAssignment(property)) continue;

    const name = propertyName(property);
    if (name) properties.set(name, property.initializer);
  }

  return properties;
}

function stringLiteralValue(expression) {
  return expression && ts.isStringLiteral(expression) ? expression.text : undefined;
}

function collectRelatedPatentIds(expression) {
  const ids = [];

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "relatedPatent"
    ) {
      const patentId = stringLiteralValue(node.arguments[0]);
      if (patentId) ids.push(patentId);
    }

    ts.forEachChild(node, visit);
  }

  if (expression) visit(expression);
  return ids;
}

function collectBaseProjects() {
  const projects = new Map();

  function recordProject(objectExpression) {
    const properties = objectProperties(objectExpression);
    const id = stringLiteralValue(properties.get("id"));
    if (!id) return;

    projects.set(id, {
      fields: new Set(
        ["category", "description", "imageAlt", "overview"].filter((field) =>
          properties.has(field),
        ),
      ),
      relatedPatentIds: collectRelatedPatentIds(properties.get("relatedPatents")),
    });
  }

  const featuredProject = findVariableInitializer("FEATURED_PROJECT");
  if (ts.isObjectLiteralExpression(featuredProject)) recordProject(featuredProject);

  const projectsArray = findVariableInitializer("PROJECTS");
  if (ts.isArrayLiteralExpression(projectsArray)) {
    for (const item of projectsArray.elements) {
      if (ts.isObjectLiteralExpression(item)) recordProject(item);
    }
  }

  return projects;
}

function collectProjectOverrides(variableName) {
  const overrides = new Map();
  const initializer = findVariableInitializer(variableName);

  for (const [projectId, projectOverride] of objectProperties(initializer)) {
    const properties = objectProperties(projectOverride);
    overrides.set(projectId, {
      fields: new Set(properties.keys()),
      relatedPatentIds: collectRelatedPatentIds(properties.get("relatedPatents")),
    });
  }

  return overrides;
}

function collectRelatedPatentTranslationKeys() {
  const localeKeys = new Map();
  const initializer = findVariableInitializer("RELATED_PATENT_NOTE_TRANSLATIONS");

  for (const [locale, localeTranslations] of objectProperties(initializer)) {
    localeKeys.set(locale, new Set(objectProperties(localeTranslations).keys()));
  }

  return localeKeys;
}

const baseProjects = collectBaseProjects();
const overrideVariables = {
  fr: "FR_PROJECT_OVERRIDES",
  de: "DE_PROJECT_OVERRIDES",
  es: "ES_PROJECT_OVERRIDES",
  ko: "KO_PROJECT_OVERRIDES",
  zh: "ZH_PROJECT_OVERRIDES",
};
const relatedPatentTranslationKeys = collectRelatedPatentTranslationKeys();

for (const [locale, overrideVariable] of Object.entries(overrideVariables)) {
  const overrides = collectProjectOverrides(overrideVariable);
  const missingProjectFields = [];
  const missingPatentNotes = [];
  const mismatchedPatentLinks = [];

  for (const [projectId, project] of baseProjects) {
    const projectOverride = overrides.get(projectId) ?? {
      fields: new Set(),
      relatedPatentIds: [],
    };

    for (const field of project.fields) {
      if (!projectOverride.fields.has(field)) {
        missingProjectFields.push(`${projectId}.${field}`);
      }
    }

    if (
      project.relatedPatentIds.length > 0 &&
      !projectOverride.fields.has("relatedPatents")
    ) {
      const translatedPatentIds = relatedPatentTranslationKeys.get(locale) ?? new Set();

      for (const patentId of project.relatedPatentIds) {
        if (!translatedPatentIds.has(patentId)) {
          missingPatentNotes.push(`${projectId}.${patentId}`);
        }
      }
    }

    if (projectOverride.fields.has("relatedPatents")) {
      const basePatentIds = [...project.relatedPatentIds].sort();
      const overridePatentIds = [...projectOverride.relatedPatentIds].sort();

      if (basePatentIds.join("|") !== overridePatentIds.join("|")) {
        mismatchedPatentLinks.push(
          `${projectId}: base=[${basePatentIds.join(", ")}] ${locale}=[${overridePatentIds.join(", ")}]`,
        );
      }
    }
  }

  hasErrors =
    reportIssue(
      `Project overrides missing localized visible fields for ${locale}:`,
      missingProjectFields,
    ) || hasErrors;
  hasErrors =
    reportIssue(
      `Project related-patent notes missing localized fallback for ${locale}:`,
      missingPatentNotes,
    ) || hasErrors;
  hasErrors =
    reportIssue(
      `Project related-patent links differ from base project data for ${locale}:`,
      mismatchedPatentLinks,
    ) || hasErrors;
}

const assetPaths = unique(
  [...projectsSource.matchAll(/(?:image|icon): "([^"]+)"/g)]
    .map((match) => match[1])
    .filter((value) => value.startsWith("/assets/")),
);

hasErrors =
  reportIssue(
    "Project data references missing assets:",
    assetPaths.filter((assetPath) => !fs.existsSync(path.join("public", assetPath))),
  ) || hasErrors;

const manifest = readJson(PROJECT_ASSET_MANIFEST);
const manifestOutputs = manifest.flatMap((project) =>
  project.images.map((image) => image.output),
);

hasErrors =
  reportIssue(
    "Project manifest references missing generated images:",
    manifestOutputs.filter((assetPath) => !fs.existsSync(path.join("public", assetPath))),
  ) || hasErrors;

const localeMessages = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    flattenMessages(readJson(`messages/${locale}.json`)),
  ]),
);
const englishKeys = Object.keys(localeMessages.en).sort();

for (const locale of LOCALES.filter((locale) => locale !== "en")) {
  const localeKeys = Object.keys(localeMessages[locale]).sort();
  const missingKeys = englishKeys.filter((key) => !(key in localeMessages[locale]));
  const extraKeys = localeKeys.filter((key) => !(key in localeMessages.en));

  hasErrors =
    reportIssue(`messages/${locale}.json is missing keys:`, missingKeys) ||
    hasErrors;
  hasErrors =
    reportIssue(`messages/${locale}.json has extra keys:`, extraKeys) || hasErrors;
}

if (hasErrors) {
  process.exit(1);
}

console.log(
  [
    `Content audit passed.`,
    `${patentIds.size} patents available; ${relatedPatentIds.length} linked to projects.`,
    `${manifest.length} project asset folders; ${manifestOutputs.length} generated images checked.`,
    `${englishKeys.length} translation keys checked across ${LOCALES.length} locales.`,
  ].join("\n"),
);

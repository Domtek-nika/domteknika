import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_ROOT = path.join(ROOT, "assets/jean_luc_thuliez_brevets");
const PUBLIC_ROOT = path.join(ROOT, "public/assets/patents");
const DATA_FILE = path.join(ROOT, "src/data/patents.ts");
const PDFTOPPM = process.env.PDFTOPPM_PATH || "pdftoppm";
const REUSE_IMAGES = process.argv.includes("--reuse-images");
const CROP_PADDING = 4;
const MIN_JEAN_LUC_PRIORITY_DATE = "2004-05-07";

// Google Patents sometimes returns a national publication, a grant, or the
// zero-padded US publication number instead of the Espacenet representative
// used for the card. Keep those result identifiers attached to the matching
// family so the Google list can be reconciled and searched without duplicating
// the same invention in the archive.
const GOOGLE_RESULT_ALIASES = {
  USD560092S: ["USD560092S1"],
  USD568097S: ["USD568097S1"],
  US2010173057A1: ["HK1119383A"],
  EP2000065A1: ["HK1124746A"],
  US2011061534A1: ["HK1153366A"],
  US2016000570A1: ["US20160317310A9"],
  US2019313839A1: ["CA2995152C"],
  US2021106167A1: ["US20210106167A1"],
  US2022141591A1: ["BR112021014602B1"],
  US2023164492A1: ["US20230164492A1"],
  MA68857A1: ["OA21854A"],
};

const SOURCE_FILES = [
  {
    corpus: "jean-luc-thuliez",
    json: path.join(SOURCE_ROOT, "brevets_jean_luc_thuliez_full.json"),
    manifest: path.join(SOURCE_ROOT, "images_manifest.json"),
    assetRoot: SOURCE_ROOT,
  },
  {
    corpus: "etienne-crozier-only",
    json: path.join(
      SOURCE_ROOT,
      "etienne_crozier_sans_jean_luc/etienne_crozier_sans_jean_luc_full.json",
    ),
    manifest: path.join(
      SOURCE_ROOT,
      "etienne_crozier_sans_jean_luc/images_manifest.json",
    ),
    assetRoot: path.join(SOURCE_ROOT, "etienne_crozier_sans_jean_luc"),
  },
];

const CATEGORY_LABELS = {
  mobility: "Mobility",
  industrial: "Industrial",
  medical: "Medical",
  energy: "Energy",
  materials: "Materials",
  digital: "Digital",
};

const CATEGORY_RULES = [
  {
    key: "medical",
    words: [
      "medical",
      "dental",
      "teeth",
      "tooth",
      "syringe",
      "stent",
      "prosthesis",
      "orthopaedic",
      "surgery",
      "bone",
      "implant",
      "a61",
    ],
  },
  {
    key: "mobility",
    words: [
      "vehicle",
      "automobile",
      "dashboard",
      "tractor",
      "footprint",
      "all-terrain",
      "steering wheel",
      "car rims",
      "single-seater",
      "mobility",
      "b60",
      "b62",
    ],
  },
  {
    key: "energy",
    words: [
      "solar",
      "battery",
      "induction motor",
      "stationary winding",
      "moteur thermique",
      "thermal engine",
      "heating strip",
      "heat strip",
    ],
  },
  {
    key: "digital",
    words: ["sensor", "monitoring", "iot", "digital", "user-interface"],
  },
  {
    key: "materials",
    words: [
      "polymer",
      "polymère",
      "plastic",
      "material",
      "recyclable",
      "coating",
      "container preform",
      "watch",
      "optical",
      "invisible",
      "poc",
      "foam",
    ],
  },
];

const ACTION_NOISE = [
  "Tout sélectionner",
  "Compact",
  "Exporter",
  "CSV",
  "XLS",
  "Télécharger",
  "Imprimer",
  "CCD",
  "Trier par",
  "Ordre de tri",
  "Ascendant",
  "Descendant",
  "Traduire ce texte",
  "Tooltip",
  "Sélectionner la langue",
  "Revendications initiales",
  "Arborescence des revendications",
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanDir(dir) {
  fs.rmSync(dir, { force: true, recursive: true });
  ensureDir(dir);
}

function stripAccents(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function cleanSpaces(value = "") {
  return String(value)
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanPatentCodeNoise(value = "") {
  return cleanSpaces(value)
    .replace(/\b[A-Z]\d{3,}[A-Z0-9]*\s*spec\s*dpt(?=[A-Z]|\s|$)/gi, "")
    .replace(/\b[A-Z]\d{3,}[A-Z0-9]*\s*spec\b/gi, "")
    .replace(/\bP\d{3,}[A-Z0-9]*\s*dpt(?=[A-Z]|\s|$)/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function removeEspacenetDisclaimer(value = "") {
  return cleanSpaces(value)
    .replace(
      /L[´']OEB n[´']est pas responsable de l[´']exactitude des données émanant d[´']autorités tierces, notamment du point de vue de leur exhaustivité, de leur actualité ou de leur pertinence à l[´']égard d[´']un but spécifique\. Veuillez vous adresser aux services de la propriété industrielle compétents afin d[´']obtenir des informations officielles\./gi,
      "",
    )
    .trim();
}

function cleanupText(value = "") {
  return cleanPatentCodeNoise(removeEspacenetDisclaimer(value))
    .replace(/\s+\./g, ".")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s+,/g, ",")
    .replace(/\?{2,}/g, "")
    .trim();
}

function formatCompactDate(value = "") {
  const match = String(value).match(/\b((?:19|20)\d{2})(\d{2})(\d{2})\b/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : "";
}

function priorityDateFor(patent) {
  const fromList = cleanupText(patent.listSections?.["Date de priorité"] ?? "");
  if (/^\d{4}-\d{2}-\d{2}$/.test(fromList)) return fromList;

  const fromBiblioText = cleanupText(
    patent.biblio?.biblioText?.match(/Date de priorité:\s*([0-9-]+)/)?.[1] ?? "",
  );
  if (/^\d{4}-\d{2}-\d{2}$/.test(fromBiblioText)) return fromBiblioText;

  return formatCompactDate(patent.biblio?.priorityNumbers ?? "");
}

function canonicalUsPublicationAlias(docId) {
  const match = docId.match(/^US((?:19|20)\d{2})(\d{1,6})(A\d)$/);
  if (!match) return "";
  return `US${match[1]}${match[2].padStart(7, "0")}${match[3]}`;
}

function extractPublicationAliases(value = "") {
  return [
    ...String(value).matchAll(
      /\b[A-Z]{2,5}\d+\s*(?:\([A-Z]\d?\)|[A-Z]\d?)(?=\s|$|[.,;])/g,
    ),
  ]
    .map((match) => match[0].replace(/[^A-Z0-9]/g, ""))
    .filter(Boolean);
}

function publicationAliasesFor(patent) {
  const aliases = new Set([
    patent.docId,
    ...extractPublicationAliases(patent.publication),
    ...extractPublicationAliases(patent.biblio?.alsoPublishedAs),
    ...(GOOGLE_RESULT_ALIASES[patent.docId] ?? []),
  ]);

  for (const alias of [...aliases]) {
    const canonicalUsAlias = canonicalUsPublicationAlias(alias);
    if (canonicalUsAlias) aliases.add(canonicalUsAlias);
  }

  return [...aliases].filter(Boolean).sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

function alsoPublishedAsFor(patent) {
  const sourceValue = cleanupText(patent.biblio?.alsoPublishedAs ?? "");
  const aliases = new Set(GOOGLE_RESULT_ALIASES[patent.docId] ?? []);
  const canonicalUsAlias = canonicalUsPublicationAlias(patent.docId);
  if (canonicalUsAlias && canonicalUsAlias !== patent.docId) {
    aliases.add(canonicalUsAlias);
  }

  return cleanupText(
    [sourceValue, aliases.size ? `Google Patents: ${[...aliases].join("; ")}` : ""]
      .filter(Boolean)
      .join(" "),
  );
}

function splitDescription(value = "") {
  const text = cleanupText(value)
    .replace(/^Description de .+?\)\s*/i, "")
    .replace(/\s*(\[\d{4}\])\s*/g, "\n$1 ")
    .replace(/\n{2,}/g, "\n")
    .trim();

  return text
    .split(/\n+/)
    .map((paragraph) => cleanupText(paragraph))
    .filter(Boolean)
    .filter((paragraph) => !/^\[\d{4}\]$/.test(paragraph))
    .filter((paragraph) => !ACTION_NOISE.some((noise) => paragraph === noise));
}

function splitClaims(value = "") {
  const text = cleanupText(value)
    .replace(/^Revendications de .+?\)\s*/i, "")
    .replace(/^REVENDICATIONS/i, "")
    .replace(/\bREVENDICATIONS\s*/gi, "")
    .replace(/\s*(\d+\.\s+)/g, "\n$1")
    .replace(/\n{2,}/g, "\n")
    .trim();

  return text
    .split(/\n(?=\d+\.\s+)/)
    .map((claim) => cleanupText(claim))
    .filter((claim) => !/^dpt\s*revendications$/i.test(claim))
    .filter(Boolean);
}

function normalizePublicationInfo(value = "") {
  return cleanupText(value)
    .replace(/([A-Z]{2}\d+[A-Z]\d?)\s*\(([^)]+)\)\s*(\d{4}-\d{2}-\d{2})/g, "$1 ($2) - $3")
    .replace(/([A-Z]{2}\d+\s+[A-Z]\d?)\s+(\d{8})/g, "$1 - $2")
    .trim();
}

function cleanSections(sections = {}) {
  return Object.fromEntries(
    Object.entries(sections)
      .map(([key, value]) => {
        const cleaned =
          key === "Informations sur la publication"
            ? normalizePublicationInfo(value)
            : cleanupText(value);
        return [key, cleaned];
      })
      .filter(([, value]) => value && value !== "-"),
  );
}

function rowsFromSection(section) {
  return (section?.resultRows ?? []).map((row) => ({
    idx: String(row.idx ?? ""),
    title: cleanupText(row.title ?? ""),
    link: row.link ?? "",
    sections: cleanSections(row.sections ?? {}),
  }));
}

function legalEventsFromSection(section) {
  const sourceEvents = section?.tables?.length
    ? section.tables
    : (section?.legalEvents ?? []).filter((event) => /Event date\s*:/i.test(event));
  const candidates = (sourceEvents.length ? sourceEvents : [section?.bodyText ?? ""])
    .map((event) => cleanupText(event))
    .filter(Boolean)
    .filter((event) => !event.startsWith("L´OEB n´est pas responsable"));

  const parsed = candidates.map((event) => {
    const title = event.match(/^(.*?)\s+Event date\s*:/i)?.[1] ?? event;
    const date = event.match(/Event date\s*:\s*([0-9/.-]+)/i)?.[1];
    const code = event.match(/Event code\s*:\s*([A-Z0-9]+)/i)?.[1];
    const explanation = event.match(/Code Expl\.:\s*(.*?)(?:\s+CC OF|\s+CORRESP\.|\s+KD OF|$)/i)?.[1];
    const correspondingCc = event.match(/CC OF CORRESP\. PAT\.\s*:\s*([A-Z]+)/i)?.[1];
    const correspondingPatent = event.match(/CORRESP\. PATENT D\.\s*:\s*([A-Z0-9]+)/i)?.[1];
    const correspondingKind = event.match(/KD OF CORRESP\. PAT\.\s*:\s*([A-Z0-9]+)/i)?.[1];

    return [
      cleanupText(title),
      date && `Date: ${date}`,
      code && `Code: ${code}`,
      explanation && `Note: ${cleanupText(explanation)}`,
      correspondingPatent &&
        `Brevet correspondant: ${[correspondingCc, correspondingPatent, correspondingKind].filter(Boolean).join(" ")}`,
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [...new Set(parsed.filter(Boolean))];
}

function categoryFor(patent) {
  const biblio = patent.biblio ?? {};
  const haystack = stripAccents(
    [
      patent.title,
      biblio.title,
      biblio.abstract,
      biblio.classification,
      biblio.applicants,
      biblio.secondaryApplicants,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  );

  for (const rule of CATEGORY_RULES) {
    if (rule.words.some((word) => haystack.includes(stripAccents(word.toLowerCase())))) {
      return rule.key;
    }
  }

  return "industrial";
}

function tagsFor(patent, category) {
  const biblio = patent.biblio ?? {};
  const applicant = cleanupText(biblio.applicants ?? biblio.secondaryApplicants ?? "")
    .split(";")[0]
    .replace(/\s*\[[A-Z]{2}\]/g, "")
    .trim();
  const classification = cleanupText(biblio.classification ?? "")
    .replace(/^- internationale\s*/i, "")
    .split(/[;\n]/)[0]
    .split(/\s+/)
    .find((item) => /^[A-H][0-9]/.test(item));
  const year = (biblio.publicationHeader ?? patent.publication ?? "").match(/\b(19|20)\d{2}\b/)?.[0];

  return [applicant, classification, year, CATEGORY_LABELS[category]]
    .filter(Boolean)
    .slice(0, 3);
}

function labelFor(file) {
  return path
    .basename(file, path.extname(file))
    .replace(/^rendered_/, "")
    .replace(/_/g, " ");
}

function renderPdfToPng(pdfFile, outputFile) {
  ensureDir(path.dirname(outputFile));
  const outputPrefix = outputFile.replace(/\.png$/, "");
  execFileSync(PDFTOPPM, ["-f", "1", "-singlefile", "-r", "260", "-png", pdfFile, outputPrefix], {
    stdio: "ignore",
  });
}

function findProjectionGroups(values, threshold) {
  const groups = [];
  let start = -1;

  for (let index = 0; index < values.length; index += 1) {
    if (values[index] >= threshold) {
      if (start < 0) start = index;
    } else if (start >= 0) {
      groups.push({ start, end: index - 1, center: Math.round((start + index - 1) / 2) });
      start = -1;
    }
  }

  if (start >= 0) {
    groups.push({
      start,
      end: values.length - 1,
      center: Math.round((start + values.length - 1) / 2),
    });
  }

  return groups;
}

function rectIntersectionRatio(a, b) {
  const left = Math.max(a.x1, b.x1);
  const top = Math.max(a.y1, b.y1);
  const right = Math.min(a.x2, b.x2);
  const bottom = Math.min(a.y2, b.y2);
  const width = Math.max(0, right - left);
  const height = Math.max(0, bottom - top);
  const intersection = width * height;
  if (!intersection) return 0;

  return intersection / Math.min(a.width * a.height, b.width * b.height);
}

function sortRectsByReadingOrder(rects) {
  return [...rects].sort((a, b) => {
    const rowTolerance = Math.min(a.height, b.height) * 0.35;
    if (Math.abs(a.y1 - b.y1) > rowTolerance) return a.y1 - b.y1;
    return a.x1 - b.x1;
  });
}

async function detectMosaicDrawingRects(imageFile) {
  const { data, info } = await sharp(imageFile)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const dark = new Uint8Array(info.width * info.height);
  const columnCounts = new Uint32Array(info.width);
  const rowCounts = new Uint32Array(info.height);

  for (let index = 0, pixel = 0; index < dark.length; index += 1, pixel += 4) {
    const red = data[pixel];
    const green = data[pixel + 1];
    const blue = data[pixel + 2];
    const alpha = data[pixel + 3];
    const isDark = alpha > 20 && red < 130 && green < 130 && blue < 130;
    if (!isDark) continue;

    dark[index] = 1;
    const x = index % info.width;
    const y = Math.floor(index / info.width);
    columnCounts[x] += 1;
    rowCounts[y] += 1;
  }

  const verticalLines = findProjectionGroups(columnCounts, info.height * 0.18)
    .map((group) => group.center)
    .filter((x) => x > info.width * 0.005 && x < info.width * 0.995);
  const horizontalLines = findProjectionGroups(rowCounts, info.width * 0.16)
    .map((group) => group.center)
    .filter((y) => y > info.height * 0.005 && y < info.height * 0.995);

  const hasVerticalLine = (x, y1, y2) => {
    let count = 0;
    for (let y = y1; y <= y2; y += 1) {
      let found = false;
      for (let dx = -4; dx <= 4; dx += 1) {
        const xx = x + dx;
        if (xx >= 0 && xx < info.width && dark[y * info.width + xx]) {
          found = true;
          break;
        }
      }
      if (found) count += 1;
    }
    return count;
  };

  const hasHorizontalLine = (y, x1, x2) => {
    let count = 0;
    for (let x = x1; x <= x2; x += 1) {
      let found = false;
      for (let dy = -4; dy <= 4; dy += 1) {
        const yy = y + dy;
        if (yy >= 0 && yy < info.height && dark[yy * info.width + x]) {
          found = true;
          break;
        }
      }
      if (found) count += 1;
    }
    return count;
  };

  const candidates = [];
  for (let leftIndex = 0; leftIndex < verticalLines.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < verticalLines.length; rightIndex += 1) {
      const x1 = verticalLines[leftIndex];
      const x2 = verticalLines[rightIndex];
      const width = x2 - x1;
      if (width < info.width * 0.18 || width > info.width * 0.42) continue;

      for (let topIndex = 0; topIndex < horizontalLines.length; topIndex += 1) {
        for (let bottomIndex = topIndex + 1; bottomIndex < horizontalLines.length; bottomIndex += 1) {
          const y1 = horizontalLines[topIndex];
          const y2 = horizontalLines[bottomIndex];
          const height = y2 - y1;
          if (height < info.height * 0.22 || height > info.height * 0.62) continue;

          const aspect = width / height;
          if (aspect < 0.45 || aspect > 0.95) continue;

          const verticalRatio =
            (hasVerticalLine(x1, y1, y2) + hasVerticalLine(x2, y1, y2)) /
            (2 * height);
          const horizontalRatio =
            (hasHorizontalLine(y1, x1, x2) + hasHorizontalLine(y2, x1, x2)) /
            (2 * width);

          if (verticalRatio < 0.68 || horizontalRatio < 0.68) continue;

          candidates.push({
            x1,
            y1,
            x2,
            y2,
            width,
            height,
            area: width * height,
            score: verticalRatio + horizontalRatio,
          });
        }
      }
    }
  }

  const selected = [];
  for (const candidate of candidates.sort((a, b) => b.score - a.score || b.area - a.area)) {
    if (selected.some((rect) => rectIntersectionRatio(candidate, rect) > 0.25)) continue;
    selected.push(candidate);
  }

  return sortRectsByReadingOrder(selected);
}

async function splitMosaicImage({ imageFile, imageDir, basename, publicImageBase, publicPdfHref, kind }) {
  const rects = await detectMosaicDrawingRects(imageFile);
  if (!rects.length) {
    return [
      {
        href: `${publicImageBase}/${path.basename(imageFile)}`,
        pdfHref: publicPdfHref,
        label: labelFor(imageFile),
        kind,
      },
    ];
  }

  const metadata = await sharp(imageFile).metadata();
  const imageWidth = metadata.width ?? 0;
  const imageHeight = metadata.height ?? 0;

  const croppedImages = [];
  for (const [index, rect] of rects.entries()) {
    const cropName = `rendered_${basename}_drawing_${String(index + 1).padStart(2, "0")}.png`;
    const cropFile = path.join(imageDir, cropName);
    const left = Math.max(0, rect.x1 - CROP_PADDING);
    const top = Math.max(0, rect.y1 - CROP_PADDING);
    const right = Math.min(imageWidth, rect.x2 + CROP_PADDING);
    const bottom = Math.min(imageHeight, rect.y2 + CROP_PADDING);

    await sharp(imageFile)
      .extract({
        left,
        top,
        width: Math.max(1, right - left),
        height: Math.max(1, bottom - top),
      })
      .png()
      .toFile(cropFile);

    croppedImages.push({
      href: `${publicImageBase}/${cropName}`,
      pdfHref: publicPdfHref,
      label: `${labelFor(basename)} drawing ${String(index + 1).padStart(2, "0")}`,
      kind,
    });
  }

  return croppedImages;
}

function copyPdf(pdfFile, outputFile) {
  ensureDir(path.dirname(outputFile));
  fs.copyFileSync(pdfFile, outputFile);
}

function assetCandidates(manifestPatent, assetRoot) {
  const files = manifestPatent?.imageFiles ?? [];
  const pdfs = files
    .filter((file) => file.endsWith(".pdf"))
    .map((file) => path.join(assetRoot, file));
  const originals = pdfs.filter((file) => file.includes("original_drawing_pages_pdf"));
  const mosaics = pdfs.filter((file) => file.includes("mosaics_pdf"));
  return originals.length ? originals : mosaics;
}

function detailsFor(patent, corpus, manifestPatent, publicDir) {
  const extracted = patent.extractedSections ?? {};
  const descriptionParagraphs = splitDescription(
    extracted.description?.descriptionText ?? extracted.description?.bodyText ?? "",
  );
  const claims = splitClaims(extracted.claims?.claimsText ?? extracted.claims?.bodyText ?? "");
  const familyRows = rowsFromSection(extracted.inpadocPatentFamily);
  const citedRows = rowsFromSection(extracted.citedDocuments);
  const citingRows = rowsFromSection(extracted.citingDocuments);
  const legalEvents = legalEventsFromSection(extracted.inpadoc);

  return {
    id: patent.docId,
    publication: patent.publication,
    corpus,
    metadataMarkdown: fs.existsSync(path.join(publicDir, "metadata.md"))
      ? fs.readFileSync(path.join(publicDir, "metadata.md"), "utf8")
      : "",
    descriptionParagraphs,
    claims,
    legalEvents,
    familyRows,
    citedRows,
    citingRows,
    descriptionText: descriptionParagraphs.join("\n\n"),
    claimsText: claims.join("\n\n"),
    legalStatusText: legalEvents.join("\n\n"),
    patentFamilyText: familyRows.map((row) => `${row.title}\n${Object.entries(row.sections).map(([key, value]) => `${key}: ${value}`).join("\n")}`).join("\n\n"),
    citedDocumentsText: citedRows.map((row) => `${row.title}\n${Object.entries(row.sections).map(([key, value]) => `${key}: ${value}`).join("\n")}`).join("\n\n"),
    citingDocumentsText: citingRows.map((row) => `${row.title}\n${Object.entries(row.sections).map(([key, value]) => `${key}: ${value}`).join("\n")}`).join("\n\n"),
    espacenetExtractedSections: Object.keys(extracted),
    errors: patent.errors ?? [],
    manifestErrors: manifestPatent?.errors ?? [],
  };
}

function buildRecord(patent, corpus, renderedImages, pdfAssets) {
  const biblio = patent.biblio ?? {};
  const filter = categoryFor(patent);
  const docId = patent.docId;

  return {
    id: docId,
    publication: patent.publication,
    corpus,
    filter,
    title: cleanupText(biblio.title ?? patent.title ?? ""),
    abstract: cleanupText(biblio.abstract ?? ""),
    date: (biblio.publicationHeader ?? patent.publication ?? "").match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? "",
    priorityDate: priorityDateFor(patent),
    inventors: cleanupText(biblio.inventors ?? biblio.secondaryInventors ?? ""),
    applicants: cleanupText(biblio.applicants ?? biblio.secondaryApplicants ?? ""),
    secondaryInventors: cleanupText(biblio.secondaryInventors ?? ""),
    secondaryApplicants: cleanupText(biblio.secondaryApplicants ?? ""),
    classification: cleanupText(biblio.classification ?? ""),
    applicationNumber: cleanupText(biblio.applicationNumber ?? ""),
    priorityNumbers: cleanupText(biblio.priorityNumbers ?? ""),
    alsoPublishedAs: alsoPublishedAsFor(patent),
    publicationAliases: publicationAliasesFor(patent),
    publicationHeader: cleanupText(biblio.publicationHeader ?? ""),
    tags: tagsFor(patent, filter),
    coverImage: renderedImages[0]?.href ?? null,
    images: renderedImages,
    pdfs: pdfAssets,
    links: patent.links ?? {},
    detailPath: `/assets/patents/${docId}/detail.json`,
    verification: {
      source: patent.source ?? "",
      extractedAt: patent.extractedAt ?? "",
    },
  };
}

function loadPatentAssets() {
  const manifests = new Map();
  for (const source of SOURCE_FILES) {
    const manifest = readJson(source.manifest);
    for (const patent of manifest.patents) {
      manifests.set(`${source.corpus}:${patent.docId}`, { ...patent, assetRoot: source.assetRoot });
    }
  }
  return manifests;
}

function writeDataFile(records) {
  const byCategory = records.reduce((acc, record) => {
    acc[record.filter] = (acc[record.filter] ?? 0) + 1;
    return acc;
  }, {});

  const content = `// Generated from assets/jean_luc_thuliez_brevets on ${new Date().toISOString()}.
// JSON source of truth: brevets_jean_luc_thuliez_full.json and etienne_crozier_sans_jean_luc_full.json.
// Public patent images are rendered and cropped from PDF files, not copied from source PNG files.
// Do not edit patent records manually; regenerate with scripts/generate-patents.mjs.

export type PatentFilterKey = "mobility" | "industrial" | "medical" | "energy" | "materials" | "digital";

export type PatentAsset = {
  href: string;
  pdfHref?: string;
  label: string;
  kind: "mosaic" | "original";
};

export type PatentSourceLinks = Partial<Record<
  | "biblio"
  | "description"
  | "claims"
  | "mosaics"
  | "originalDocument"
  | "citedDocuments"
  | "citingDocuments"
  | "legalStatus"
  | "inpadocFamily",
  string
>>;

export type PatentRecord = {
  id: string;
  publication: string;
  corpus: "jean-luc-thuliez" | "etienne-crozier-only";
  filter: PatentFilterKey;
  title: string;
  abstract: string;
  date: string;
  priorityDate: string;
  inventors: string;
  applicants: string;
  secondaryInventors: string;
  secondaryApplicants: string;
  classification: string;
  applicationNumber: string;
  priorityNumbers: string;
  alsoPublishedAs: string;
  publicationAliases: string[];
  publicationHeader: string;
  tags: string[];
  coverImage: string | null;
  images: PatentAsset[];
  pdfs: PatentAsset[];
  links: PatentSourceLinks;
  detailPath: string;
  verification: {
    source: string;
    extractedAt: string;
  };
};

export type PatentReferenceRow = {
  idx: string;
  title: string;
  link: string;
  sections: Record<string, string>;
};

export type PatentDetail = {
  id: string;
  publication: string;
  corpus: PatentRecord["corpus"];
  metadataMarkdown: string;
  descriptionParagraphs: string[];
  claims: string[];
  legalEvents: string[];
  familyRows: PatentReferenceRow[];
  citedRows: PatentReferenceRow[];
  citingRows: PatentReferenceRow[];
  descriptionText: string;
  claimsText: string;
  legalStatusText: string;
  patentFamilyText: string;
  citedDocumentsText: string;
  citingDocumentsText: string;
  espacenetExtractedSections: string[];
  errors: string[];
  manifestErrors: string[];
};

export const PATENT_FILTER_LABELS: Record<PatentFilterKey, string> = ${JSON.stringify(CATEGORY_LABELS, null, 2)};

export const PATENT_STATS = ${JSON.stringify(
    {
      total: records.length,
      categories: Object.keys(CATEGORY_LABELS).length,
      since: Number(MIN_JEAN_LUC_PRIORITY_DATE.slice(0, 4)),
      byCategory,
      corpus: {
        jeanLucThuliez: records.filter((record) => record.corpus === "jean-luc-thuliez").length,
        etienneCrozierOnly: records.filter((record) => record.corpus === "etienne-crozier-only").length,
      },
    },
    null,
    2,
  )} as const;

export const PATENTS: PatentRecord[] = ${JSON.stringify(records, null, 2)};
`;

  fs.writeFileSync(DATA_FILE, content);
}

async function main() {
  try {
    execFileSync(PDFTOPPM, ["-v"], { stdio: "ignore" });
  } catch {
    throw new Error(`Missing pdftoppm executable: ${PDFTOPPM}`);
  }

  if (REUSE_IMAGES) {
    ensureDir(PUBLIC_ROOT);
  } else {
    cleanDir(PUBLIC_ROOT);
  }
  const manifests = loadPatentAssets();
  const records = [];

  for (const source of SOURCE_FILES) {
    const json = readJson(source.json);
    for (const patent of json.patents) {
      const docId = patent.docId;
      if (
        source.corpus === "jean-luc-thuliez" &&
        priorityDateFor(patent) < MIN_JEAN_LUC_PRIORITY_DATE
      ) {
        continue;
      }

      const manifestPatent = manifests.get(`${source.corpus}:${docId}`);
      const publicDir = path.join(PUBLIC_ROOT, docId);
      const imageDir = path.join(publicDir, "images");
      const pdfDir = path.join(publicDir, "pdfs");
      ensureDir(imageDir);
      ensureDir(pdfDir);

      const pdfFiles = assetCandidates(manifestPatent, source.assetRoot);
      const renderedImages = [];
      const pdfAssets = [];

      for (const pdfFile of pdfFiles) {
        const kind = pdfFile.includes("original_drawing_pages_pdf") ? "original" : "mosaic";
        const basename = path.basename(pdfFile, ".pdf");
        const renderedName = `rendered_${basename}.png`;
        const publicImageFile = path.join(imageDir, renderedName);
        const publicPdfFile = path.join(pdfDir, path.basename(pdfFile));
        if (!REUSE_IMAGES || !fs.existsSync(publicImageFile)) {
          renderPdfToPng(pdfFile, publicImageFile);
        }
        if (!REUSE_IMAGES || !fs.existsSync(publicPdfFile)) {
          copyPdf(pdfFile, publicPdfFile);
        }

        const publicImageBase = `/assets/patents/${docId}/images`;
        const publicPdfHref = `/assets/patents/${docId}/pdfs/${path.basename(pdfFile)}`;
        const splitImages =
          kind === "mosaic"
            ? await splitMosaicImage({
                imageFile: publicImageFile,
                imageDir,
                basename,
                publicImageBase,
                publicPdfHref,
                kind,
              })
            : [
                {
                  href: `${publicImageBase}/${renderedName}`,
                  pdfHref: publicPdfHref,
                  label: labelFor(renderedName),
                  kind,
                },
              ];

        renderedImages.push(...splitImages);
        pdfAssets.push({
          href: publicPdfHref,
          label: labelFor(pdfFile),
          kind,
        });
      }

      const detail = detailsFor(patent, source.corpus, manifestPatent, publicDir);
      fs.writeFileSync(path.join(publicDir, "detail.json"), JSON.stringify(detail, null, 2));
      records.push(buildRecord(patent, source.corpus, renderedImages, pdfAssets));
    }
  }

  writeDataFile(records);
  console.log(`Generated ${records.length} patents from PDF-rendered and cropped assets.`);
}

await main();

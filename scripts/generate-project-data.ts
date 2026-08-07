import { writeFile } from "node:fs/promises";
import path from "node:path";

import {
  getProjectsForLocale,
  type Project,
} from "../src/components/sections/projects-page-content";

const LOCALES = ["en", "fr", "de", "es", "ko", "zh"] as const;
const outputPath = path.join(
  process.cwd(),
  "src/data/projects.generated.json",
);

const projectsByLocale = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    getProjectsForLocale(locale, { includeHidden: true }) satisfies Project[],
  ]),
);

async function main() {
  await writeFile(outputPath, `${JSON.stringify(projectsByLocale, null, 2)}\n`);
  console.log(`Generated ${outputPath}`);
}

void main();

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const SHARED_ROOT = path.resolve(ROOT, "../../Partage");
const OUTPUT_ROOT = path.join(ROOT, "public/assets/projects");

// Import only the reviewed selection; leave every other project untouched.
export async function prepareSharedProjectAssets() {
  const selections = JSON.parse(fs.readFileSync(
    path.join(ROOT, "assets/project-selections/shared-projects.json"), "utf8",
  ));
  const manifestPath = path.join(OUTPUT_ROOT, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const temporaryDir = fs.mkdtempSync(path.join(os.tmpdir(), "domtek-shared-"));

  // Check the complete source selection before changing generated assets.
  for (const project of selections) {
    for (const image of project.images) {
      fs.accessSync(path.join(SHARED_ROOT, image.source));
    }
  }

  try {
    for (const project of selections) {
      const outputDir = path.join(OUTPUT_ROOT, project.slug);
      fs.mkdirSync(outputDir, { recursive: true });
      const images = [];

      for (const image of project.images) {
        const source = path.join(SHARED_ROOT, image.source);
        let input = source;
        if (image.page) {
          const prefix = path.join(temporaryDir, `${project.slug}-${image.page}`);
          execFileSync("pdftoppm", [
            "-f", String(image.page), "-l", String(image.page),
            "-singlefile", "-scale-to", "2200", "-png", source, prefix,
          ]);
          input = `${prefix}.png`;
        }

        await sharp(input)
          .rotate()
          .resize({ width: 2200, height: 1600, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 84, effort: 5 })
          .toFile(path.join(outputDir, image.output));

        images.push({
          source: path.relative(ROOT, source),
          ...(image.page ? { page: image.page } : {}),
          output: `/assets/projects/${project.slug}/${image.output}`,
        });
      }

      const entry = {
        slug: project.slug,
        sourceFolder: path.dirname(project.images[0].source),
        cover: images[0].output,
        images,
      };
      const index = manifest.findIndex((entry) => entry.slug === project.slug);
      if (index === -1) manifest.push(entry);
      else manifest[index] = entry;
    }

    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`Prepared selected illustrations for ${selections.length} projects.`);
  } finally {
    fs.rmSync(temporaryDir, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await prepareSharedProjectAssets();
}

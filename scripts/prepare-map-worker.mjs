import { copyFile, mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const packagePath = require.resolve("maplibre-gl/package.json");
const { version } = JSON.parse(await readFile(packagePath, "utf8"));
const destination = new URL(`../public/vendor/maplibre/${version}/`, import.meta.url);
await mkdir(destination, { recursive: true });

// MapLibre 6 loads an external module worker with a relative shared import.
// Keep both modules together and same-origin instead of relying on the bundler's URL.
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  await copyFile(join(dirname(packagePath), "dist", file), new URL(file, destination));
}
await copyFile(join(dirname(packagePath), "LICENSE.txt"), new URL("LICENSE.txt", destination));

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_ROOT = "/Users/mathis/Domteknika/Project";
const OUT_ROOT = path.resolve("public/assets/projects");

const projects = [
  { folder: "Airsmile", slug: "airsmile", cover: "fkfl.png" },
  {
    folder: "Aventor",
    slug: "aventor",
    cover: "Aventor9.jpeg",
    order: [
      "Aventor9.jpeg",
      "Aventor Rolf Biland 2 July 2015 Lignieres.jpg",
      "DSC_2737.JPG",
      "v18-vert-dessus.jpg",
      "160721-3w.png",
      "Déplacements arceau 2.2.PNG",
    ],
    outputNames: {
      "Aventor9.jpeg": "aventor-01.webp",
      "Aventor Rolf Biland 2 July 2015 Lignieres.jpg": "aventor-02.webp",
      "DSC_2737.JPG": "aventor-03-chassis-road-test.webp",
      "v18-vert-dessus.jpg": "aventor-04-top-view-render.webp",
      "160721-3w.png": "aventor-05-green-render.webp",
      "Déplacements arceau 2.2.PNG":
        "aventor-06-structural-analysis.webp",
    },
  },
  { folder: "BrossAdent", slug: "brossadent", cover: "Sans titre.png" },
  {
    folder: "EcranVelumSKY",
    slug: "velum-sky-screen",
    cover: "_DSC7008-Modifier.jpg",
  },
  {
    folder: "MontreVacheron",
    slug: "vacheron-watch-mechanics",
    cover: "Watch-3.333.jpg",
  },
  { folder: "Parapluis", slug: "folding-umbrella", cover: "IMG_2957.JPG" },
  {
    folder: "Pumamachien caffesoluble",
    slug: "instant-coffee-dispenser",
    cover: "DSC00550.JPG",
  },
  {
    folder: "TotalCar",
    slug: "totalcar-concept",
    cover: "DSC00016.JPG",
    exclude: ["JLT P1.jpg"],
    startIndex: 2,
    labels: {
      "DSC00016.JPG": "prototype-front",
      "HUT-3.JPG": "hut-assembly",
      "Image CAO HUT109.JPG": "cad-hut109",
      "PV2.JPG": "prototype-side",
    },
  },
  {
    folder: "SAM CREE",
    slug: "sam-cree",
    cover: "s727078908517165717_p271_i6_w750.jpeg",
    order: [
      "s727078908517165717_p271_i6_w750.jpeg",
      "cree-sam-vorserien-elektrofahrzeug-made-in-switzerland.jpeg",
      "Cree_SAM_IMG_0346-20140108.jpg",
      "s727078908517165717_p271_i1_w600.jpeg",
      "usine.jpg",
    ],
    labels: {
      "cree-sam-vorserien-elektrofahrzeug-made-in-switzerland.jpeg":
        "prototype",
      "Cree_SAM_IMG_0346-20140108.jpg": "workshop",
      "s727078908517165717_p271_i1_w600.jpeg": "side-view",
      "s727078908517165717_p271_i6_w750.jpeg": "sunset-cover",
      "usine.jpg": "factory",
    },
  },
  {
    folder: "Softcar",
    slug: "softcar",
    cover: "softcar.jpg",
    labels: {
      "01KKEJ8X2R05RJJ4T5GCNSQX5R.webp": "alpine-road",
      "DSC4672.jpg": "studio-body",
      "softcar-concept.jpg": "concept",
    },
  },
  {
    folder: "Angel Interceptor",
    slug: "angel-interceptor",
    cover: "Sans titre.png",
    startIndex: 2,
    order: [
      "Sans titre.png",
      "Capture d’écran 2026-07-06 à 10.29.16 AM.png",
      "asm angel interceptor v2.jpg",
      "2012-08-27 11.28.45.jpg",
      "fjf.png",
    ],
    labels: {
      "Sans titre.png": "cover",
      "Capture d’écran 2026-07-06 à 10.29.16 AM.png": "cad-screenshot",
      "asm angel interceptor v2.jpg": "package-study",
      "2012-08-27 11.28.45.jpg": "prototype",
      "fjf.png": "front-study",
    },
  },
  { folder: "Carafe", slug: "filter-carafe", cover: "Sans titre.jpg" },
  {
    folder: "coffeeMachine",
    slug: "alicoffee-machine",
    cover: "2.1-Alicoffee-red.jpg",
  },
  { folder: "flexDrill", slug: "flex-drill", cover: "Flex-drill.10.png" },
  { folder: "iKitty", slug: "ikitty", cover: "Kitty1.png" },
  {
    folder: "pistolet agrafebiomes",
    slug: "biome-staple-applicator",
    cover: "image 18.png",
  },
  {
    folder: "Personal Injector",
    slug: "personal-injector",
    cover: "Sans titre.png",
  },
  {
    folder: "Reamer Holder",
    slug: "acetabular-reamer-holder",
    cover: "OffsetC-1.jpg",
  },
  {
    folder: "seche gant",
    slug: "glove-helmet-dryer",
    cover: "DSC06254.JPG",
    order: [
      "DSC06254.JPG",
      "DSC06247.JPG",
      "1.jpg",
      "150813-01.JPG",
      "150813-3d1.JPG",
    ],
  },
  {
    folder: "Single use turbine",
    slug: "single-use-turbine",
    cover: "Turbine 1.JPG",
  },
  {
    folder: "skincare",
    slug: "skincare-applicator",
    cover: "jf.jpg",
    order: ["jf.jpg", "PC070111.JPG", "principe.jpg", "Sans titre.png"],
    labels: {
      "jf.jpg": "idlab-cover",
    },
  },
  { folder: "smartBottle", slug: "smart-bottle", cover: "BTD3 détouré.png" },
  {
    folder: "special T",
    slug: "special-t-machine",
    cover: "1Sans titre.png",
    labels: {
      "1Sans titre.png": "new-cover",
      "Sans titre.jpg": "prototype",
      "dr.jpg": "brewing-unit",
    },
  },
  {
    folder: "stajv",
    slug: "stajvelo-rv01",
    cover: "STAJleclerc.jpg",
    order: [
      "STAJleclerc.jpg",
      "DSC01762.JPG",
      "IMG-20180608-WA0002.jpg",
      "RV01-01 1.png",
      "b6_dev17_C0_S.jpg",
      "181017 - Jante - Déplacements.jpg",
    ],
    labels: {
      "STAJleclerc.jpg": "leclerc-road",
      "DSC01762.JPG": "prototype-side",
      "IMG-20180608-WA0002.jpg": "ride-view",
      "RV01-01 1.png": "studio-render",
      "b6_dev17_C0_S.jpg": "wheel-render",
      "181017 - Jante - Déplacements.jpg": "wheel-analysis",
    },
  },
  {
    folder: "velo:scooter",
    slug: "folding-bike-scooter",
    cover: "VELO ELECTRIQUE PLIANT copie.jpg",
    order: [
      "VELO ELECTRIQUE PLIANT copie.jpg",
      "005 velo axe 1 ergo.jpg",
      "011 scooter 1.jpg",
      "015 scooter 1.jpg",
      "VAE pliage 4.JPG",
    ],
    outputNames: {
      "VELO ELECTRIQUE PLIANT copie.jpg": "folding-bike-scooter-01.webp",
      "005 velo axe 1 ergo.jpg": "folding-bike-scooter-02.webp",
      "011 scooter 1.jpg": "folding-bike-scooter-03.webp",
      "015 scooter 1.jpg": "folding-bike-scooter-04.webp",
      "VAE pliage 4.JPG": "folding-bike-scooter-05.webp",
    },
    sourceOverrides: {
      "005 velo axe 1 ergo.jpg":
        "assets/project-source-overrides/folding-bike-scooter/folding-bike-scooter-02.png",
      "011 scooter 1.jpg":
        "assets/project-source-overrides/folding-bike-scooter/folding-bike-scooter-03.png",
      "015 scooter 1.jpg":
        "assets/project-source-overrides/folding-bike-scooter/folding-bike-scooter-04.png",
    },
  },
  {
    folder: "horloge",
    sourceDir: "/Users/mathis/Domteknika/SiteInternet/horloge",
    slug: "transparent-clock",
    cover: "1.JPG",
    order: ["1.JPG", "2.JPG", "3.JPG", "4.JPG"],
    outputNames: {
      "1.JPG": "transparent-clock-01.webp",
      "2.JPG": "transparent-clock-02.webp",
      "3.JPG": "transparent-clock-03.webp",
      "4.JPG": "transparent-clock-04.webp",
    },
  },
  {
    folder: "Goblet",
    sourceDir: "/Users/mathis/Domteknika/SiteInternet/Goblet",
    slug: "bottom-filling-cup",
    cover: "1.JPG",
    order: ["1.JPG", "2.jpg", "3.jpg"],
    outputNames: {
      "1.JPG": "bottom-filling-cup-01.webp",
      "2.jpg": "bottom-filling-cup-02.webp",
      "3.jpg": "bottom-filling-cup-03.webp",
    },
  },
];

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function listImages(folder) {
  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "en"));
}

async function convertImage(input, output) {
  await sharp(input, { failOn: "none" })
    .rotate()
    .resize({
      width: 2200,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84, effort: 5 })
    .toFile(output);
}

fs.rmSync(OUT_ROOT, { recursive: true, force: true });
fs.mkdirSync(OUT_ROOT, { recursive: true });

const manifest = [];

for (const project of projects) {
  const sourceDir = project.sourceDir ?? path.join(SOURCE_ROOT, project.folder);
  const outputDir = path.join(OUT_ROOT, project.slug);
  fs.mkdirSync(outputDir, { recursive: true });

  const files = listImages(sourceDir);
  const fallbackInput = project.fallbackInput
    ? path.resolve(project.fallbackInput)
    : null;
  const ordered = (
    project.order ?? [
      project.cover,
      ...files.filter(
        (file) =>
          file !== project.cover && !(project.exclude ?? []).includes(file),
      ),
    ]
  ).filter(
    (file, index, array) =>
      !(project.exclude ?? []).includes(file) &&
      (files.includes(file) || (file === project.cover && fallbackInput)) &&
      array.indexOf(file) === index,
  );

  const projectImages = [];

  for (const [index, file] of ordered.entries()) {
    const label =
      project.labels?.[file] ??
      (index === 0 ? "cover" : slugify(path.parse(file).name));
    const imageIndex = (project.startIndex ?? 1) + index;
    const outputName =
      project.outputNames?.[file] ??
      `${project.slug}-${String(imageIndex).padStart(2, "0")}-${label}.webp`;
    const sourceOverride = project.sourceOverrides?.[file]
      ? path.resolve(project.sourceOverrides[file])
      : null;
    const input =
      sourceOverride ??
      (fallbackInput && file === project.cover && !files.includes(file)
        ? fallbackInput
        : path.join(sourceDir, file));
    const output = path.join(outputDir, outputName);

    await convertImage(input, output);

    projectImages.push({
      source: input.startsWith(SOURCE_ROOT)
        ? path.relative(SOURCE_ROOT, input)
        : path.relative(process.cwd(), input),
      output: `/assets/projects/${project.slug}/${outputName}`,
    });
  }

  manifest.push({
    slug: project.slug,
    sourceFolder: project.folder,
    cover: projectImages[0]?.output ?? null,
    images: projectImages,
  });
}

fs.writeFileSync(
  path.join(OUT_ROOT, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(`Prepared ${manifest.length} project asset folders in ${OUT_ROOT}`);

// Generated from assets/jean_luc_thuliez_brevets on 2026-08-04T09:00:42.105Z.
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

export const PATENT_FILTER_LABELS: Record<PatentFilterKey, string> = {
  "mobility": "Mobility",
  "industrial": "Industrial",
  "medical": "Medical",
  "energy": "Energy",
  "materials": "Materials",
  "digital": "Digital"
};

export const PATENT_STATS = {
  "total": 48,
  "categories": 6,
  "since": 2004,
  "byCategory": {
    "mobility": 11,
    "industrial": 24,
    "energy": 2,
    "digital": 3,
    "medical": 6,
    "materials": 2
  },
  "corpus": {
    "jeanLucThuliez": 46,
    "etienneCrozierOnly": 2
  }
} as const;

export const PATENTS: PatentRecord[] = [
  {
    "id": "WO2026078588A1",
    "publication": "WO2026078588 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "ULTRA-LIGHTWEIGHT AND RECYCLABLE DASHBOARD",
    "abstract": "The invention relates to a dashboard (01) comprising at least one main part (02, 03, 04) made of PPE, said dashboard (01) being recyclable, ultra-lightweight, acoustically and thermally insulating, easy to assemble and disassemble, designed to operate with thermal expansions, said dashboard including crash protection elements and integrating numerous features directly molded into the shape of the parts, in particular air circulation circuits.",
    "date": "2026-04-16",
    "priorityDate": "2024-10-09",
    "inventors": "THULIEZ JEAN-LUC [CH]; SAUGE GAËL [FR]; OBLIGER NICOLAS [FR]; CROZIER ETIENNE [CH]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(CROZIER, Etienne; OBLIGER, Nicolas; SAUGE, Gaël; THULIEZ, Jean-Luc)",
    "secondaryApplicants": "(SOFTCAR SA)",
    "classification": "Classification: - internationale B60K35/65; B60K37/00; B60K37/10; B60K37/20; B60R13/02; B60R7/06 - coopérative B60K2360/652 (EP); B60K2360/658 (EP); B60K35/652 (EP); B60K37/00 (EP); B60K37/10 (EP); B60K37/20 (EP); B60R13/0256 (EP); B60R2011/0005 (EP); B60R7/06 (EP)",
    "applicationNumber": "Numéro de demande WO2025IB60178 20251008 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2024IB59873 20241009 ;",
    "alsoPublishedAs": "Également publié en tant que: WO2026078588 (A1) WO2026078588 (A1) moins",
    "publicationAliases": [
      "WO2026078588A1"
    ],
    "publicationHeader": "Données bibliographiques: WO2026078588 (A1) ― 2026-04-16",
    "tags": [
      "SOFTCAR SA",
      "B60K35/65",
      "2026"
    ],
    "coverImage": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026078588A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=0&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20260416&CC=WO&NR=2026078588A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=WO&NR=2026078588A1&KC=A1&FT=D&ND=3&date=20260416&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=WO&NR=2026078588A1&KC=A1&FT=D&ND=3&date=20260416&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=WO&NR=2026078588A1&KC=A1&FT=D&ND=3&date=20260416&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=WO&NR=2026078588A1&KC=A1&FT=D&ND=3&date=20260416&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=WO&NR=2026078588A1&KC=A1&FT=D&ND=3&date=20260416&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=WO&NR=2026078588A1&KC=A1&FT=D&ND=3&date=20260416&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=WO&NR=2026078588A1&KC=A1&FT=D&ND=3&date=20260416&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=WO&NR=2026078588A1&KC=A1&FT=D&ND=3&date=20260416&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/WO2026078588A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "WO2026042020A1",
    "publication": "WO2026042020 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "SCREW WITH ORIENTABLE HEAD",
    "abstract": "The invention relates to a screw (10) fitted with a cap (30) of which the screwing socket (31) can be oriented angularly, without affecting the tightening torque of the screw (10).",
    "date": "2026-02-26",
    "priorityDate": "2024-08-20",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; QUERRY HECTOR [CH]; CHOLIER QUENTIN [CH]; OBLIGER NICOLAS [FR]; GUILBAUD TRISTAN [CH]; OLTRAMARE CÉDRIC [CH]; CROZIER ETIENNE [CH]; ZIMMERMANN ROBIN [FR]; JONQUET ROMAIN [CH]",
    "applicants": "OLTRAMARE CEDRIC [CH]",
    "secondaryInventors": "(OLTRAMARE, Cédric; CHOLIER, Quentin; CROZIER, Etienne; HEISEL, Guillaume; OBLIGER, Nicolas; QUERRY, Hector; THULIEZ, Jean-Luc; ZIMMERMANN, Robin; JONQUET, Romain; GUILBAUD, Tristan)",
    "secondaryApplicants": "(OLTRAMARE, Cédric)",
    "classification": "Classification: - internationale F16B35/06; F16B37/14 - coopérative F16B35/06 (EP); F16B37/14 (EP)",
    "applicationNumber": "Numéro de demande WO2025IB58385 20250819 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2024IB58091 20240820 ;",
    "alsoPublishedAs": "Également publié en tant que: WO2026042020 (A1) WO2026042020 (A1) moins",
    "publicationAliases": [
      "WO2026042020A1"
    ],
    "publicationHeader": "Données bibliographiques: WO2026042020 (A1) ― 2026-02-26",
    "tags": [
      "OLTRAMARE CEDRIC",
      "F16B35/06",
      "2026"
    ],
    "coverImage": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_003_drawing_04.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_003_drawing_05.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_003_drawing_06.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_004_drawing_01.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_004_drawing_02.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_004_drawing_03.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_004_drawing_04.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_004_drawing_05.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_004_drawing_06.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_005_drawing_01.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/images/rendered_mosaic_page_005_drawing_02.png",
        "pdfHref": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 02",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2026042020A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=1&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20260226&CC=WO&NR=2026042020A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=WO&NR=2026042020A1&KC=A1&FT=D&ND=3&date=20260226&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=WO&NR=2026042020A1&KC=A1&FT=D&ND=3&date=20260226&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=WO&NR=2026042020A1&KC=A1&FT=D&ND=3&date=20260226&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=WO&NR=2026042020A1&KC=A1&FT=D&ND=3&date=20260226&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=WO&NR=2026042020A1&KC=A1&FT=D&ND=3&date=20260226&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=WO&NR=2026042020A1&KC=A1&FT=D&ND=3&date=20260226&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=WO&NR=2026042020A1&KC=A1&FT=D&ND=3&date=20260226&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=WO&NR=2026042020A1&KC=A1&FT=D&ND=3&date=20260226&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/WO2026042020A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP4488027A1",
    "publication": "EP4488027 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "REINFORCED ROTOMOLDED BODY",
    "abstract": "L'invention concerne un procédé de fabrication de pièces, par exemple d'une carrosserie (01) de véhicule, ledit procédé comprenant le rotomoulage d'une couche extérieure compacte (11, 21), le rotomoulage d'une couche intérieure compacte (12, 22) et le traitement de ladite couche intérieure pour augmenter les caractéristiques mécaniques de ladite pièce.",
    "date": "2025-01-08",
    "priorityDate": "2023-07-07",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; PLUQUET PATRICK [FR]; LANDWERLIN STÉPHANE [CH]; CROZIER ETIENNE [CH]; VIGOUROUX PHILIPPE [FR]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(HEISEL, Guillaume; LANDWERLIN, Stéphane; VIGOUROUX, Philippe; PLUQUET, Patrick; CROZIER, Etienne; THULIEZ, Jean-Luc)",
    "secondaryApplicants": "(Softcar SA)",
    "classification": "Classification: - internationale B29C41/04; B29C44/06; B60R13/02 - coopérative B29C35/045 (EP); B29C41/06 (EP); B29C41/22 (EP); B29C44/06 (EP); B29C44/34 (EP); B29C44/3415 (EP); B29K2105/04 (EP); B29L2031/30 (EP)",
    "applicationNumber": "Numéro de demande EP20230184269 20230707 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20230184269 20230707 ;",
    "alsoPublishedAs": "Également publié en tant que: EP4488027 (A1) CN121464026 (A) EP4739481 (A1) WO2025012732 (A1) EP4488027 (A1) CN121464026 (A) EP4739481 (A1) WO2025012732 (A1) moins",
    "publicationAliases": [
      "CN121464026A",
      "EP4488027A1",
      "EP4739481A1",
      "WO2025012732A1"
    ],
    "publicationHeader": "Données bibliographiques: EP4488027 (A1) ― 2025-01-08",
    "tags": [
      "SOFTCAR SA",
      "B29C41/04",
      "2025"
    ],
    "coverImage": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/EP4488027A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP4488027A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4488027A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=2&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20250108&CC=EP&NR=4488027A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=4488027A1&KC=A1&FT=D&ND=3&date=20250108&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=4488027A1&KC=A1&FT=D&ND=3&date=20250108&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=4488027A1&KC=A1&FT=D&ND=3&date=20250108&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=4488027A1&KC=A1&FT=D&ND=3&date=20250108&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=4488027A1&KC=A1&FT=D&ND=3&date=20250108&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=4488027A1&KC=A1&FT=D&ND=3&date=20250108&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=4488027A1&KC=A1&FT=D&ND=3&date=20250108&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=4488027A1&KC=A1&FT=D&ND=3&date=20250108&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP4488027A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP4705115A1",
    "publication": "EP4705115 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "DEFLECTOR FOR RIMS, E.G. CAR RIMS",
    "abstract": "",
    "date": "2026-03-11",
    "priorityDate": "2023-05-04",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; ALEXANDRE QUENTIN [CH]; OBLIGER NICOLAS [FR]; CROZIER ETIENNE [CH]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(CROZIER, Etienne; HEISEL, Guillaume; THULIEZ, Jean-Luc; ALEXANDRE, Quentin; OBLIGER, Nicolas)",
    "secondaryApplicants": "(Softcar SA)",
    "classification": "Classification: - internationale B60B5/02; B60B7/00; B60B7/06; B60B7/08 - coopérative B60B2310/614 (EP); B60B2310/656 (EP, KR); B60B2900/571 (EP, KR); B60B2900/572 (EP, KR); B60B5/02 (EP); B60B7/0013 (EP, KR); B60B7/0033 (EP, KR); B60B7/004 (EP); B60B7/0046 (EP); B60B7/0053 (EP); B60B7/006 (EP); B60B7/065 (EP, KR); B60B7/068 (EP, KR); B60B7/08 (EP, KR); Y02T10/88 (EP)",
    "applicationNumber": "Numéro de demande EP20240730764 20240503 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2023IB54660 20230504 ; WO2024IB54339 20240503 ;",
    "alsoPublishedAs": "Également publié en tant que: EP4705115 (A1) CN121079210 (A) JP2026515139 (A) KR20260003772 (A) WO2024228172 (A1) EP4705115 (A1) CN121079210 (A) JP2026515139 (A) KR20260003772 (A) WO2024228172 (A1) moins",
    "publicationAliases": [
      "CN121079210A",
      "EP4705115A1",
      "JP2026515139A",
      "KR20260003772A",
      "WO2024228172A1"
    ],
    "publicationHeader": "Données bibliographiques: EP4705115 (A1) ― 2026-03-11",
    "tags": [
      "SOFTCAR SA",
      "B60B5/02",
      "2026"
    ],
    "coverImage": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/EP4705115A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP4705115A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4705115A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=3&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20260311&CC=EP&NR=4705115A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=4705115A1&KC=A1&FT=D&ND=3&date=20260311&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=4705115A1&KC=A1&FT=D&ND=3&date=20260311&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=4705115A1&KC=A1&FT=D&ND=3&date=20260311&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=4705115A1&KC=A1&FT=D&ND=3&date=20260311&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=4705115A1&KC=A1&FT=D&ND=3&date=20260311&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=4705115A1&KC=A1&FT=D&ND=3&date=20260311&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=4705115A1&KC=A1&FT=D&ND=3&date=20260311&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=4705115A1&KC=A1&FT=D&ND=3&date=20260311&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP4705115A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP4680511A1",
    "publication": "EP4680511 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "RECYCLABLE STEERING WHEEL",
    "abstract": "",
    "date": "2026-01-21",
    "priorityDate": "2023-03-13",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; QUERRY HECTOR [CH]; JACOT MAURICE [CH]; CROZIER ETIENNE [CH]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(CROZIER, Etienne; HEISEL, Guillaume; JACOT, Maurice; QUERRY, Hector; THULIEZ, Jean-Luc)",
    "secondaryApplicants": "(Softcar SA)",
    "classification": "Classification: - internationale B62D1/04; B62D1/06 - coopérative B60Q3/283 (KR); B62D1/04 (EP); B62D1/06 (EP, KR)",
    "applicationNumber": "Numéro de demande EP20240715870 20240304 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2023IB52419 20230313 ; WO2024IB52084 20240304 ;",
    "alsoPublishedAs": "Également publié en tant que: EP4680511 (A1) CN120882620 (A) JP2026510043 (A) KR20250162592 (A) WO2024189459 (A1) EP4680511 (A1) CN120882620 (A) JP2026510043 (A) KR20250162592 (A) WO2024189459 (A1) moins",
    "publicationAliases": [
      "CN120882620A",
      "EP4680511A1",
      "JP2026510043A",
      "KR20250162592A",
      "WO2024189459A1"
    ],
    "publicationHeader": "Données bibliographiques: EP4680511 (A1) ― 2026-01-21",
    "tags": [
      "SOFTCAR SA",
      "B62D1/04",
      "2026"
    ],
    "coverImage": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/EP4680511A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP4680511A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP4680511A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=4&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20260121&CC=EP&NR=4680511A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=4680511A1&KC=A1&FT=D&ND=3&date=20260121&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=4680511A1&KC=A1&FT=D&ND=3&date=20260121&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=4680511A1&KC=A1&FT=D&ND=3&date=20260121&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=4680511A1&KC=A1&FT=D&ND=3&date=20260121&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=4680511A1&KC=A1&FT=D&ND=3&date=20260121&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=4680511A1&KC=A1&FT=D&ND=3&date=20260121&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=4680511A1&KC=A1&FT=D&ND=3&date=20260121&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=4680511A1&KC=A1&FT=D&ND=3&date=20260121&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP4680511A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "MA68857A1",
    "publication": "MA68857 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "ALL-TERRAIN SOLAR TRACTOR VEHICLE WITH INTERCHANGEABLE MODULES",
    "abstract": "All-terrain electric vehicle of simple architecture on which several modules can be mounted according to the desired use, the vehicle being provided with adjustable suspensions allowing to change the modules and to adjust the ground clearance, furthermore having a structure supporting solar panels in order to recharge the batteries powering the electric motorization, said vehicle being particularly adapted to be used in sunny countries with rough roads.",
    "date": "2025-06-30",
    "priorityDate": "2022-05-25",
    "inventors": "THULIEZ JEAN-LUC [CH]; CHOMAT TIMOTHÉE [FR]; HEISEL GUILLAUME [FR]; CROZIER ETIENNE [FR]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(THULIEZ, Jean-Luc; CHOMAT, Timothée; CROZIER, Etienne; HEISEL, Guillaume)",
    "secondaryApplicants": "(SOFTCAR SA)",
    "classification": "Classification: - internationale B60G3/00; B60P1/64 - coopérative B60G2300/38 (EP); B60G2500/30 (EP); B60G2800/203 (EP); B60G3/00 (MA); B60K1/04 (EP); B60K16/00 (EP); B60K2001/0438 (EP); B60K2016/003 (EP); B60P1/08 (EP); B60P1/6427 (EP, MA); B60Y2200/16 (EP); B62D21/04 (EP)",
    "applicationNumber": "Numéro de demande MA20230068857 20230525",
    "priorityNumbers": "Numéro(s) de priorité: WO2022IB54919 20220525 ; WO2023IB55381 20230525 ;",
    "alsoPublishedAs": "Également publié en tant que: MA68857 (A1) CR20240541 (A) WO2023228125 (A1) ZA202408899 (B) MA68857 (A1) CR20240541 (A) WO2023228125 (A1) ZA202408899 (B) moins Google Patents: OA21854A",
    "publicationAliases": [
      "CR20240541A",
      "MA68857A1",
      "OA21854A",
      "WO2023228125A1",
      "ZA202408899B"
    ],
    "publicationHeader": "Données bibliographiques: MA68857 (A1) ― 2025-06-30",
    "tags": [
      "SOFTCAR SA",
      "B60G3/00",
      "2025"
    ],
    "coverImage": "/assets/patents/MA68857A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/MA68857A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/MA68857A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/MA68857A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=6&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20250630&CC=MA&NR=68857A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=MA&NR=68857A1&KC=A1&FT=D&ND=3&date=20250630&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=MA&NR=68857A1&KC=A1&FT=D&ND=3&date=20250630&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=MA&NR=68857A1&KC=A1&FT=D&ND=3&date=20250630&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=MA&NR=68857A1&KC=A1&FT=D&ND=3&date=20250630&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=MA&NR=68857A1&KC=A1&FT=D&ND=3&date=20250630&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=MA&NR=68857A1&KC=A1&FT=D&ND=3&date=20250630&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=MA&NR=68857A1&KC=A1&FT=D&ND=3&date=20250630&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=MA&NR=68857A1&KC=A1&FT=D&ND=3&date=20250630&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/MA68857A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2025129628A1",
    "publication": "US2025129628 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "AUTOMOBILE PLANT WITH SMALL CARBON FOOTPRINT",
    "abstract": "A plant (01) for manufacturing electric or hybrid vehicles, the plant (01) comprising, on one site, at least one assembly space (10) for the vehicles, in which no operation of transforming steel is carried out, thereby largely eliminating toxic emissions, the production of chemical waste, noise pollution, vibrations, dust and water consumption, with the result that the plant can be installed in the vicinity of or in residential areas.",
    "date": "2025-04-24",
    "priorityDate": "2021-12-24",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; QUERRY HECTOR [CH]; TOURAT YANNICK [FR]; CROZIER ETIENNE [CH]; LANDWERLIN STÉPHANE [CH]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(CROZIER, Etienne; HEISEL, Guillaume; LANDWERLIN, Stéphane; QUERRY, Hector; THULIEZ, Jean-Luc; TOURAT, Yannick)",
    "secondaryApplicants": "(SOFTCAR SA)",
    "classification": "Classification: - internationale B60S5/00; B62D29/04; B62D65/02; E04H5/02 - coopérative B60S5/00 (US); B62D29/04 (US); B62D63/025 (EP); B62D65/02 (US); B62D65/022 (EP); E04H5/02 (EP, US)",
    "applicationNumber": "Numéro de demande US202218723252 20221223 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2021IB62291 20211224 ; WO2022IB62737 20221223 ;",
    "alsoPublishedAs": "Également publié en tant que: US2025129628 (A1) CN118524963 (A) EP4452730 (A1) JP2025500155 (A) WO2023119246 (A1) US2025129628 (A1) CN118524963 (A) EP4452730 (A1) JP2025500155 (A) WO2023119246 (A1) moins Google Patents: US20250129628A1",
    "publicationAliases": [
      "CN118524963A",
      "EP4452730A1",
      "JP2025500155A",
      "US2025129628A1",
      "US20250129628A1",
      "WO2023119246A1"
    ],
    "publicationHeader": "Données bibliographiques: US2025129628 (A1) ― 2025-04-24",
    "tags": [
      "SOFTCAR SA",
      "B60S5/00",
      "2025"
    ],
    "coverImage": "/assets/patents/US2025129628A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2025129628A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2025129628A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2025129628A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2025129628A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2025129628A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=7&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20250424&CC=US&NR=2025129628A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2025129628A1&KC=A1&FT=D&ND=3&date=20250424&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2025129628A1&KC=A1&FT=D&ND=3&date=20250424&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2025129628A1&KC=A1&FT=D&ND=3&date=20250424&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2025129628A1&KC=A1&FT=D&ND=3&date=20250424&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2025129628A1&KC=A1&FT=D&ND=3&date=20250424&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2025129628A1&KC=A1&FT=D&ND=3&date=20250424&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2025129628A1&KC=A1&FT=D&ND=3&date=20250424&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2025129628A1&KC=A1&FT=D&ND=3&date=20250424&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2025129628A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2024326565A1",
    "publication": "US2024326565 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "Vehicle door",
    "abstract": "[0000] The invention relates to a sectional door of a vehicle opening as close as possible to the body of said vehicle, having cam strikers for closing, locking and opening same, having actuators for opening same and having a movable window capable of separating from said body and translating horizontally along said door. These elements are implemented on a door having surfaces with a complex geometry, thus providing a one-piece body having surfaces with a complex geometry, with a single large opening on the side for accessing the front seats and the rear seats, and a single large door for closing said opening.",
    "date": "2024-10-03",
    "priorityDate": "2021-07-05",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; GULLI CLARA [CH]; CROZIER ETIENNE [CH]; LANDWERLIN STÉPHANE [CH]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(CROZIER, Etienne; GULLI, Clara; HEISEL, Guillaume; LANDWERLIN, Stéphane; THULIEZ, Jean-Luc; Crozier, Etienne; Gulli, Clara; Heisel, Guillaume; Landwerlin, Stéphane; Thuliez, Jean-Luc)",
    "secondaryApplicants": "(SOFTCAR SA; SOFTCAR SA)",
    "classification": "Classification: - internationale B60J5/04; E05B81/06; E05B81/16; E05B83/36; E05B85/04; E05F15/611 - coopérative B60J1/16 (EP); B60J5/0473 (EP, US)",
    "applicationNumber": "Numéro de demande US202218576545 20220705 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2021IB56012 20210705 ; WO2022IB56213 20220705 ;",
    "alsoPublishedAs": "Également publié en tant que: CN117642302 (A) EP4366966 (A2) US12496884 (B2) WO2023281396 (A2) WO2023281396 (A3) CN117642302 (A) EP4366966 (A2) US12496884 (B2) WO2023281396 (A2) WO2023281396 (A3) moins Google Patents: US20240326565A1",
    "publicationAliases": [
      "CN117642302A",
      "EP4366966A2",
      "US12496884B2",
      "US2024326565A1",
      "US20240326565A1",
      "WO2023281396A2",
      "WO2023281396A3"
    ],
    "publicationHeader": "Données bibliographiques: US2024326565 (A1) ― 2024-10-03",
    "tags": [
      "SOFTCAR SA",
      "B60J5/04",
      "2024"
    ],
    "coverImage": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_003_drawing_04.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_003_drawing_05.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_003_drawing_06.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_004_drawing_01.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_004_drawing_02.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_004_drawing_03.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_004_drawing_04.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_004_drawing_05.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_004_drawing_06.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_005_drawing_01.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_005_drawing_02.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_005_drawing_03.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_005_drawing_04.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_005_drawing_05.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_005_drawing_06.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_006_drawing_01.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_006_drawing_02.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_006_drawing_03.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_006_drawing_04.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_006_drawing_05.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_006_drawing_06.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/images/rendered_mosaic_page_007_drawing_01.png",
        "pdfHref": "/assets/patents/US2024326565A1/pdfs/mosaic_page_007.pdf",
        "label": "mosaic page 007 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2024326565A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2024326565A1/pdfs/mosaic_page_007.pdf",
        "label": "mosaic page 007",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=8&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20241003&CC=US&NR=2024326565A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2024326565A1&KC=A1&FT=D&ND=3&date=20241003&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2024326565A1&KC=A1&FT=D&ND=3&date=20241003&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2024326565A1&KC=A1&FT=D&ND=3&date=20241003&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2024326565A1&KC=A1&FT=D&ND=3&date=20241003&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2024326565A1&KC=A1&FT=D&ND=3&date=20241003&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2024326565A1&KC=A1&FT=D&ND=3&date=20241003&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2024326565A1&KC=A1&FT=D&ND=3&date=20241003&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2024326565A1&KC=A1&FT=D&ND=3&date=20241003&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2024326565A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2023164492A1",
    "publication": "US2023164492 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "energy",
    "title": "Dual axial magnetic flux induction speaker",
    "abstract": "[0000] The present invention relates to the operating principle of a loudspeaker (20) with an induction motor (10). The motor (10) has two magnets (1aand 1b) positioned on either side of a central core (2). The magnets (1aand 1b) thus create two magnetic fields (9aand 9b) doubling the magnetic field detected in the movable armature (4). The magnetic field coupled to the electrical field generated by a fixed coil (5) creates a force in the armature (4), which is linked to diaphragm (7) producing the sound. Thus, by increasing the magnetic field, and therefore the force generated in the armature (4), the performances of the loudspeaker (20) are likewise enhanced.",
    "date": "2023-05-25",
    "priorityDate": "2020-04-08",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; QUERRY HECTOR [CH]; ZIMMERMANN ROBIN [CH]; CROZIER ETIENNE [CH]; HOFFET ADRIEN [CH]",
    "applicants": "OLTRAMARE MICHEL [CH]",
    "secondaryInventors": "(QUERRY, Hector; HEISEL, Guillaume; HOFFET, Adrien; THULIEZ, Jean-Luc; CROZIER, Etienne; ZIMMERMANN, Robin; Querry, Hector; Heisel, Guillaume; Hoffet, Adrien; Thuliez, Jean-Luc; Crozier, Etienne; Zimmermann, Robin)",
    "secondaryApplicants": "(OLTRAMARE Michel; Oltramare Michel)",
    "classification": "Classification: - internationale H02K33/16; H04R9/02; H04R9/06 - coopérative H02K33/00 (EP); H02K33/16 (EP, US); H04R2209/043 (EP, US); H04R9/025 (EP, US); H04R9/06 (EP, US);",
    "applicationNumber": "Numéro de demande US202117918078 20210401 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: CH20200000425 20200408 ; WO2021IB52737 20210401 ;",
    "alsoPublishedAs": "Également publié en tant que: EP4133750 (A1) US12513469 (B2) WO2021205295 (A1) EP4133750 (A1) US12513469 (B2) WO2021205295 (A1) moins Google Patents: US20230164492A1",
    "publicationAliases": [
      "EP4133750A1",
      "US12513469B2",
      "US2023164492A1",
      "US20230164492A1",
      "WO2021205295A1"
    ],
    "publicationHeader": "Données bibliographiques: US2023164492 (A1) ― 2023-05-25",
    "tags": [
      "OLTRAMARE MICHEL",
      "H02K33/16",
      "2023"
    ],
    "coverImage": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US2023164492A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2023164492A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2023164492A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=10&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20230525&CC=US&NR=2023164492A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2023164492A1&KC=A1&FT=D&ND=3&date=20230525&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2023164492A1&KC=A1&FT=D&ND=3&date=20230525&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2023164492A1&KC=A1&FT=D&ND=3&date=20230525&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2023164492A1&KC=A1&FT=D&ND=3&date=20230525&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2023164492A1&KC=A1&FT=D&ND=3&date=20230525&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2023164492A1&KC=A1&FT=D&ND=3&date=20230525&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2023164492A1&KC=A1&FT=D&ND=3&date=20230525&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2023164492A1&KC=A1&FT=D&ND=3&date=20230525&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2023164492A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2022338602A1",
    "publication": "US2022338602 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Frame for bad weather and/or sun protection device",
    "abstract": "A deployable frame for a weather and/or sun protection device, including: a mast with a longitudinal axis on which a slider is mounted so as to slide between a first position in which the frame is closed and a second position in which the frame is open; at least one rib connected by a stretcher to the runner, the rib including an end connected to a notch carried by one end of the mast, wherein the rib includes a first segment formed of a first part and a second part that are movable relative to each other about the extension axis of the first segment, the first part of the first segment of the rib is connected to the notch by a pivot connection about an axis which is perpendicular to a plane inclined obliquely to the longitudinal axis of the mast so that in the first closed position of the frame the first segment of the rib extends along the mast and in the second open position of the frame the first segment of the rib is moved away from the mast.",
    "date": "2022-10-27",
    "priorityDate": "2019-09-06",
    "inventors": "THULIEZ JEAN-LUC [CH]; HEISEL GUILLAUME [CH]; QUERRY HECTOR [CH]; ZIMMERMANN ROBIN [CH]; CROZIER ETIENNE [CH]",
    "applicants": "CHEVILLARD ERICK [CN]; CHEVILLARD ERIC [CN]",
    "secondaryInventors": "(Querry, Hector; Thuliez, Jean-Luc; Crozier, Etienne; Zimmermann, Robin; Heisel, Guillaume; Querry, Hector; Thuliez, Jean-Luc; Crozier, Etienne; Zimmermann, Robin; Heisel, Guillaume)",
    "secondaryApplicants": "(Chevillard Erick; Chevillard Eric)",
    "classification": "Classification: - internationale A45B19/10; A45B23/00; A45B25/02; A45B25/24 - coopérative A45B19/04 (US); A45B19/10 (EP, US); A45B2023/0006 (US); A45B2200/1081 (US); A45B25/02 (EP, US); A45B25/10 (EP); A45B25/16 (EP); A45B25/24 (EP, US);",
    "applicationNumber": "Numéro de demande US201917640692 20190906 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2019EP73882 20190906 ;",
    "alsoPublishedAs": "Également publié en tant que: CN114828691 (A) CN114828691 (B) EP4025094 (A1) EP4025094 (B1) EP4025094 (C0) plus CN114828691 (A) CN114828691 (B) EP4025094 (A1) EP4025094 (B1) EP4025094 (C0) ES2980416 (T3) PL4025094 (T3) US12303003 (B2) WO2021043426 (A1) moins Google Patents: US20220338602A1",
    "publicationAliases": [
      "CN114828691A",
      "CN114828691B",
      "EP4025094A1",
      "EP4025094B1",
      "EP4025094C0",
      "ES2980416T3",
      "PL4025094T3",
      "US12303003B2",
      "US2022338602A1",
      "US20220338602A1",
      "WO2021043426A1"
    ],
    "publicationHeader": "Données bibliographiques: US2022338602 (A1) ― 2022-10-27",
    "tags": [
      "CHEVILLARD ERICK",
      "A45B19/10",
      "2022"
    ],
    "coverImage": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_002.png",
    "images": [
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_002.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_002.pdf",
        "label": "original drawing page 002",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_003.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_003.pdf",
        "label": "original drawing page 003",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_004.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_004.pdf",
        "label": "original drawing page 004",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_005.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_005.pdf",
        "label": "original drawing page 005",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_006.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_006.pdf",
        "label": "original drawing page 006",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_007.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_007.pdf",
        "label": "original drawing page 007",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_008.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_008.pdf",
        "label": "original drawing page 008",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_009.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_009.pdf",
        "label": "original drawing page 009",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_010.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_010.pdf",
        "label": "original drawing page 010",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/images/rendered_original_drawing_page_011.png",
        "pdfHref": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_011.pdf",
        "label": "original drawing page 011",
        "kind": "original"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_002.pdf",
        "label": "original drawing page 002",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_003.pdf",
        "label": "original drawing page 003",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_004.pdf",
        "label": "original drawing page 004",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_005.pdf",
        "label": "original drawing page 005",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_006.pdf",
        "label": "original drawing page 006",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_007.pdf",
        "label": "original drawing page 007",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_008.pdf",
        "label": "original drawing page 008",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_009.pdf",
        "label": "original drawing page 009",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_010.pdf",
        "label": "original drawing page 010",
        "kind": "original"
      },
      {
        "href": "/assets/patents/US2022338602A1/pdfs/original_drawing_page_011.pdf",
        "label": "original drawing page 011",
        "kind": "original"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=11&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20221027&CC=US&NR=2022338602A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2022338602A1&KC=A1&FT=D&ND=3&date=20221027&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2022338602A1&KC=A1&FT=D&ND=3&date=20221027&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2022338602A1&KC=A1&FT=D&ND=3&date=20221027&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2022338602A1&KC=A1&FT=D&ND=3&date=20221027&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2022338602A1&KC=A1&FT=D&ND=3&date=20221027&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2022338602A1&KC=A1&FT=D&ND=3&date=20221027&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2022338602A1&KC=A1&FT=D&ND=3&date=20221027&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2022338602A1&KC=A1&FT=D&ND=3&date=20221027&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2022338602A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "WO2021043427A1",
    "publication": "WO2021043427 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "HOUSING FOR A DEVICE FOR PROTECTION AGAINST BAD WEATHER AND/OR SUN",
    "abstract": "The present document relates to a device for protection against bad weather and/or sun, comprising: - a framework (12) that is extensible between a first closed framework (12) position and a second open framework (12) position, said framework (12) supporting a protective fabric (14); - a longitudinal axis mast (L) on which a sliding element (32) is to be mounted which, by virtue of sliding along said mast (18), is designed to make the framework (12) extend; and - a handle element (64) supported by one end of the mast (18); characterised in that it comprises a case in which all or part of the extensible framework (12) can be housed when in its first closed position, and in that the case (66) and the handle element (64) are configured to cooperate sealingly one with the other when the framework (12) is in its first position in order to form a sealed housing (62).",
    "date": "2021-03-11",
    "priorityDate": "2019-09-06",
    "inventors": "THULIEZ JEAN-LUC [CH]; HEISEL GUILLAUME [CH]; QUERRY HECTOR [CH]; ZIMMERMANN ROBIN [CH]; CROZIER ETIENNE [CH]",
    "applicants": "CHEVILLARD ERIC [CN]",
    "secondaryInventors": "(QUERRY, Hector; THULIEZ Jean-Luc; CROZIER, Etienne; ZIMMERMANN, Robin; HEISEL, Guillaume)",
    "secondaryApplicants": "(CHEVILLARD, Eric)",
    "classification": "Classification: - internationale A45B25/02; A45B25/10; A45B25/24 - coopérative A45B25/02 (EP); A45B25/10 (EP); A45B25/24 (EP)",
    "applicationNumber": "Numéro de demande WO2019EP73884 20190906 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2019EP73884 20190906 ;",
    "alsoPublishedAs": "Également publié en tant que: WO2021043427 (A1) WO2021043427 (A1) moins",
    "publicationAliases": [
      "WO2021043427A1"
    ],
    "publicationHeader": "Données bibliographiques: WO2021043427 (A1) ― 2021-03-11",
    "tags": [
      "CHEVILLARD ERIC",
      "A45B25/02",
      "2021"
    ],
    "coverImage": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2021043427A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=12&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20210311&CC=WO&NR=2021043427A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=WO&NR=2021043427A1&KC=A1&FT=D&ND=3&date=20210311&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=WO&NR=2021043427A1&KC=A1&FT=D&ND=3&date=20210311&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=WO&NR=2021043427A1&KC=A1&FT=D&ND=3&date=20210311&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=WO&NR=2021043427A1&KC=A1&FT=D&ND=3&date=20210311&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=WO&NR=2021043427A1&KC=A1&FT=D&ND=3&date=20210311&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=WO&NR=2021043427A1&KC=A1&FT=D&ND=3&date=20210311&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=WO&NR=2021043427A1&KC=A1&FT=D&ND=3&date=20210311&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=WO&NR=2021043427A1&KC=A1&FT=D&ND=3&date=20210311&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/WO2021043427A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP3744622A1",
    "publication": "EP3744622 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "VEHICLE ARCHITECTURE",
    "abstract": "Architecture de véhicule comprenant un châssis structurel rigide (10) de type plateforme constitué de trois modules (20, 30, 40), adapté pour reprendre tous les efforts dynamiques et crash du véhicule ; ledit véhicule comprenant également un module coque indépendant (50), supporté par ledit châssis (10), qui forme l'habitacle et la carrosserie du véhicule ; lesdits modules (20, 30, 40, 50) pouvant être assemblés hors ligne avec une nombre limité d'opérations, ces opérations pouvant être réalisées avec des outils standards ; ledit véhicule comprenant également une structure en U (23) et divers autres éléments pour supporter les efforts des crash.",
    "date": "2020-12-02",
    "priorityDate": "2019-05-29",
    "inventors": "THULIEZ JEAN-LUC [CH]; HEISEL GUILLAUME [CH]; QUERRY HECTOR [CH]; ZIMMERMANN ROBIN [CH]; ALEXANDRE QUENTIN [CH]; CROZIER ETIENNE [CH]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(THULIEZ, Jean-Luc; CROZIER, Etienne; ZIMMERMANN, Robin; QUERRY, Hector; ALEXANDRE, Quentin; HEISEL, Guillaume; THULIEZ, Jean-Luc; CROZIER, Etienne; ZIMMERMANN, Robin; QUERRY, Hector; ALEXANDRE, Quentin; HEISEL, Guillaume; THULIEZ, Jean-Luc; CROZIER, Etienne; ZIMMERMANN, Robin; QUERRY, Hector; ALEXANDRE, Quentin; HEISEL, Guillaume)",
    "secondaryApplicants": "(Softcar SA; Softcar SA; Softcar SA)",
    "classification": "Classification: - internationale B62D24/00; B62D27/06; B62D29/04; B62D63/02 - coopérative B62D24/00 (EP); B62D27/06 (EP); B62D27/065 (EP); B62D29/043 (EP); B62D63/025 (EP)",
    "applicationNumber": "Numéro de demande EP20200177589 20200529 Effet unitaire Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20190177383 20190529 ;",
    "alsoPublishedAs": "Également publié en tant que: EP3744622 (A1) EP3744622 (B1) EP3744622 (C0) ES3037142 (T3) HUE073028 (T2) plus EP3744622 (A1) EP3744622 (B1) EP3744622 (C0) ES3037142 (T3) HUE073028 (T2) PL3744622 (T3) moins",
    "publicationAliases": [
      "EP3744622A1",
      "EP3744622B1",
      "EP3744622C0",
      "ES3037142T3",
      "HUE073028T2",
      "PL3744622T3"
    ],
    "publicationHeader": "Données bibliographiques: EP3744622 (A1) ― 2020-12-02",
    "tags": [
      "SOFTCAR SA",
      "B62D24/00",
      "2020"
    ],
    "coverImage": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_003_drawing_04.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_003_drawing_05.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_003_drawing_06.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_004_drawing_01.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_004_drawing_02.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_004_drawing_03.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_004_drawing_04.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_004_drawing_05.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_004_drawing_06.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/images/rendered_mosaic_page_005_drawing_01.png",
        "pdfHref": "/assets/patents/EP3744622A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP3744622A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3744622A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=13&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20201202&CC=EP&NR=3744622A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=3744622A1&KC=A1&FT=D&ND=3&date=20201202&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=3744622A1&KC=A1&FT=D&ND=3&date=20201202&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=3744622A1&KC=A1&FT=D&ND=3&date=20201202&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=3744622A1&KC=A1&FT=D&ND=3&date=20201202&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=3744622A1&KC=A1&FT=D&ND=3&date=20201202&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=3744622A1&KC=A1&FT=D&ND=3&date=20201202&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=3744622A1&KC=A1&FT=D&ND=3&date=20201202&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=3744622A1&KC=A1&FT=D&ND=3&date=20201202&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP3744622A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2022141591A1",
    "publication": "US2022141591 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "energy",
    "title": "System for cooling the stationary winding of an induction motor",
    "abstract": "The present invention relates to principles for cooling the stationary winding of an induction motor, said winding being positioned outside the movable armature. The cooling can be achieved by means of cooling fins, openings allowing the ventilation of the winding with or without a fan, a fluid circuit outside the bowl, a fluid circuit inside the bowl, a fluid circuit inside the winding, and/or the addition of heat pipes inside the bowl. This motor as presented can be used, without limitation, inside loudspeakers or vibrators.",
    "date": "2022-05-05",
    "priorityDate": "2019-02-06",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; QUERRY HECTOR [CH]; CROZIER ETIENNE [CH]; HOFFET ADRIEN [CH]; ZIMMERMAN ROBIN [CH]",
    "applicants": "OLTRAMARE MICHEL [CH]",
    "secondaryInventors": "(QUERRY, Hector; HEISEL, Guillaume; HOFFET, Adrien; THULIEZ, Jean-Luc; CROZIER, Etienne; ZIMMERMAN, Robin; Querry, Hector; Heisel, Guillaume; Hoffet, Adrien; Thuliez, Jean-Luc; Crozier, Etienne; Zimmerman, Robin)",
    "secondaryApplicants": "(OLTRAMARE Michel; Oltramare Michel)",
    "classification": "Classification: - internationale H04R1/02; H04R9/02; H04R9/06 - coopérative H04R1/028 (US); H04R9/022 (EP, US); H04R9/025 (US); H04R9/046 (EP); H04R9/06 (US);",
    "applicationNumber": "Numéro de demande US202017428938 20200206 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: CH20190000136 20190206 ; WO2020IB50963 20200206 ;",
    "alsoPublishedAs": "Également publié en tant que: BR112021014602 (A2) CA3127120 (A1) EP3922040 (A1) EP3922040 (B1) EP3922040 (C0) plus BR112021014602 (A2) CA3127120 (A1) EP3922040 (A1) EP3922040 (B1) EP3922040 (C0) JP2022519475 (A) US11930340 (B2) WO2020161669 (A1) moins Google Patents: BR112021014602B1; US20220141591A1",
    "publicationAliases": [
      "BR112021014602A2",
      "BR112021014602B1",
      "CA3127120A1",
      "EP3922040A1",
      "EP3922040B1",
      "EP3922040C0",
      "JP2022519475A",
      "US11930340B2",
      "US2022141591A1",
      "US20220141591A1",
      "WO2020161669A1"
    ],
    "publicationHeader": "Données bibliographiques: US2022141591 (A1) ― 2022-05-05",
    "tags": [
      "OLTRAMARE MICHEL",
      "H04R1/02",
      "2022"
    ],
    "coverImage": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US2022141591A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2022141591A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2022141591A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=14&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20220505&CC=US&NR=2022141591A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2022141591A1&KC=A1&FT=D&ND=3&date=20220505&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2022141591A1&KC=A1&FT=D&ND=3&date=20220505&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2022141591A1&KC=A1&FT=D&ND=3&date=20220505&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2022141591A1&KC=A1&FT=D&ND=3&date=20220505&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2022141591A1&KC=A1&FT=D&ND=3&date=20220505&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2022141591A1&KC=A1&FT=D&ND=3&date=20220505&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2022141591A1&KC=A1&FT=D&ND=3&date=20220505&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2022141591A1&KC=A1&FT=D&ND=3&date=20220505&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2022141591A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2021127892A1",
    "publication": "US2021127892 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Beverage preparation apparatus with beverage draining means",
    "abstract": "[0001] Beverage preparation apparatus for preparing a beverage comprising: —a water tank (2) for storing water, —a brewing unit (3) for receiving a dose of beverage ingredients, —a water in line (5) for supplying water from the water tank to the brewing unit (3) including a pressure pump (4) for supplying pressurized liquid to the brewing unit and a fluid heater (29) for heating liquid, —a control unit (6) for selectively controlling the activation of the pressure pump, wherein it further comprises a fluidic interrupter (7) positionable in fluidic interruption position for interrupting the fluidic communication between the water tank (2) and the water line (5) and, reversely, positionable in fluidic communication position for restoring the fluid communication between the water tank and the water line and wherein the control unit (6) is arranged for automatically activating an anti-freeze mode by activating the fluidic interrupter (7) in fluidic interruption position and by miming the pressure pump (4) to at least partially empty the water line (5) from water contained therein.",
    "date": "2021-05-06",
    "priorityDate": "2017-04-11",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; ROMAND DAMIEN [CH]; CROZIER ETIENNE [CH]; MAGATTI MARCO [CH]",
    "applicants": "NESTLE SA [CH]",
    "secondaryInventors": "(Crozier, Etienne; Heisel, Guillaume; Magatti, Marco; Romand, Damien; Thuliez, Jean-Luc; Crozier, Etienne; Heisel, Guillaume; Magatti, Marco; Romand, Damien; Thuliez, Jean-Luc)",
    "secondaryApplicants": "(SOCIETE DES PRODUITS NESTLE S.A.; SOCIETE DES PRODUITS NESTLE S.A.)",
    "classification": "Classification: - internationale A47J31/00; A47J31/40; A47J31/46; A47J31/52; A47J31/54; A47J31/58 - coopérative A47J2202/00 (US); A47J31/005 (EP, US); A47J31/407 (US); A47J31/461 (US); A47J31/462 (US); A47J31/468 (US); A47J31/469 (US); A47J31/525 (US); A47J31/542 (US); A47J31/58 (EP, US);",
    "applicationNumber": "Numéro de demande US201816604063 20180409 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20170165972 20170411 ; WO2018EP58966 20180409 ;",
    "alsoPublishedAs": "Également publié en tant que: CN110461197 (A) CN110461197 (B) EP3609375 (A1) JP2020517528 (A) US11523706 (B2) plus CN110461197 (A) CN110461197 (B) EP3609375 (A1) JP2020517528 (A) US11523706 (B2) WO2018189070 (A1) moins Google Patents: US20210127892A1",
    "publicationAliases": [
      "CN110461197A",
      "CN110461197B",
      "EP3609375A1",
      "JP2020517528A",
      "US11523706B2",
      "US2021127892A1",
      "US20210127892A1",
      "WO2018189070A1"
    ],
    "publicationHeader": "Données bibliographiques: US2021127892 (A1) ― 2021-05-06",
    "tags": [
      "NESTLE SA",
      "A47J31/00",
      "2021"
    ],
    "coverImage": "/assets/patents/US2021127892A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2021127892A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2021127892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021127892A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2021127892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021127892A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2021127892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021127892A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2021127892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021127892A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2021127892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021127892A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2021127892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2021127892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=15&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20210506&CC=US&NR=2021127892A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2021127892A1&KC=A1&FT=D&ND=3&date=20210506&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2021127892A1&KC=A1&FT=D&ND=3&date=20210506&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2021127892A1&KC=A1&FT=D&ND=3&date=20210506&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2021127892A1&KC=A1&FT=D&ND=3&date=20210506&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2021127892A1&KC=A1&FT=D&ND=3&date=20210506&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2021127892A1&KC=A1&FT=D&ND=3&date=20210506&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2021127892A1&KC=A1&FT=D&ND=3&date=20210506&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2021127892A1&KC=A1&FT=D&ND=3&date=20210506&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2021127892A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2021106167A1",
    "publication": "US2021106167 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Beverage preparation device with beverage draining means",
    "abstract": "[0001] Beverage preparation device (1) for preparing a beverage from a beverage dose (2) comprising: —a brewing unit (3) for receiving the dose (2) and preparing a beverage from the ingredients contained within the dose and pressurized liquid injected in the dose, —a pressure pump (4) for supplying pressurized liquid to the brewing unit (3), —beverage dispensing means (5) connected to the brewing unit and comprising a beverage injector (6) arranged for dispensing the beverage through a bottom (8) of a beverage receptacle (7); wherein the beverage dispensing means (5) comprises a residual beverage draining valve (9), between the beverage injector (6) and the brewing unit (3), which is arranged to be moved between a beverage dispensing position and a residual beverage draining position, wherein the residual beverage draining valve (9) and/or the beverage receptacle (7) comprise valve activation means (10) arranged to move the draining valve between a beverage dispensing position in response to the engagement of the bottom of the receptacle with the beverage injector and a residual beverage draining position in response to the removal of receptacle from the beverage injector (6).",
    "date": "2021-04-15",
    "priorityDate": "2017-04-11",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; ZIMMERMANN ROBIN [CH]; ROMAND DAMIEN [CH]; CROZIER ETIENNE [CH]; HOFFET ADRIEN [CH]; MAGATTI MARCO [CH]",
    "applicants": "NESTLE SA [CH]",
    "secondaryInventors": "(Crozier, Etienne; Heisel, Guillaume; Hoffet, Adrien; Magatti, Marco; Romand, Damien; Thuliez, Jean-Luc; Zimmermann, Robin; Crozier, Etienne; Heisel, Guillaume; Hoffet, Adrien; Magatti, Marco; Romand, Damien; Thuliez, Jean-Luc; Zimmermann, Robin)",
    "secondaryApplicants": "(SOCIETE DES PRODUITS NESTLE S.A.; SOCIETE DES PRODUITS NESTLE S.A.)",
    "classification": "Classification: - internationale A47J31/00; A47J31/36; A47J31/46; A47J31/52; A47J31/58 - coopérative A47J31/005 (US); A47J31/3604 (US); A47J31/3623 (US); A47J31/3633 (US); A47J31/3676 (US); A47J31/4403 (EP); A47J31/46 (EP); A47J31/461 (US); A47J31/468 (US); A47J31/5251 (US); A47J31/58 (US);",
    "applicationNumber": "Numéro de demande US201816603305 20180409 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20170165968 20170411 ; WO2018EP58970 20180409 ;",
    "alsoPublishedAs": "Également publié en tant que: CN110461195 (A) EP3609372 (A1) EP3609372 (B1) JP2020516344 (A) US11589704 (B2) plus CN110461195 (A) EP3609372 (A1) EP3609372 (B1) JP2020516344 (A) US11589704 (B2) WO2018189073 (A1) moins Google Patents: US20210106167A1",
    "publicationAliases": [
      "CN110461195A",
      "EP3609372A1",
      "EP3609372B1",
      "JP2020516344A",
      "US11589704B2",
      "US2021106167A1",
      "US20210106167A1",
      "WO2018189073A1"
    ],
    "publicationHeader": "Données bibliographiques: US2021106167 (A1) ― 2021-04-15",
    "tags": [
      "NESTLE SA",
      "A47J31/00",
      "2021"
    ],
    "coverImage": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US2021106167A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2021106167A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2021106167A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=16&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20210415&CC=US&NR=2021106167A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2021106167A1&KC=A1&FT=D&ND=3&date=20210415&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2021106167A1&KC=A1&FT=D&ND=3&date=20210415&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2021106167A1&KC=A1&FT=D&ND=3&date=20210415&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2021106167A1&KC=A1&FT=D&ND=3&date=20210415&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2021106167A1&KC=A1&FT=D&ND=3&date=20210415&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2021106167A1&KC=A1&FT=D&ND=3&date=20210415&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2021106167A1&KC=A1&FT=D&ND=3&date=20210415&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2021106167A1&KC=A1&FT=D&ND=3&date=20210415&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2021106167A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2020154939A1",
    "publication": "US2020154939 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "Beverage preparation device for vehicle",
    "abstract": "[0001] The invention relates to a device (1) for preparing a beverage, more particularly, for a vehicle comprising: a brewing unit (2) for receiving a dose (3) of beverage ingredients, a pressure pump (4) for supplying pressurized liquid to the brewing unit, an electronic control unit (5) for selectively controlling the activation of the pressure pump, wherein the electronic control unit (5) is arranged to control the activation and deactivation of the pressure pump (4), by providing output to the pressure pump as response to input indicative of a determined inclination angle relative to horizontal and/or to a detected spatial displacement or acceleration; said input being received from inclination angle and/or displacement sensing means (6) which are part of and/or foreign to the device.",
    "date": "2020-05-21",
    "priorityDate": "2017-04-11",
    "inventors": "THULIEZ JEAN-LUC [CH]; ROMAND DAMIEN [CH]; CROZIER ETIENNE [CH]; HOFFET ADRIEN [CH]; MAGATTI MARCO [CH]",
    "applicants": "NESTLE SA [CH]",
    "secondaryInventors": "(Crozier, Etienne; Hoffet, Adrien; Magatti, Marco; Romand, Damien; Thuliez, Jean-Luc; Crozier, Etienne; Hoffet, Adrien; Magatti, Marco; Romand, Damien; Thuliez, Jean-Luc)",
    "secondaryApplicants": "(SOCIETE DES PRODUITS NESTLE S.A.; SOCIETE DES PRODUITS NESTLE S.A.)",
    "classification": "Classification: - internationale A47J31/00; A47J31/36; A47J31/52 - coopérative A47J31/005 (EP, US); A47J31/3676 (US); A47J31/52 (EP); A47J31/521 (EP, US); A47J31/525 (EP, US); A47J31/5253 (EP); A47J31/5255 (EP);",
    "applicationNumber": "Numéro de demande US201816604070 20180409 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20170165966 20170411 ; WO2018EP58967 20180409 ;",
    "alsoPublishedAs": "Également publié en tant que: CN110461196 (A) CN110461196 (B) EP3387966 (A1) EP3609374 (A1) EP3609374 (B1) plus CN110461196 (A) CN110461196 (B) EP3387966 (A1) EP3609374 (A1) EP3609374 (B1) US11684206 (B2) WO2018189071 (A1) moins Google Patents: US20200154939A1",
    "publicationAliases": [
      "CN110461196A",
      "CN110461196B",
      "EP3387966A1",
      "EP3609374A1",
      "EP3609374B1",
      "US11684206B2",
      "US2020154939A1",
      "US20200154939A1",
      "WO2018189071A1"
    ],
    "publicationHeader": "Données bibliographiques: US2020154939 (A1) ― 2020-05-21",
    "tags": [
      "NESTLE SA",
      "A47J31/00",
      "2020"
    ],
    "coverImage": "/assets/patents/US2020154939A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2020154939A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2020154939A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2020154939A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2020154939A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2020154939A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2020154939A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2020154939A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2020154939A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2020154939A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2020154939A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2020154939A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2020154939A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2020154939A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=17&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20200521&CC=US&NR=2020154939A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2020154939A1&KC=A1&FT=D&ND=3&date=20200521&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2020154939A1&KC=A1&FT=D&ND=3&date=20200521&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2020154939A1&KC=A1&FT=D&ND=3&date=20200521&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2020154939A1&KC=A1&FT=D&ND=3&date=20200521&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2020154939A1&KC=A1&FT=D&ND=3&date=20200521&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2020154939A1&KC=A1&FT=D&ND=3&date=20200521&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2020154939A1&KC=A1&FT=D&ND=3&date=20200521&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2020154939A1&KC=A1&FT=D&ND=3&date=20200521&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2020154939A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2019223656A1",
    "publication": "US2019223656 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "digital",
    "title": "Beverage preparation machine with a controlled pump",
    "abstract": "[0001] A beverage preparation machine (1) comprises a source of liquid (2,3) and a dispensing outlet (4) connected via a pump (10) that includes a chamber (11) and a displaceable wall (12) delimiting the chamber (11). The pump (10) further has: an electric actuator (13) driving the displaceable wall (12) for causing an inflow of liquid from the source into the chamber (11) and for causing an outflow of liquid from the chamber (11) to the dispensing outlet (4); and a powering unit (14) that comprises an electric power source (142) and that is configured for supplying power to the actuator (13). The powering unit (14) further comprises: a sensor (143) for measuring an electrical parameter representative of a consumption of power by the actuator (13); and a control unit (144) that is connected to the sensor (143) and to the electrical power source (142) and that is configured to control the power supplied to the actuator (13) by the electric power source (142) as a function of: the measured parameter; and a desired liquid input into the chamber (11) and/or liquid output from the chamber (11), such as a desired flow and/or pressure of the liquid input and/or of the liquid output.",
    "date": "2019-07-25",
    "priorityDate": "2016-06-30",
    "inventors": "THULIEZ JEAN-LUC [CH]; OBLIGER NICOLAS [FR]; CROZIER ETIENNE [CH]; GUYON BERTRAND [FR]; MAGATTI MARCO [CH]",
    "applicants": "NESTEC SA [CH]; NESTLE SA [CH]",
    "secondaryInventors": "(Crozier, Etienne; Guyon, Bertrand; Magatti, Marco; Obliger, Nicolas; Thuliez, Jean-Luc; Crozier, Etienne; Guyon, Bertrand; Magatti, Marco; Obliger, Nicolas; Thuliez, Jean-Luc)",
    "secondaryApplicants": "(NESTEC S.A.; NESTEC S.A.; Societe des Produits Nestle S.A.)",
    "classification": "Classification: - internationale A47J31/34; A47J31/46; A47J31/52 - coopérative A47J31/34 (RU, US); A47J31/3623 (US); A47J31/3633 (EP, RU); A47J31/46 (EP, RU); A47J31/468 (RU, US); A47J31/525 (EP, RU, US); A47J31/5251 (EP, RU, US); A47J31/5253 (EP, RU, US); A47J31/5255 (EP, RU, US);",
    "applicationNumber": "Numéro de demande US201716312349 20170616 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20160177217 20160630 ; WO2017EP64732 20170616 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2017288698 (A1) AU2017288698 (B2) CA3028533 (A1) CN109310230 (A) CN109310230 (B) plus AU2017288698 (A1) AU2017288698 (B2) CA3028533 (A1) CN109310230 (A) CN109310230 (B) EP3478135 (A1) EP3478135 (B1) ES2797173 (T3) JP2019524183 (A) JP7370136 (B2) PT3478135 (T) RU2019102388 (A) RU2019102388 (A3) RU2760900 (C2) US11178999 (B2) WO2018001750 (A1) moins Google Patents: US20190223656A1",
    "publicationAliases": [
      "AU2017288698A1",
      "AU2017288698B2",
      "CA3028533A1",
      "CN109310230A",
      "CN109310230B",
      "EP3478135A1",
      "EP3478135B1",
      "ES2797173T3",
      "JP7370136B2",
      "JP2019524183A",
      "PT3478135T",
      "RU2760900C2",
      "RU2019102388A",
      "RU2019102388A3",
      "US11178999B2",
      "US2019223656A1",
      "US20190223656A1",
      "WO2018001750A1"
    ],
    "publicationHeader": "Données bibliographiques: US2019223656 (A1) ― 2019-07-25",
    "tags": [
      "NESTEC SA",
      "A47J31/34",
      "2019"
    ],
    "coverImage": "/assets/patents/US2019223656A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2019223656A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2019223656A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019223656A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2019223656A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019223656A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2019223656A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2019223656A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=18&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20190725&CC=US&NR=2019223656A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2019223656A1&KC=A1&FT=D&ND=3&date=20190725&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2019223656A1&KC=A1&FT=D&ND=3&date=20190725&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2019223656A1&KC=A1&FT=D&ND=3&date=20190725&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2019223656A1&KC=A1&FT=D&ND=3&date=20190725&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2019223656A1&KC=A1&FT=D&ND=3&date=20190725&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2019223656A1&KC=A1&FT=D&ND=3&date=20190725&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2019223656A1&KC=A1&FT=D&ND=3&date=20190725&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2019223656A1&KC=A1&FT=D&ND=3&date=20190725&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2019223656A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP3399892A1",
    "publication": "EP3399892 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "BEVERAGE MACHINE WITH A CONFIGURATION FOR SAFE STANDING",
    "abstract": "",
    "date": "2018-11-14",
    "priorityDate": "2016-01-08",
    "inventors": "THULIEZ JEAN-LUC [CH]; KILPATRICK KEVIN [US]; RYUTARO TAKAYAMA STEVEN [US]; OBLIGER NICOLAS [FR]; BRANKO LUKIC [US]; CROZIER ETIENNE [CH]; GUYON BERTRAND [FR]; MAGATTI MARCO [CH]",
    "applicants": "NESTEC SA [CH]; NESTLE SA [CH]",
    "secondaryInventors": "(BRANKO, Lukic; CROZIER, Etienne; GUYON, Bertrand; KILPATRICK, Kevin; MAGATTI, Marco; OBLIGER, Nicolas; RYUTARO TAKAYAMA, Steven; THULIEZ, Jean-Luc; BRANKO, Lukic; CROZIER, Etienne; GUYON, Bertrand; KILPATRICK, Kevin; MAGATTI, Marco; OBLIGER, Nicolas; RYUTARO TAKAYAMA, Steven; THULIEZ, Jean-Luc)",
    "secondaryApplicants": "(Nestec S.A.; Société des Produits Nestlé S.A.)",
    "classification": "Classification: - internationale A47J31/44 - coopérative A47J31/4407 (EP)",
    "applicationNumber": "Numéro de demande EP20170700202 20170106 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2016US12670 20160108 ; WO2017EP50239 20170106 ;",
    "alsoPublishedAs": "Également publié en tant que: EP3399892 (A1) EP3399892 (B1) WO2017118715 (A1) EP3399892 (A1) EP3399892 (B1) WO2017118715 (A1) moins",
    "publicationAliases": [
      "EP3399892A1",
      "EP3399892B1",
      "WO2017118715A1"
    ],
    "publicationHeader": "Données bibliographiques: EP3399892 (A1) ― 2018-11-14",
    "tags": [
      "NESTEC SA",
      "A47J31/44",
      "2018"
    ],
    "coverImage": "/assets/patents/EP3399892A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP3399892A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP3399892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3399892A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP3399892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3399892A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP3399892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3399892A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP3399892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP3399892A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=19&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20181114&CC=EP&NR=3399892A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=3399892A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=3399892A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=3399892A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=3399892A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=3399892A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=3399892A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=3399892A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=3399892A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP3399892A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2019008312A1",
    "publication": "US2019008312 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Beverage machine with an ergonomic water storage",
    "abstract": "A machine (1) for preparing a beverage has: a body (1′) with a fluid line (1″,1′″) extending from a liquid inlet (1″) to a beverage outlet (1′″); a liquid tank (15) that has an outlet (16) connected to the liquid inlet (1″); and a carrier (11,12) assembled to the body (1′) for carrying the liquid tank (15). The carrier (11,12) is movable with the liquid tank (15) as a unit (10) inwards into the body (1′) into an operative position for supplying liquid to the liquid inlet (1″) and outwards from the body (1′) into a service position.",
    "date": "2019-01-10",
    "priorityDate": "2016-01-08",
    "inventors": "THULIEZ JEAN-LUC [CH]; KILPATRICK KEVIN [US]; RYUTARO TAKAYAMA STEVEN [US]; OBLIGER NICOLAS [FR]; BRANKO LUKIC [US]; CROZIER ETIENNE [CH]; GUYON BERTRAND [FR]; MAGATTI MARCO [CH]",
    "applicants": "NESTEC SA [CH]; NESTLE SA [CH]",
    "secondaryInventors": "(Branko, Lukic; Crozier, Etienne; Guyon, Bertrand; Kilpatrick, Kevin; Magatti, Marco; Obliger, Nicolas; Ryutaro Takayama, Steven; Thuliez, Jean-Luc; Branko, Lukic; Crozier, Etienne; Guyon, Bertrand; Kilpatrick, Kevin; Magatti, Marco; Obliger, Nicolas; Ryutaro Takayama, Steven; Thuliez, Jean-Luc)",
    "secondaryApplicants": "(NESTEC S.A.; NESTEC S.A.; Societe des Produits Nestle S.A.)",
    "classification": "Classification: - internationale A47J31/00; A47J31/36; A47J31/44 - coopérative A47J31/005 (US); A47J31/3676 (EP, US); A47J31/4403 (EP, US)",
    "applicationNumber": "Numéro de demande US201716067349 20170106 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2016US12647 20160108 ; WO2017EP50237 20170106 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2017205277 (A1) CA3010682 (A1) CN108471899 (A) CN108471899 (B) EP3399890 (A1) plus AU2017205277 (A1) CA3010682 (A1) CN108471899 (A) CN108471899 (B) EP3399890 (A1) JP2019505286 (A) RU2018128741 (A) US10945552 (B2) WO2017118713 (A1) moins Google Patents: US20190008312A1",
    "publicationAliases": [
      "AU2017205277A1",
      "CA3010682A1",
      "CN108471899A",
      "CN108471899B",
      "EP3399890A1",
      "JP2019505286A",
      "RU2018128741A",
      "US10945552B2",
      "US2019008312A1",
      "US20190008312A1",
      "WO2017118713A1"
    ],
    "publicationHeader": "Données bibliographiques: US2019008312 (A1) ― 2019-01-10",
    "tags": [
      "NESTEC SA",
      "A47J31/00",
      "2019"
    ],
    "coverImage": "/assets/patents/US2019008312A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2019008312A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2019008312A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019008312A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2019008312A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019008312A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2019008312A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019008312A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2019008312A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2019008312A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=20&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20190110&CC=US&NR=2019008312A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2019008312A1&KC=A1&FT=D&ND=3&date=20190110&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2019008312A1&KC=A1&FT=D&ND=3&date=20190110&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2019008312A1&KC=A1&FT=D&ND=3&date=20190110&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2019008312A1&KC=A1&FT=D&ND=3&date=20190110&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2019008312A1&KC=A1&FT=D&ND=3&date=20190110&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2019008312A1&KC=A1&FT=D&ND=3&date=20190110&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2019008312A1&KC=A1&FT=D&ND=3&date=20190110&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2019008312A1&KC=A1&FT=D&ND=3&date=20190110&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2019008312A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP3399891A1",
    "publication": "EP3399891 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "INFILTRATION-SAFE BEVERAGE MACHINE",
    "abstract": "",
    "date": "2018-11-14",
    "priorityDate": "2016-01-08",
    "inventors": "THULIEZ JEAN-LUC [CH]; KILPATRICK KEVIN [US]; RYUTARO TAKAYAMA STEVEN [US]; OBLIGER NICOLAS [FR]; BRANKO LUKIC [US]; CROZIER ETIENNE [CH]; GUYON BERTRAND [FR]; MAGATTI MARCO [CH]",
    "applicants": "NESTEC SA [CH]; NESTLE SA [CH]",
    "secondaryInventors": "(BRANKO, Lukic; CROZIER, Etienne; GUYON, Bertrand; KILPATRICK, Kevin; MAGATTI, Marco; OBLIGER, Nicolas; RYUTARO TAKAYAMA, Steven; THULIEZ, Jean-Luc; BRANKO, Lukic; CROZIER, Etienne; GUYON, Bertrand; KILPATRICK, Kevin; MAGATTI, Marco; OBLIGER, Nicolas; RYUTARO TAKAYAMA, Steven; THULIEZ, Jean-Luc)",
    "secondaryApplicants": "(Nestec S.A.; Société des Produits Nestlé S.A.)",
    "classification": "Classification: - internationale A47J31/44 - coopérative A47J31/4407 (EP)",
    "applicationNumber": "Numéro de demande EP20170700125 20170106 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2016US12630 20160108 ; WO2017EP50238 20170106 ;",
    "alsoPublishedAs": "Également publié en tant que: EP3399891 (A1) EP3399891 (B1) WO2017118714 (A1) EP3399891 (A1) EP3399891 (B1) WO2017118714 (A1) moins",
    "publicationAliases": [
      "EP3399891A1",
      "EP3399891B1",
      "WO2017118714A1"
    ],
    "publicationHeader": "Données bibliographiques: EP3399891 (A1) ― 2018-11-14",
    "tags": [
      "NESTEC SA",
      "A47J31/44",
      "2018"
    ],
    "coverImage": "/assets/patents/EP3399891A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP3399891A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP3399891A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3399891A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP3399891A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3399891A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP3399891A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3399891A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP3399891A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP3399891A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=21&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20181114&CC=EP&NR=3399891A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=3399891A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=3399891A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=3399891A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=3399891A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=3399891A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=3399891A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=3399891A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=3399891A1&KC=A1&FT=D&ND=3&date=20181114&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP3399891A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP3393889A1",
    "publication": "EP3393889 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "VEHICLE ARCHITECTURE",
    "abstract": "",
    "date": "2018-10-31",
    "priorityDate": "2015-12-24",
    "inventors": "THULIEZ JEAN-LUC [CH]; CROZIER ETIENNE [CH]",
    "applicants": "SOFTCAR SA [CH]",
    "secondaryInventors": "(THULIEZ, Jean-Luc; CROZIER, Etienne; THULIEZ, Jean-Luc; CROZIER, Etienne)",
    "secondaryApplicants": "(Softcar SA; Softcar SA)",
    "classification": "Classification: - internationale B62D21/16; B62D29/04; B62D31/00; B62D63/02 - coopérative B62D21/16 (EP); B62D29/043 (EP); B62D31/003 (EP); B62D63/025 (EP)",
    "applicationNumber": "Numéro de demande EP20160834045 20161221 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2015IB59980 20151224 ; WO2016IB57888 20161221 ;",
    "alsoPublishedAs": "Également publié en tant que: EP3393889 (A1) EP3393889 (B1) DK3393889 (T3) ES2932802 (T3) HUE060564 (T2) plus EP3393889 (A1) EP3393889 (B1) DK3393889 (T3) ES2932802 (T3) HUE060564 (T2) MA44155 (A) MA44155 (B1) PL3393889 (T3) PT3393889 (T) WO2017109726 (A1) moins",
    "publicationAliases": [
      "DK3393889T3",
      "EP3393889A1",
      "EP3393889B1",
      "ES2932802T3",
      "HUE060564T2",
      "MA44155A",
      "MA44155B1",
      "PL3393889T3",
      "PT3393889T",
      "WO2017109726A1"
    ],
    "publicationHeader": "Données bibliographiques: EP3393889 (A1) ― 2018-10-31",
    "tags": [
      "SOFTCAR SA",
      "B62D21/16",
      "2018"
    ],
    "coverImage": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/EP3393889A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP3393889A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3393889A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=22&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20181031&CC=EP&NR=3393889A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=3393889A1&KC=A1&FT=D&ND=3&date=20181031&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=3393889A1&KC=A1&FT=D&ND=3&date=20181031&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=3393889A1&KC=A1&FT=D&ND=3&date=20181031&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=3393889A1&KC=A1&FT=D&ND=3&date=20181031&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=3393889A1&KC=A1&FT=D&ND=3&date=20181031&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=3393889A1&KC=A1&FT=D&ND=3&date=20181031&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=3393889A1&KC=A1&FT=D&ND=3&date=20181031&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=3393889A1&KC=A1&FT=D&ND=3&date=20181031&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP3393889A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2019059639A1",
    "publication": "US2019059639 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Beverage machine with ergonomic outlet",
    "abstract": "[0001] A machine (1) for preparing and dispensing a beverage (2) comprises: —a main body (10) containing a unit (11,12,13,14,15) for preparing said beverage (2) to be dispensed via an outlet (21) to an external user-recipient (3) at a user-recipient placement location (30); —a beverage dispensing head (20) that includes the outlet (21) and that is movable relative to the main body (10) inwards into the main body (10) into a retracted head position and outwards from the main body (10) into a deployed head position; and —a control unit (16) for controlling the preparation unit (11,12,13,14,15) to supply said beverage (2) to the outlet (21). The control unit (16) is configured to: —maintain or leave the beverage dispensing head (20) in its retracted position when the beverage preparation unit (11,12,13,14,15) is not operated to process a liquid; and/or —move the beverage dispensing head (20) into its deployed position or maintain or leave it in this position only when the control unit (16) operates the preparation unit (11,12,13,14,15) to process a liquid for dispensing via the outlet (21).",
    "date": "2019-02-28",
    "priorityDate": "2015-09-04",
    "inventors": "THULIEZ JEAN-LUC [CH]; RYUTARO TAKAYAMA STEVEN [US]; OBLIGER NICOLAS [FR]; BRANKO LUKIC [US]; CROZIER ETIENNE [CH]; GUYON BERTRAND [FR]",
    "applicants": "NECTEC S A [CH]; NESTEC SA [CH]; NESTLE SA [CH]",
    "secondaryInventors": "(Branko, Lukic; Crozier, Etienne; Guyon, Bertrand; Obliger, Nicolas; Ryutaro Takayama, Steven; Thuliez, Jean-Luc; Branko, Lukic; Crozier, Etienne; Guyon, Bertrand; Obliger, Nicolas; Ryutaro Takayama, Steven; Thuliez, Jean-Luc)",
    "secondaryApplicants": "(NECTEC S.A.; NESTEC S.A.; Societe des Produits Nestle S.A.)",
    "classification": "Classification: - internationale A47J31/40; A47J31/44; A47J31/46; A47J31/52 - coopérative A47J31/407 (US); A47J31/4403 (EP, RU, US); A47J31/4407 (EP, US); A47J31/46 (EP, RU, US); A47J31/52 (US); A47J31/525 (EP); A47J31/5255 (EP);",
    "applicationNumber": "Numéro de demande US201615757031 20160902 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2015US48691 20150904 ; WO2016EP70680 20160902 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2016316786 (A1) AU2016316786 (B2) BR112018002158 (A2) CA2995147 (A1) CA2995147 (C) plus AU2016316786 (A1) AU2016316786 (B2) BR112018002158 (A2) CA2995147 (A1) CA2995147 (C) CN107920684 (A) CN107920684 (B) EP3344099 (A1) EP3344099 (B1) ES2762975 (T3) JP2018526084 (A) JP6998299 (B2) PT3344099 (T) RU2018111720 (A) RU2018111720 (A3) RU2721090 (C2) US10849456 (B2) WO2017037212 (A1) moins Google Patents: US20190059639A1",
    "publicationAliases": [
      "AU2016316786A1",
      "AU2016316786B2",
      "BR112018002158A2",
      "CA2995147A1",
      "CA2995147C",
      "CN107920684A",
      "CN107920684B",
      "EP3344099A1",
      "EP3344099B1",
      "ES2762975T3",
      "JP6998299B2",
      "JP2018526084A",
      "PT3344099T",
      "RU2721090C2",
      "RU2018111720A",
      "RU2018111720A3",
      "US10849456B2",
      "US2019059639A1",
      "US20190059639A1",
      "WO2017037212A1"
    ],
    "publicationHeader": "Données bibliographiques: US2019059639 (A1) ― 2019-02-28",
    "tags": [
      "NECTEC S A",
      "A47J31/40",
      "2019"
    ],
    "coverImage": "/assets/patents/US2019059639A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2019059639A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2019059639A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019059639A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2019059639A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019059639A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2019059639A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2019059639A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=23&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20190228&CC=US&NR=2019059639A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2019059639A1&KC=A1&FT=D&ND=3&date=20190228&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2019059639A1&KC=A1&FT=D&ND=3&date=20190228&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2019059639A1&KC=A1&FT=D&ND=3&date=20190228&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2019059639A1&KC=A1&FT=D&ND=3&date=20190228&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2019059639A1&KC=A1&FT=D&ND=3&date=20190228&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2019059639A1&KC=A1&FT=D&ND=3&date=20190228&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2019059639A1&KC=A1&FT=D&ND=3&date=20190228&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2019059639A1&KC=A1&FT=D&ND=3&date=20190228&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2019059639A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2019313839A1",
    "publication": "US2019313839 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "digital",
    "title": "Beverage machine with an ergonomic user-interface",
    "abstract": "A machine (1) for preparing and dispensing a beverage (2) comprises: —a main body (10) containing a unit (11, 12, 13, 14, 15) for preparing said beverage (2) to be dispensed via an outlet (21) to an external user-recipient (3) at a user-recipient placement location (30);—an auxiliary body (20) that is movable relative to the main body (10) inwards into the main body (10) into a retracted position and outwards from the main body (10) into a deployed position;—a control unit (16) for controlling the preparation unit (11, 12, 13, 14, 15) to supply said beverage (2) to the outlet (21); and—a user-interlace (17, 17′) connected to the control unit (16). The user-interface (17, 17′) is located on the auxiliary body (20) and is movable therewith.",
    "date": "2019-10-17",
    "priorityDate": "2015-09-04",
    "inventors": "THULIEZ JEAN-LUC [CH]; RYUTARO TAKAYAMA STEVEN [US]; OBLIGER NICOLAS [FR]; BRANKO LUKIC [US]; CROZIER ETIENNE [CH]; GUYON BERTRAND [FR]; GUYON BETRAND [FR]",
    "applicants": "NESTEC SA [CH]; NESTLE SA [CH]",
    "secondaryInventors": "(Branko, Lukic; Crozier, Etienne; Guyon, Betrand; Obliger, Nicolas; Ryutaro Takayama, Steven; Thuliez, Jean-Luc; Branko, Lukic; Crozier, Etienne; Guyon, Bertrand; Obliger, Nicolas; Ryutaro Takayama, Steven; Thuliez, Jean-Luc)",
    "secondaryApplicants": "(NESTEC S.A; NESTEC S.A.; Societe des Produits Nestle S.A.)",
    "classification": "Classification: - internationale A47J31/36; A47J31/44; A47J31/46; A47J31/52 - coopérative A47J31/3633 (US); A47J31/4403 (EP, RU, US); A47J31/4407 (EP); A47J31/46 (RU, US); A47J31/52 (US); A47J31/5255 (EP); Y02W90/10 (EP)",
    "applicationNumber": "Numéro de demande US201615757029 20160902 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2015US48693 20150904 ; WO2016EP70685 20160902 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2016316787 (A1) AU2016316787 (B2) CA2995152 (A1) CN108024656 (A) CN108024656 (B) plus AU2016316787 (A1) AU2016316787 (B2) CA2995152 (A1) CN108024656 (A) CN108024656 (B) EP3344098 (A1) EP3344098 (B1) ES2737825 (T3) JP2018526085 (A) JP6910344 (B2) PT3344098 (T) RU2018111742 (A) RU2018111742 (A3) RU2720564 (C2) US11116355 (B2) WO2017037215 (A1) moins Google Patents: CA2995152C; US20190313839A1",
    "publicationAliases": [
      "AU2016316787A1",
      "AU2016316787B2",
      "CA2995152A1",
      "CA2995152C",
      "CN108024656A",
      "CN108024656B",
      "EP3344098A1",
      "EP3344098B1",
      "ES2737825T3",
      "JP6910344B2",
      "JP2018526085A",
      "PT3344098T",
      "RU2720564C2",
      "RU2018111742A",
      "RU2018111742A3",
      "US11116355B2",
      "US2019313839A1",
      "US20190313839A1",
      "WO2017037215A1"
    ],
    "publicationHeader": "Données bibliographiques: US2019313839 (A1) ― 2019-10-17",
    "tags": [
      "NESTEC SA",
      "A47J31/36",
      "2019"
    ],
    "coverImage": "/assets/patents/US2019313839A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2019313839A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2019313839A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019313839A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2019313839A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2019313839A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2019313839A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2019313839A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=24&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20191017&CC=US&NR=2019313839A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2019313839A1&KC=A1&FT=D&ND=3&date=20191017&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2019313839A1&KC=A1&FT=D&ND=3&date=20191017&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2019313839A1&KC=A1&FT=D&ND=3&date=20191017&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2019313839A1&KC=A1&FT=D&ND=3&date=20191017&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2019313839A1&KC=A1&FT=D&ND=3&date=20191017&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2019313839A1&KC=A1&FT=D&ND=3&date=20191017&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2019313839A1&KC=A1&FT=D&ND=3&date=20191017&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2019313839A1&KC=A1&FT=D&ND=3&date=20191017&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2019313839A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP3261867A2",
    "publication": "EP3261867 (A2)",
    "corpus": "jean-luc-thuliez",
    "filter": "mobility",
    "title": "ELECTRIC SINGLE-SEATER VEHICLE",
    "abstract": "",
    "date": "2018-01-03",
    "priorityDate": "2015-02-28",
    "inventors": "THULIEZ JEAN-LUC [CH]; HEISEL GUILLAUME [CH]; ROMAND DAMIEN [CH]; OBLIGER NICOLAS [FR]; CROZIER ETIENNE [CH]",
    "applicants": "AVENTOR SA [CH]",
    "secondaryInventors": "(THULIEZ, Jean-Luc; CROZIER, Etienne; OBLIGER, Nicolas; HEISEL, Guillaume; ROMAND, Damien; THULIEZ, Jean-Luc; CROZIER, Etienne; OBLIGER, Nicolas; HEISEL, Guillaume; ROMAND, Damien)",
    "secondaryApplicants": "(Aventor SA; Aventor SA)",
    "classification": "Classification: - internationale B60K1/04; B62D23/00; B62D29/04; B62D61/06 - coopérative B60K1/04 (EP, US); B60K2001/0438 (EP); B60K2001/0494 (EP); B62D23/005 (EP); B62D24/00 (EP); B62D29/005 (EP); B62D61/065 (EP)",
    "applicationNumber": "Numéro de demande EP20160715092 20160226 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2015IB51486 20150228 ; WO2016IB51070 20160226 ;",
    "alsoPublishedAs": "Également publié en tant que: EP3261867 (A2) EP3261867 (B1) WO2016135691 (A2) WO2016135691 (A3) EP3261867 (A2) EP3261867 (B1) WO2016135691 (A2) WO2016135691 (A3) moins",
    "publicationAliases": [
      "EP3261867A2",
      "EP3261867B1",
      "WO2016135691A2",
      "WO2016135691A3"
    ],
    "publicationHeader": "Données bibliographiques: EP3261867 (A2) ― 2018-01-03",
    "tags": [
      "AVENTOR SA",
      "B60K1/04",
      "2018"
    ],
    "coverImage": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/EP3261867A2/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP3261867A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3261867A2/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=25&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20180103&CC=EP&NR=3261867A2&KC=A2",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=3261867A2&KC=A2&FT=D&ND=3&date=20180103&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=3261867A2&KC=A2&FT=D&ND=3&date=20180103&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=3261867A2&KC=A2&FT=D&ND=3&date=20180103&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=3261867A2&KC=A2&FT=D&ND=3&date=20180103&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=3261867A2&KC=A2&FT=D&ND=3&date=20180103&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=3261867A2&KC=A2&FT=D&ND=3&date=20180103&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=3261867A2&KC=A2&FT=D&ND=3&date=20180103&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=3261867A2&KC=A2&FT=D&ND=3&date=20180103&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP3261867A2/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP3215454A1",
    "publication": "EP3215454 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "BEAKER THAT CAN BE FILLED FROM THE BOTTOM AND CONNECTING DEVICE FOR THE BEAKER",
    "abstract": "",
    "date": "2017-09-13",
    "priorityDate": "2014-11-07",
    "inventors": "THULIEZ JEAN-LUC [CH]; EL ALEJ ALI [CH]; CROZIER ETIENNE [CH]",
    "applicants": "IP EVOLUTION SA [CH]",
    "secondaryInventors": "(EL ALEJ, Ali; CROZIER, Etienne; THULIEZ, Jean-luc; EL ALEJ, Ali; CROZIER, Etienne; THULIEZ, Jean-luc; EL ALEJ, Ali; CROZIER, Etienne; THULIEZ, Jean-luc)",
    "secondaryApplicants": "(IP Evolution SA; IP Evolution SA; IP Evolution SA)",
    "classification": "Classification: - internationale A47G19/22; B67D1/04; B67D1/06 - coopérative A47G19/2205 (EP); B67D1/04 (EP); B67D1/06 (EP); B67D1/1272 (EP); B67D2210/00065 (EP)",
    "applicationNumber": "Numéro de demande EP20150798236 20151106 Effet unitaire Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: CH20140001726 20141107 ; WO2015IB58589 20151106 ;",
    "alsoPublishedAs": "Également publié en tant que: EP3215454 (A1) EP3215454 (B1) EP3215454 (C0) CH710343 (A1) WO2016071880 (A1) EP3215454 (A1) EP3215454 (B1) EP3215454 (C0) CH710343 (A1) WO2016071880 (A1) moins",
    "publicationAliases": [
      "CH710343A1",
      "EP3215454A1",
      "EP3215454B1",
      "EP3215454C0",
      "WO2016071880A1"
    ],
    "publicationHeader": "Données bibliographiques: EP3215454 (A1) ― 2017-09-13",
    "tags": [
      "IP EVOLUTION SA",
      "A47G19/22",
      "2017"
    ],
    "coverImage": "/assets/patents/EP3215454A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP3215454A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP3215454A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3215454A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP3215454A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3215454A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP3215454A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3215454A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP3215454A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3215454A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP3215454A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3215454A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP3215454A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP3215454A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=26&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20170913&CC=EP&NR=3215454A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=3215454A1&KC=A1&FT=D&ND=3&date=20170913&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=3215454A1&KC=A1&FT=D&ND=3&date=20170913&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=3215454A1&KC=A1&FT=D&ND=3&date=20170913&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=3215454A1&KC=A1&FT=D&ND=3&date=20170913&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=3215454A1&KC=A1&FT=D&ND=3&date=20170913&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=3215454A1&KC=A1&FT=D&ND=3&date=20170913&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=3215454A1&KC=A1&FT=D&ND=3&date=20170913&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=3215454A1&KC=A1&FT=D&ND=3&date=20170913&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP3215454A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP3185821A1",
    "publication": "EP3185821 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "medical",
    "title": "IMPACTOR BODY FOR ORTHOPAEDIC SURGERY OPERATION",
    "abstract": "",
    "date": "2017-07-05",
    "priorityDate": "2014-08-26",
    "inventors": "THULIEZ JEAN-LUC [CH]; CROZIER ETIENNE [CH]; ROSSE YANN [CH]; OBLIGER NICOLAS [CH]",
    "applicants": "MPS PRECIMED SA [CH]",
    "secondaryInventors": "(THULIEZ, Jean-Luc; OBLIGER, Nicolas; CROZIER, Etienne; ROSSE, Yann; THULIEZ, Jean-Luc; OBLIGER, Nicolas; CROZIER, Etienne; ROSSE, Yann)",
    "secondaryApplicants": "(MPS Precimed SA; MPS Precimed SA)",
    "classification": "Classification: - internationale A61F2/46 - coopérative A61F2/4609 (EP); A61F2002/30471 (EP); A61F2002/30522 (EP); A61F2002/4627 (EP); A61F2002/4629 (EP); A61F2002/4681 (EP)",
    "applicationNumber": "Numéro de demande EP20150775494 20150824 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2014IB64062 20140826 ; WO2015IB56408 20150824 ;",
    "alsoPublishedAs": "Également publié en tant que: EP3185821 (A1) EP3185821 (B1) WO2016030809 (A1) EP3185821 (A1) EP3185821 (B1) WO2016030809 (A1) moins",
    "publicationAliases": [
      "EP3185821A1",
      "EP3185821B1",
      "WO2016030809A1"
    ],
    "publicationHeader": "Données bibliographiques: EP3185821 (A1) ― 2017-07-05",
    "tags": [
      "MPS PRECIMED SA",
      "A61F2/46",
      "2017"
    ],
    "coverImage": "/assets/patents/EP3185821A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP3185821A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP3185821A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3185821A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP3185821A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3185821A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP3185821A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3185821A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP3185821A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3185821A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP3185821A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3185821A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP3185821A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3185821A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP3185821A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP3185821A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP3185821A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=27&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20170705&CC=EP&NR=3185821A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=3185821A1&KC=A1&FT=D&ND=3&date=20170705&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=3185821A1&KC=A1&FT=D&ND=3&date=20170705&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=3185821A1&KC=A1&FT=D&ND=3&date=20170705&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=3185821A1&KC=A1&FT=D&ND=3&date=20170705&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=3185821A1&KC=A1&FT=D&ND=3&date=20170705&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=3185821A1&KC=A1&FT=D&ND=3&date=20170705&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=3185821A1&KC=A1&FT=D&ND=3&date=20170705&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=3185821A1&KC=A1&FT=D&ND=3&date=20170705&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP3185821A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "WO2016004540A1",
    "publication": "WO2016004540 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "materials",
    "title": "OPTICAL METHOD FOR MAKING AT LEAST ONE COMPONENT OF A WATCH MOVEMENT INVISIBLE",
    "abstract": "The invention relates to a method for making at least one component of a watch movement (11) invisible, which watch movement is accommodated inside a housing (12) of a watch (10) which is closed at least on the front surface thereof by means of a watch glass (25) made of sapphire, diamond or the like. Said component is advantageously the upper bridge (17) of this mechanical movement (11). Advantageously, the spectral transmission curve of said watch glass (25) is measured and said component is processed at least once such that the spectral transmission curve thereof at least approximately matches that of the watch glass (25). This processing comprises placing for example three stacked layers of antireflective materials (25a, 25b, 25c) on both the glass (25) of a watch (10) and the component to be made invisible.",
    "date": "2016-01-14",
    "priorityDate": "2014-07-09",
    "inventors": "THULIEZ JEAN-LUC [CH]; PERRIN JEAN-LUC [CH]; CROZIER ETIENNE [CH]; PINTUS MICKE [FR]; PINTUS YANNICK [CH]",
    "applicants": "RICHEMONT INT SA [CH]",
    "secondaryInventors": "(PINTUS, YANNICK; PINTUS, MICKE; PERRIN, JEAN-LUC; CROZIER, ETIENNE; THULIEZ, JEAN-LUC)",
    "secondaryApplicants": "(RICHEMONT INTERNATIONAL SA)",
    "classification": "Classification: - internationale G04B29/02; G04B45/02; G04B45/04 - coopérative G04B17/285 (EP); G04B29/022 (EP); G04B45/02 (EP); G04B45/04 (EP)",
    "applicationNumber": "Numéro de demande WO2014CH00098 20140709 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: WO2014CH00098 20140709 ;",
    "alsoPublishedAs": "Également publié en tant que: WO2016004540 (A1) WO2016004540 (A1) moins",
    "publicationAliases": [
      "WO2016004540A1"
    ],
    "publicationHeader": "Données bibliographiques: WO2016004540 (A1) ― 2016-01-14",
    "tags": [
      "RICHEMONT INT SA",
      "G04B29/02",
      "2016"
    ],
    "coverImage": "/assets/patents/WO2016004540A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/WO2016004540A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/WO2016004540A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2016004540A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/WO2016004540A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2016004540A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/WO2016004540A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2016004540A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/WO2016004540A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/WO2016004540A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=28&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20160114&CC=WO&NR=2016004540A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=WO&NR=2016004540A1&KC=A1&FT=D&ND=3&date=20160114&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=WO&NR=2016004540A1&KC=A1&FT=D&ND=3&date=20160114&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=WO&NR=2016004540A1&KC=A1&FT=D&ND=3&date=20160114&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=WO&NR=2016004540A1&KC=A1&FT=D&ND=3&date=20160114&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=WO&NR=2016004540A1&KC=A1&FT=D&ND=3&date=20160114&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=WO&NR=2016004540A1&KC=A1&FT=D&ND=3&date=20160114&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=WO&NR=2016004540A1&KC=A1&FT=D&ND=3&date=20160114&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=WO&NR=2016004540A1&KC=A1&FT=D&ND=3&date=20160114&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/WO2016004540A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2015360014A1",
    "publication": "US2015360014 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "medical",
    "title": "Applicator and capsule for such applicator",
    "abstract": "[0001] A device for distributing, on a surface of a living body, a product containing an active component or forming a cosmetic product, the device comprising a housing and a cartridge, releasably coupled to the housing, wherein:the cartridge comprises an applicator element and a reservoir containing said product and having a movable or deformable wall part for reducing the volume of the reservoir, wherein at least one opening is provided between the reservoir and the applicator element for applying the product to the applicator element by reducing the volume of the reservoir; andthe housing comprises at least one light source for radiating light through and/or alongside the cartridge and a drive for driving the movable and/or deformable wall part of the reservoir for reducing the volume of the reservoir.",
    "date": "2015-12-17",
    "priorityDate": "2014-06-16",
    "inventors": "HEISEL GUILLAUME [CH]; DECAUX STÉPHANE [FR]; DECAUX GÉRALDINE [FR]; CROZIER ETIENNE [CH]; THULIEZ JEAN LUC [CH]",
    "applicants": "INDERM [FR]; ID LAB [FR]",
    "secondaryInventors": "(DECAUX STÉPHANE; DECAUX GÉRALDINE; THULIEZ JEAN LUC; CROZIER ETIENNE; HEISEL GUILLAUME; Decaux, Stéphane; Decaux, Géraldine; Thuliez, Jean Luc; Crozier, Etienne; Heisel, Guillaume)",
    "secondaryApplicants": "(ID LAB; InDerm; ID Lab)",
    "classification": "Classification: - internationale A45D34/00; A45D34/04; A45D40/26; A61H15/00; A61H15/02; A61H23/02; A61K9/00; A61M35/00; A61N5/06 - coopérative A45D2034/005 (EP, CN, US); A45D2200/205 (EP, CN, US); A45D34/00 (EP, US); A45D34/04 (EP, CN, US); A45D34/041 (EP, CN, US); A45D40/261 (US); A61H15/0085 (EP, CN, US); A61H15/02 (EP, CN, US); A61H2015/0042 (EP, CN, US); A61H2201/10 (EP, CN, US); A61H2201/105 (EP, CN, US); A61H2201/1215 (EP, CN, US); A61H2201/1246 (EP, CN, US); A61H23/0245 (EP, CN, US); A61H23/0254 (EP, CN, US); A61K9/00 (EP, US); A61M2037/0007 (EP, CN, US); A61M35/003 (EP, CN, US); A61N2005/0631 (EP, CN, US); A61N2005/0644 (EP, CN, US); A61N5/06 (EP, US); A61N5/0616 (EP, CN, US);",
    "applicationNumber": "Numéro de demande US201414310083 20140620 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: US201414310083 20140620 ; US201462012568P 20140616 ;",
    "alsoPublishedAs": "Également publié en tant que: CN106659282 (A) CN106659282 (B) EP3154623 (A1) EP3154623 (B1) EP3154623 (B8) plus CN106659282 (A) CN106659282 (B) EP3154623 (A1) EP3154623 (B1) EP3154623 (B8) ES2895898 (T3) JP2017522935 (A) JP6596028 (B2) US10667985 (B2) US2017128319 (A1) WO2015193303 (A1) moins Google Patents: US20150360014A1",
    "publicationAliases": [
      "CN106659282A",
      "CN106659282B",
      "EP3154623A1",
      "EP3154623B1",
      "EP3154623B8",
      "ES2895898T3",
      "JP6596028B2",
      "JP2017522935A",
      "US10667985B2",
      "US2015360014A1",
      "US2017128319A1",
      "US20150360014A1",
      "US20170128319A1",
      "WO2015193303A1"
    ],
    "publicationHeader": "Données bibliographiques: US2015360014 (A1) ― 2015-12-17",
    "tags": [
      "INDERM",
      "A45D34/00",
      "2015"
    ],
    "coverImage": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_003_drawing_04.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_003_drawing_05.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_003_drawing_06.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_004_drawing_01.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_004_drawing_02.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_004_drawing_03.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_004_drawing_04.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_004_drawing_05.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_004_drawing_06.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_005_drawing_01.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_005_drawing_02.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_005_drawing_03.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_005_drawing_04.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_005_drawing_05.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_005_drawing_06.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_006_drawing_01.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_006_drawing_02.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_006_drawing_03.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_006_drawing_04.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_006_drawing_05.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/images/rendered_mosaic_page_006_drawing_06.png",
        "pdfHref": "/assets/patents/US2015360014A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006 drawing 06",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2015360014A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/pdfs/mosaic_page_005.pdf",
        "label": "mosaic page 005",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015360014A1/pdfs/mosaic_page_006.pdf",
        "label": "mosaic page 006",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=29&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20151217&CC=US&NR=2015360014A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2015360014A1&KC=A1&FT=D&ND=3&date=20151217&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2015360014A1&KC=A1&FT=D&ND=3&date=20151217&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2015360014A1&KC=A1&FT=D&ND=3&date=20151217&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2015360014A1&KC=A1&FT=D&ND=3&date=20151217&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2015360014A1&KC=A1&FT=D&ND=3&date=20151217&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2015360014A1&KC=A1&FT=D&ND=3&date=20151217&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2015360014A1&KC=A1&FT=D&ND=3&date=20151217&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2015360014A1&KC=A1&FT=D&ND=3&date=20151217&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2015360014A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2015342657A1",
    "publication": "US2015342657 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "medical",
    "title": "BONE FIXATION ASSEMBLY",
    "abstract": "A bone fixation system includes at least one bone fixation member and a bone fixation instrument. The bone fixation member includes a strap and a locking mechanism. The strap can be pulled through the locking mechanism so as to form a loop about a target bone so as to secure first and second bone segments in an approximated, compressed configuration. The bone fixation instrument is configured to apply tension to the loop about the target bone. The fixation instrument includes a tension assembly that is configured to secure a free end of the bone fixation member to the fixation instrument. The tension assembly is further configured to pull the free end so as to increase tension in the loop while the tension in the loop is less than a select tension. The tension assembly is unable to further increase tension in the bone fixation member once the tension in the bone fixation member has reached the select tension. The fixation instrument further includes a cutter assembly that is configured to cut the free end of the bone fixation member so as to separate the free end from the loop.",
    "date": "2015-12-03",
    "priorityDate": "2014-05-30",
    "inventors": "THULIEZ JEAN-LUC [CH]; VOISARD CYRIL [CH]; OBLIGER NICOLAS [FR]; MOOTIEN AZAGEN [FR]; CROZIER ETIENNE [CH]",
    "applicants": "DEPUY SYNTHES PRODUCTS INC [US]",
    "secondaryInventors": "(VOISARD CYRIL; MOOTIEN AZAGEN; CROZIER ETIENNE; THULIEZ JEAN-LUC; OBLIGER NICOLAS; Voisard Cyril; Mootien Azagen; Crozier Etienne; Thuliez Jean-Luc; Obliger Nicolas)",
    "secondaryApplicants": "(DEPUY SYNTHES PRODUCTS, INC.; DePuy Synthes Products, Inc.)",
    "classification": "Classification: - internationale A61B17/58; A61B17/60; A61B17/82; A61B17/84; A61B17/88; A61F2/00 - coopérative A61B17/823 (EP, CN, US); A61B17/842 (EP, CN, US); A61B17/8861 (EP, CN, US); A61B17/8863 (EP, CN, US); A61B17/8869 (EP, CN, US); A61B17/8872 (EP, CN, US)",
    "applicationNumber": "Numéro de demande US201514704658 20150505 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: US201462005552P 20140530 ; US201514704658 20150505 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2015267531 (A1) AU2015267531 (B2) CA2950706 (A1) CN106470628 (A) CN106470628 (B) plus AU2015267531 (A1) AU2015267531 (B2) CA2950706 (A1) CN106470628 (A) CN106470628 (B) EP3148462 (A1) EP3148462 (B1) JP2017520359 (A) JP6571174 (B2) US9603646 (B2) WO2015183485 (A1) moins Google Patents: US20150342657A1",
    "publicationAliases": [
      "AU2015267531A1",
      "AU2015267531B2",
      "CA2950706A1",
      "CN106470628A",
      "CN106470628B",
      "EP3148462A1",
      "EP3148462B1",
      "JP6571174B2",
      "JP2017520359A",
      "US9603646B2",
      "US2015342657A1",
      "US20150342657A1",
      "WO2015183485A1"
    ],
    "publicationHeader": "Données bibliographiques: US2015342657 (A1) ― 2015-12-03",
    "tags": [
      "DEPUY SYNTHES PRODUCTS INC",
      "A61B17/58",
      "2015"
    ],
    "coverImage": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_003_drawing_04.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_003_drawing_05.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_003_drawing_06.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_004_drawing_01.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_004_drawing_02.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/images/rendered_mosaic_page_004_drawing_03.png",
        "pdfHref": "/assets/patents/US2015342657A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2015342657A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2015342657A1/pdfs/mosaic_page_004.pdf",
        "label": "mosaic page 004",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=30&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20151203&CC=US&NR=2015342657A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2015342657A1&KC=A1&FT=D&ND=3&date=20151203&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2015342657A1&KC=A1&FT=D&ND=3&date=20151203&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2015342657A1&KC=A1&FT=D&ND=3&date=20151203&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2015342657A1&KC=A1&FT=D&ND=3&date=20151203&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2015342657A1&KC=A1&FT=D&ND=3&date=20151203&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2015342657A1&KC=A1&FT=D&ND=3&date=20151203&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2015342657A1&KC=A1&FT=D&ND=3&date=20151203&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2015342657A1&KC=A1&FT=D&ND=3&date=20151203&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2015342657A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "AU2014274521A1",
    "publication": "AU2014274521 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Device and method for producing a frothed liquid from soluble ingredients and diluent",
    "abstract": "Abstract Device for producing a frothed liquid comprising a chamber 13 opened to atmosphere with a transverse bottom wall 14 and a longitudinal upward wall 15, at least one diluent inlet 18, at least one liquid delivery outlet 20, wherein the diluent inlet is provided through the upward wall and is dimensioned and oriented for directing a thin jet of diluent in the chamber, and wherein the at least one liquid delivery outlet is configured in the bottom wall for liquid to rise up along the side of the upward wall by the jet of diluent entering the chamber as a result of the direction and dimension of the diluent inlet in the chamber. Figure 2 B 22m B A-+ f",
    "date": "2015-01-22",
    "priorityDate": "2006-12-11",
    "inventors": "GUGERLI RAPHAEL; HARRISON DAVID J; BERNHARDSGRUETTER RAPHAEL; THULIEZ JEAN-LUC; KISSLING IWAN; DOGAN NIHAN; BEAUSIRE CEDRIC; HAMEL DAVID",
    "applicants": "NESTEC SA [CH]; NESTEC SA",
    "secondaryInventors": "(GUGERLI, RAPHAEL; THULIEZ, JEAN-LUC; KISSLING, IWAN; BERNHARDSGRUETTER, RAPHAEL; BEAUSIRE, CEDRIC; DOGAN, NIHAN; HARRISON, DAVID J.; HAMEL, DAVID; Gugerli, Raphael; Thuliez, Jean-Luc; Kissling, Iwan; Bernhardsgruetter, Raphael; Beausire, Cedric; Dogan, Nihan; Harrison, David J.; Hamel, David)",
    "secondaryApplicants": "(NESTEC S.A.; NESTEC S.A.)",
    "classification": "Classification: - internationale A47J31/40 - coopérative",
    "applicationNumber": "Numéro de demande AU20140274521 20141209",
    "priorityNumbers": "Numéro(s) de priorité: AU20070332588 20071206 ; AU20140274521 20141209 ; EP20060125772 20061211 ; WO2007EP63391 20071206 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2014274521 (B2) AU2014274521 (B2) moins",
    "publicationAliases": [
      "AU2014274521A1",
      "AU2014274521B2"
    ],
    "publicationHeader": "Données bibliographiques: AU2014274521 (A1) ― 2015-01-22",
    "tags": [
      "NESTEC SA",
      "A47J31/40",
      "2015"
    ],
    "coverImage": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/AU2014274521A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=31&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20150122&CC=AU&NR=2014274521A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=AU&NR=2014274521A1&KC=A1&FT=D&ND=3&date=20150122&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=AU&NR=2014274521A1&KC=A1&FT=D&ND=3&date=20150122&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=AU&NR=2014274521A1&KC=A1&FT=D&ND=3&date=20150122&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=AU&NR=2014274521A1&KC=A1&FT=D&ND=3&date=20150122&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=AU&NR=2014274521A1&KC=A1&FT=D&ND=3&date=20150122&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=AU&NR=2014274521A1&KC=A1&FT=D&ND=3&date=20150122&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=AU&NR=2014274521A1&KC=A1&FT=D&ND=3&date=20150122&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=AU&NR=2014274521A1&KC=A1&FT=D&ND=3&date=20150122&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/AU2014274521A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2016000570A1",
    "publication": "US2016000570 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "medical",
    "title": "Polymer based joint implants and method of manufacture",
    "abstract": "A method and implant based on injection molding techniques. The method produces polymeric components suitable for implantation with a structure and mechanical properties close to those of natural bone tissue. In a variant, method for making an implant or component thereof includes forming a standard shape foamed blank, and over-molding a thin layer of non-foamed PEEK material onto the standard shaped foamed blank to obtain a final implant component geometry, whereby the blank is completely encapsulated by the over-molded layer.",
    "date": "2016-01-07",
    "priorityDate": "2013-03-15",
    "inventors": "THULIEZ JEAN-LUC [CH]; AYLIFFE JOHN NICHOLAS [CH]",
    "applicants": "SWISS IDEA BOX SARL [CH]",
    "secondaryInventors": "(THULIEZ JEAN-LUC; AYLIFFE JOHN NICHOLAS; THULIEZ Jean-Luc; AYLIFFE John Nicholas; Thuliez, Jean-Luc; Ayliffe, John Nicholas)",
    "secondaryApplicants": "(SWISS IDEA BOX SARL; SWISS IDEA BOX SARL; SWISS IDEA BOX SARL)",
    "classification": "Classification: - internationale A61F2/30; A61F2/38; A61L27/18; A61L27/30; A61L27/44; A61L27/50; A61L27/54; A61L27/56 - coopérative A61F2/30 (US); A61F2/3094 (EP, US); A61F2/30965 (US); A61F2/38 (EP, US); A61F2/3859 (US); A61F2/389 (US); A61F2002/30011 (EP, US); A61F2002/30016 (US); A61F2002/30624 (US); A61F2002/30971 (US); A61F2002/3863 (US); A61F2310/0058 (EP, US); A61L2300/104 (EP, US); A61L2430/24 (EP, US); A61L27/18 (EP, US); A61L27/303 (EP, US); A61L27/443 (EP, US); A61L27/50 (EP, US); A61L27/54 (EP, US); A61L27/56 (US);",
    "applicationNumber": "Numéro de demande US201414776839 20140314 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: US201361787270P 20130315 ; US201414776839 20140314 ; WO2014IB00359 20140314 ;",
    "alsoPublishedAs": "Également publié en tant que: US10058429 (B2) US2016317310 (A9) WO2014140773 (A2) WO2014140773 (A3) WO2014140773 (A4) US10058429 (B2) US2016317310 (A9) WO2014140773 (A2) WO2014140773 (A3) WO2014140773 (A4) moins Google Patents: US20160317310A9; US20160000570A1",
    "publicationAliases": [
      "US10058429B2",
      "US2016000570A1",
      "US2016317310A9",
      "US20160000570A1",
      "US20160317310A9",
      "WO2014140773A2",
      "WO2014140773A3",
      "WO2014140773A4"
    ],
    "publicationHeader": "Données bibliographiques: US2016000570 (A1) ― 2016-01-07",
    "tags": [
      "SWISS IDEA BOX SARL",
      "A61F2/30",
      "2016"
    ],
    "coverImage": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/US2016000570A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2016000570A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2016000570A1/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=32&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20160107&CC=US&NR=2016000570A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2016000570A1&KC=A1&FT=D&ND=3&date=20160107&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2016000570A1&KC=A1&FT=D&ND=3&date=20160107&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2016000570A1&KC=A1&FT=D&ND=3&date=20160107&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2016000570A1&KC=A1&FT=D&ND=3&date=20160107&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2016000570A1&KC=A1&FT=D&ND=3&date=20160107&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2016000570A1&KC=A1&FT=D&ND=3&date=20160107&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2016000570A1&KC=A1&FT=D&ND=3&date=20160107&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2016000570A1&KC=A1&FT=D&ND=3&date=20160107&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2016000570A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "CH707437A1",
    "publication": "CH707437 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "materials",
    "title": "Method for allowing e.g. lower bridge of movement of e.g. wrist watch to be invisible in spectrum of visible wavelengths, involves performing treatment e.g. antireflective treatment, of watch glass to reduce light reflected by component",
    "abstract": "The method involves performing treatment e.g. antireflective treatment, of watch glass (25) to reduce light reflected by a component of mechanical movement (11) of watch (10) and passage of the light through the watch glass, where the component is made of transparent material. The antireflective treatment is performed such that a spectral transmission curve of the component is granted to that of the watch glass for reducing a reflecting surface of the component of the watch.",
    "date": "2014-07-15",
    "priorityDate": "2013-01-10",
    "inventors": "THULIEZ JEAN-LUC [CH]; JEAN-LUC PERRIN [CH]; ETIENNE CROZIER [CH]; PERRIN JEAN-LUC [CH]; JEAN-LUC THULIEZ [CH]; CROZIER ETIENNE [CH]; MICKE PINTUS [FR]; YANNICK PINTUS [CH]; PINTUS MICKE [FR]; PINTUS YANNICK [CH]",
    "applicants": "RICHEMONT INT SA [CH]",
    "secondaryInventors": "(YANNICK PINTUS; MICKE PINTUS; JEAN-LUC PERRIN; ETIENNE CROZIER; JEAN-LUC THULIEZ; Yannick Pintus; Micke Pintus; Jean-Luc Perrin; Etienne Crozier; Jean-Luc Thuliez)",
    "secondaryApplicants": "(RICHEMONT INTERNATIONAL SA; RICHEMONT INTERNATIONAL SA)",
    "classification": "Classification: - internationale G04B29/02; G04B45/02; G04B45/04 - coopérative G04B29/022 (EP, CH); G04B45/02 (EP, CH); G04B45/04 (CH)",
    "applicationNumber": "Numéro de demande CH20130000106 20130110",
    "priorityNumbers": "Numéro(s) de priorité: CH20130000106 20130110 ;",
    "alsoPublishedAs": "Également publié en tant que: CH707437 (A1) CH707437 (B1) CH707437 (A1) CH707437 (B1) moins",
    "publicationAliases": [
      "CH707437A1",
      "CH707437B1"
    ],
    "publicationHeader": "Données bibliographiques: CH707437 (A1) ― 2014-07-15",
    "tags": [
      "RICHEMONT INT SA",
      "G04B29/02",
      "2014"
    ],
    "coverImage": "/assets/patents/CH707437A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/CH707437A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/CH707437A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH707437A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/CH707437A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH707437A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/CH707437A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH707437A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/CH707437A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/CH707437A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=33&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20140715&CC=CH&NR=707437A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=CH&NR=707437A1&KC=A1&FT=D&ND=3&date=20140715&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=CH&NR=707437A1&KC=A1&FT=D&ND=3&date=20140715&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=CH&NR=707437A1&KC=A1&FT=D&ND=3&date=20140715&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=CH&NR=707437A1&KC=A1&FT=D&ND=3&date=20140715&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=CH&NR=707437A1&KC=A1&FT=D&ND=3&date=20140715&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=CH&NR=707437A1&KC=A1&FT=D&ND=3&date=20140715&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=CH&NR=707437A1&KC=A1&FT=D&ND=3&date=20140715&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=CH&NR=707437A1&KC=A1&FT=D&ND=3&date=20140715&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/CH707437A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP2745749A1",
    "publication": "EP2745749 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Device for preparing a drink",
    "abstract": "The device has movable chambers which are moved relative to each other between open position and closed position. A brewing chamber is formed with portion for receiving package, in a closed position. A supply line and discharge line are provided for passing a liquid medium through the chamber. An actuating element (7) is used to create open position and closed position through a gear (8) with a chamber in operative connection. An actuating element is displaceable along a linear or curved guide track (9).",
    "date": "2014-06-25",
    "priorityDate": "2012-12-21",
    "inventors": "HEISEL GUILLAUME [CH]; THULIEZ JEAN-LUC [CH]; CROZIER ETIENNE [CH]; AFFOLTER ROLAND [CH]",
    "applicants": "DELICA AG [CH]",
    "secondaryInventors": "(AFFOLTER, ROLAND; CROZIER, ETIENNE; HEISEL, GUILLAUME; THULIEZ, JEAN-LUC; AFFOLTER, ROLAND; CROZIER, ETIENNE; HEISEL, GUILLAUME; THULIEZ, JEAN-LUC)",
    "secondaryApplicants": "(DELICA AG; DELICA AG)",
    "classification": "Classification: - internationale A47J31/06 - coopérative A47J31/3633 (EP)",
    "applicationNumber": "Numéro de demande EP20120199045 20121221 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20120199045 20121221 ;",
    "alsoPublishedAs": "Également publié en tant que: EP2745749 (A1) EP2745749 (B1) ES2605107 (T3) EP2745749 (A1) EP2745749 (B1) ES2605107 (T3) moins",
    "publicationAliases": [
      "EP2745749A1",
      "EP2745749B1",
      "ES2605107T3"
    ],
    "publicationHeader": "Données bibliographiques: EP2745749 (A1) ― 2014-06-25",
    "tags": [
      "DELICA AG",
      "A47J31/06",
      "2014"
    ],
    "coverImage": "/assets/patents/EP2745749A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP2745749A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP2745749A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2745749A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP2745749A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2745749A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP2745749A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2745749A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP2745749A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2745749A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP2745749A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2745749A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP2745749A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2745749A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP2745749A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP2745749A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2745749A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=34&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20140625&CC=EP&NR=2745749A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=2745749A1&KC=A1&FT=D&ND=3&date=20140625&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=2745749A1&KC=A1&FT=D&ND=3&date=20140625&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=2745749A1&KC=A1&FT=D&ND=3&date=20140625&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=2745749A1&KC=A1&FT=D&ND=3&date=20140625&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=2745749A1&KC=A1&FT=D&ND=3&date=20140625&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=2745749A1&KC=A1&FT=D&ND=3&date=20140625&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=2745749A1&KC=A1&FT=D&ND=3&date=20140625&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=2745749A1&KC=A1&FT=D&ND=3&date=20140625&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP2745749A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "FR2999439A1",
    "publication": "FR2999439 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "medical",
    "title": "DISPOSITIF DE DISTRIBUTION D'UN PRODUIT ET D'EMISSION D'UN RAYONNEMENT LUMINEUX",
    "abstract": "Il s'agit de distribuer un produit (3) contenant un composé actif sur une surface (5) d'un corps vivant et d'illuminer cette surface. Le dispositif présente pour cela une zone (30) de distribution du produit vers ladite surface et une source lumineuse (9) émettant au moins un rayon vers la surface.",
    "date": "2014-06-20",
    "priorityDate": "2012-12-15",
    "inventors": "HEISEL GUILLAUME [CH]; CROZIER ETIENNE [CH]; DECAUX STEPHANE [FR]; THULIEZ JEAN LUC [CH]",
    "applicants": "DECAUX GERALDINE [FR]; SIMON FLORENT [FR]; DECAUX STEPHANE [FR]",
    "secondaryInventors": "(THULIEZ JEAN LUC; CROZIER ETIENNE; HEISEL GUILLAUME; DECAUX STEPHANE; THULIEZ, JEAN LUC; CROZIER, ETIENNE; HEISEL, GUILLAUME; DECAUX, STEPHANE)",
    "secondaryApplicants": "(DECAUX STEPHANE; DECAUX GERALDINE; SIMON FLORENT; DECAUX STEPHANE; DECAUX GERALDINE; SIMON FLORENT)",
    "classification": "Classification: - internationale A61H15/02; A61M31/00; A61M35/00 - coopérative A45D2200/055 (EP, US); A45D34/041 (EP, US); A45D40/261 (US); A61H15/0092 (EP, US); A61H15/02 (EP, US); A61H2015/0064 (EP, US); A61H2201/0184 (EP, US); A61H2201/10 (EP, US); A61H2201/105 (EP, US); A61H2201/1246 (EP, US); A61H7/003 (EP, US); A61M2037/0007 (EP, US); A61M35/003 (EP, US); A61N2005/063 (EP, US); A61N2005/0631 (EP, US); A61N2005/0644 (EP, US); A61N2005/0659 (EP, US); A61N5/06 (RU); A61N5/0616 (EP, US)",
    "applicationNumber": "Numéro de demande FR20120003445 20121217",
    "priorityNumbers": "Numéro(s) de priorité: FR20120003433 20121215 ; FR20120003445 20121217 ;",
    "alsoPublishedAs": "Également publié en tant que: FR2999439 (A1) FR2999439 (B1) AU2013357240 (A1) AU2013357240 (B2) BR112015014032 (A2) plus FR2999439 (A1) FR2999439 (B1) AU2013357240 (A1) AU2013357240 (B2) BR112015014032 (A2) BR112015014032 (B1) CA2895145 (A1) CA2895145 (C) CN104994902 (A) CN104994902 (B) CN113877052 (A) CN113877052 (B) EP2931355 (A1) EP2931355 (B1) ES2755037 (T3) FR2999438 (A1) FR2999438 (B1) HK1212640 (A1) JP2015536776 (A) JP2019080941 (A) JP6829543 (B2) KR102332094 (B1) KR20150112950 (A) MX2015007620 (A) MX375130 (B) RU2015128624 (A) RU2672800 (C2) US10334933 (B2) US2015327653 (A1) WO2014091035 (A1) moins",
    "publicationAliases": [
      "AU2013357240A1",
      "AU2013357240B2",
      "BR112015014032A2",
      "BR112015014032B1",
      "CA2895145A1",
      "CA2895145C",
      "CN104994902A",
      "CN104994902B",
      "CN113877052A",
      "CN113877052B",
      "EP2931355A1",
      "EP2931355B1",
      "ES2755037T3",
      "FR2999438A1",
      "FR2999438B1",
      "FR2999439A1",
      "FR2999439B1",
      "HK1212640A1",
      "JP6829543B2",
      "JP2015536776A",
      "JP2019080941A",
      "KR102332094B1",
      "KR20150112950A",
      "MX375130B",
      "MX2015007620A",
      "RU2672800C2",
      "RU2015128624A",
      "US10334933B2",
      "US2015327653A1",
      "US20150327653A1",
      "WO2014091035A1"
    ],
    "publicationHeader": "Données bibliographiques: FR2999439 (A1) ― 2014-06-20",
    "tags": [
      "DECAUX GERALDINE",
      "A61H15/02",
      "2014"
    ],
    "coverImage": "/assets/patents/FR2999439A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/FR2999439A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/FR2999439A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/FR2999439A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/FR2999439A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/FR2999439A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/FR2999439A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/FR2999439A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/FR2999439A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/FR2999439A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/FR2999439A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/FR2999439A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/FR2999439A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/FR2999439A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/FR2999439A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/FR2999439A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/FR2999439A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=35&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20140620&CC=FR&NR=2999439A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=FR&NR=2999439A1&KC=A1&FT=D&ND=3&date=20140620&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=FR&NR=2999439A1&KC=A1&FT=D&ND=3&date=20140620&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=FR&NR=2999439A1&KC=A1&FT=D&ND=3&date=20140620&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=FR&NR=2999439A1&KC=A1&FT=D&ND=3&date=20140620&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=FR&NR=2999439A1&KC=A1&FT=D&ND=3&date=20140620&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=FR&NR=2999439A1&KC=A1&FT=D&ND=3&date=20140620&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=FR&NR=2999439A1&KC=A1&FT=D&ND=3&date=20140620&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=FR&NR=2999439A1&KC=A1&FT=D&ND=3&date=20140620&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/FR2999439A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "CH700288A2",
    "publication": "CH700288 (A2)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Automatic hot beverage preparing machine i.e. coffee machine, has discharge device used for unlocking and opening extraction chamber, swinging pivoting support and ejecting used portion into recovery tray immediately after extraction",
    "abstract": "The machine (10) has a container to receive a portion (20) containing a determined dosage of substance e.g. roasted and ground coffee, partially soluble in water. Heating unit heats a preset quantity of water in a reservoir. An electric motor is coupled to an automatic discharge device of the portion after the utilization of machine. The device is used for unlocking and opening an extraction chamber that contains a rotating support (21) carrying the portion, swinging the support and ejecting the used portion into a recovery tray (14) immediately after extraction, without user intervention.",
    "date": "2010-07-30",
    "priorityDate": "2009-01-28",
    "inventors": "THULIEZ JEAN-LUC [CH]; CROZIER ETIENNE [CH]",
    "applicants": "SEMEUSE MARC A BLOCH [CH]",
    "secondaryInventors": "(ETIENNE CROZIER; JEAN-LUC THULIEZ)",
    "secondaryApplicants": "(LA SEMEUSE MARC A. BLOCH)",
    "classification": "Classification: - internationale A47J31/44 - coopérative A47J31/3638 (EP); A47J31/368 (EP)",
    "applicationNumber": "Numéro de demande CH20090000124 20090128",
    "priorityNumbers": "Numéro(s) de priorité: CH20090000124 20090128 ;",
    "alsoPublishedAs": "Également publié en tant que: CH700288 (A2) CH700288 (A2) moins",
    "publicationAliases": [
      "CH700288A2"
    ],
    "publicationHeader": "Données bibliographiques: CH700288 (A2) ― 2010-07-30",
    "tags": [
      "SEMEUSE MARC A BLOCH",
      "A47J31/44",
      "2010"
    ],
    "coverImage": "/assets/patents/CH700288A2/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/CH700288A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/CH700288A2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH700288A2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=36&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20100730&CC=CH&NR=700288A2&KC=A2",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=CH&NR=700288A2&KC=A2&FT=D&ND=3&date=20100730&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=CH&NR=700288A2&KC=A2&FT=D&ND=3&date=20100730&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=CH&NR=700288A2&KC=A2&FT=D&ND=3&date=20100730&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=CH&NR=700288A2&KC=A2&FT=D&ND=3&date=20100730&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=CH&NR=700288A2&KC=A2&FT=D&ND=3&date=20100730&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=CH&NR=700288A2&KC=A2&FT=D&ND=3&date=20100730&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=CH&NR=700288A2&KC=A2&FT=D&ND=3&date=20100730&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=CH&NR=700288A2&KC=A2&FT=D&ND=3&date=20100730&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/CH700288A2/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2011081464A1",
    "publication": "US2011081464 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "DEVICE AND METHOD FOR PRODUCING A FROTHED WHITENED BEVERAGE",
    "abstract": "The invention concerns a method for hygienically and automatically producing from a beverage dispensing device a frothed whitened beverage in a receptacle comprising upon the actuation of a command on the device the following operations controlled by a control unit of said device: -a. metering and delivering a pre-warming volume of heated water in a receptacle for prewarming a whitening food component already contained in the receptacle and forming a warmed liquid in said receptacle, -b. metering and delivering a frothing volume of heated water in the form of at least a pressurized jet directed toward the receptacle for frothing the warmed liquid, -c. producing and delivering in the receptacle a liquid mixture made of a second food component and a metered mixing volume of water. The invention also concerns a device for implementing said method.",
    "date": "2011-04-07",
    "priorityDate": "2008-05-28",
    "inventors": "THULIEZ JEAN-LUC [CH]; GUGERLI RAPHAEL [CH]",
    "applicants": "THULIEZ JEAN-LUC [CH]; NESTEC SA [CH]; GUGERLI RAPHAEL [CH]",
    "secondaryInventors": "(GUGERLI RAPHAEL; THULIEZ JEAN-LUC; GUGERLI RAPHAEL; THULIEZ JEAN-LUC)",
    "secondaryApplicants": "(NESTEC S.A.; NESTEC S.A.; GUGERLI RAPHAEL; THULIEZ JEAN-LUC)",
    "classification": "Classification: - internationale A23P30/40; A47J31/00; A47J31/41 - coopérative A47J31/401 (EP, US)",
    "applicationNumber": "Numéro de demande US20090994532 20090526 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20080157056 20080528 ; WO2009EP56368 20090526 ;",
    "alsoPublishedAs": "Également publié en tant que: EP2127567 (A1) EP2303076 (A1) EP2303076 (B1) MX2010012978 (A) US8383184 (B2) plus EP2127567 (A1) EP2303076 (A1) EP2303076 (B1) MX2010012978 (A) US8383184 (B2) WO2009144219 (A1) moins Google Patents: US20110081464A1",
    "publicationAliases": [
      "EP2127567A1",
      "EP2303076A1",
      "EP2303076B1",
      "MX2010012978A",
      "US8383184B2",
      "US2011081464A1",
      "US20110081464A1",
      "WO2009144219A1"
    ],
    "publicationHeader": "Données bibliographiques: US2011081464 (A1) ― 2011-04-07",
    "tags": [
      "THULIEZ JEAN-LUC",
      "A23P30/40",
      "2011"
    ],
    "coverImage": "/assets/patents/US2011081464A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2011081464A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2011081464A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2011081464A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2011081464A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2011081464A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2011081464A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2011081464A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2011081464A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2011081464A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=37&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20110407&CC=US&NR=2011081464A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2011081464A1&KC=A1&FT=D&ND=3&date=20110407&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2011081464A1&KC=A1&FT=D&ND=3&date=20110407&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2011081464A1&KC=A1&FT=D&ND=3&date=20110407&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2011081464A1&KC=A1&FT=D&ND=3&date=20110407&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2011081464A1&KC=A1&FT=D&ND=3&date=20110407&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2011081464A1&KC=A1&FT=D&ND=3&date=20110407&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2011081464A1&KC=A1&FT=D&ND=3&date=20110407&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2011081464A1&KC=A1&FT=D&ND=3&date=20110407&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2011081464A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2011061534A1",
    "publication": "US2011061534 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "BEVERAGE PRODUCTION DEVICE",
    "abstract": "The invention as claimed shows a beverage production device (1) comprising a beverage production chamber (20) designed to have a liquid interact with a beverage ingredient (T) contained in a capsule, liquid supply means (8) for supplying liquid to said beverage production chamber (20), heating means (7) provided in the liquid supply means (8) for heating the liquid, and an air separating compartment (30) provided in the liquid supply means (8) after the heating means (7) for separating any air or other gas contained in the liquid, wherein the air separating compartment (30) comprises an inlet (35) for introducing liquid into the air separating compartment (30), means for breaking the kinetic energy of the liquid introduced through the inlet (35), a liquid outlet (37), separated from the inlet by the means for breaking the kinetic energy of the liquid introduced through the inlet (35), for evacuating liquid from the air separating compartment (30), and an air outlet (39), also separated from the inlet by the means for breaking the kinetic energy of the liquid introduced through the inlet (35), for evacuating air from the air separating compartment (30). Hence, a beverage production device (1) is provided having a reduced amount of air in the liquid used for extraction of the beverage ingredient (T).",
    "date": "2011-03-17",
    "priorityDate": "2008-05-08",
    "inventors": "THULIEZ JEAN-LUC [CH]; OZANNE MATTHIEU [FR]; VUAGNIAUX DIDIER [CH]; ROBERT THIERRY [CH]",
    "applicants": "THULIEZ JEAN-LUC [CH]; OZANNE MATTHIEU [FR]; NESTEC SA [CH]; VUAGNIAUX DIDIER [CH]; ROBERT THIERRY [CH]",
    "secondaryInventors": "(OZANNE MATTHIEU; VUAGNIAUX DIDIER; THULIEZ JEAN-LUC; ROBERT THIERRY; OZANNE MATTHIEU; VUAGNIAUX DIDIER; THULIEZ JEAN-LUC; ROBERT THIERRY)",
    "secondaryApplicants": "(NESTEC S.A.; OZANNE MATTHIEU; VUAGNIAUX DIDIER; THULIEZ JEAN-LUC; ROBERT THIERRY; NESTEC S.A.)",
    "classification": "Classification: - internationale A47J31/40; A47J31/44; B01D19/00 - coopérative A47J31/36 (KR); A47J31/461 (EP, KR, US); B01D19/0042 (EP, KR, US)",
    "applicationNumber": "Numéro de demande US20090991593 20090507 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20080155882 20080508 ; WO2009EP55536 20090507 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2009245745 (A1) BRPI0915055 (A2) CA2728578 (A1) CN102056524 (A) CN102056524 (B) plus AU2009245745 (A1) BRPI0915055 (A2) CA2728578 (A1) CN102056524 (A) CN102056524 (B) DK2276381 (T3) EP2276381 (A1) EP2276381 (B1) ES2430851 (T3) JP2011519644 (A) JP5422644 (B2) KR20110005304 (A) NZ588984 (A) PL2276381 (T3) PT2276381 (E) RU2010150144 (A) RU2489958 (C2) US8460440 (B2) WO2009135899 (A1) ZA201008802 (B) moins Google Patents: HK1153366A; US20110061534A1",
    "publicationAliases": [
      "AU2009245745A1",
      "BRPI0915055A2",
      "CA2728578A1",
      "CN102056524A",
      "CN102056524B",
      "DK2276381T3",
      "EP2276381A1",
      "EP2276381B1",
      "ES2430851T3",
      "HK1153366A",
      "JP5422644B2",
      "JP2011519644A",
      "KR20110005304A",
      "NZ588984A",
      "PL2276381T3",
      "PT2276381E",
      "RU2489958C2",
      "RU2010150144A",
      "US8460440B2",
      "US2011061534A1",
      "US20110061534A1",
      "WO2009135899A1",
      "ZA201008802B"
    ],
    "publicationHeader": "Données bibliographiques: US2011061534 (A1) ― 2011-03-17",
    "tags": [
      "THULIEZ JEAN-LUC",
      "A47J31/40",
      "2011"
    ],
    "coverImage": "/assets/patents/US2011061534A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2011061534A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2011061534A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2011061534A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2011061534A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2011061534A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2011061534A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2011061534A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2011061534A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2011061534A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=38&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20110317&CC=US&NR=2011061534A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2011061534A1&KC=A1&FT=D&ND=3&date=20110317&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2011061534A1&KC=A1&FT=D&ND=3&date=20110317&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2011061534A1&KC=A1&FT=D&ND=3&date=20110317&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2011061534A1&KC=A1&FT=D&ND=3&date=20110317&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2011061534A1&KC=A1&FT=D&ND=3&date=20110317&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2011061534A1&KC=A1&FT=D&ND=3&date=20110317&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2011061534A1&KC=A1&FT=D&ND=3&date=20110317&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2011061534A1&KC=A1&FT=D&ND=3&date=20110317&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2011061534A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "CH701083B1",
    "publication": "CH701083 (B1)",
    "corpus": "jean-luc-thuliez",
    "filter": "medical",
    "title": "Dispositif pour le détartage et le blanchiment simultane des dents.",
    "abstract": "[0001] L’invention concerne un dispositif (10) pour le détartrage et le blanchiment simultané sous pression des dents. Ce dispositif comporte un corps allongé (11), équipé à l’une de ses extrémités d’une tubulure de distribution (12) de particules solides de détartrage et de blanchiment, et fermé par un bouchon amovible (13). Le corps allongé (11) est agencé pour contenir une cartouche de détartrage et de blanchiment (14). Cette cartouche de détartrage et de blanchiment (14) est un élément indépendant, interchangeable et jetable qui peut être conçu pour un usage unique ou pour des usages répétés. Elle contient un réservoir de liquide, par exemple de l’eau déminéralisée ou de l’eau oxygénée, un réservoir de particules solides de détartrage et de blanchiment, et une source de gaz sous pression, appelé gaz propulseur. L’aspiration des particules solides de leur réservoir avant leur projection sous pression dans un canal de sortie est obtenue par un élément du type Venturi.[0002] <img class=\"EMIRef\" id=\"49390275-iaf0001\" />",
    "date": "2010-11-30",
    "priorityDate": "2007-06-15",
    "inventors": "THULIEZ JEAN-LUC [CH]; CROZIER ETIENNE [CH]; VARIDEL CHRISTOPHE [CH]",
    "applicants": "DENTOTECH AS [NO]",
    "secondaryInventors": "(THULIEZ JEAN-LUC; GROZIER ETIENNE; VARIDEL CHRISTOPHE)",
    "secondaryApplicants": "(DENTOTECH AS)",
    "classification": "Classification: - internationale A61C3/025 - coopérative A61C19/066 (EP); A61C3/025 (EP)",
    "applicationNumber": "Numéro de demande CH20070000963 20070615",
    "priorityNumbers": "Numéro(s) de priorité: CH20070000963 20070615 ;",
    "alsoPublishedAs": "Également publié en tant que: CH701083 (B1) WO2008151457 (A1) CH701083 (B1) WO2008151457 (A1) moins",
    "publicationAliases": [
      "CH701083B1",
      "WO2008151457A1"
    ],
    "publicationHeader": "Données bibliographiques: CH701083 (B1) ― 2010-11-30",
    "tags": [
      "DENTOTECH AS",
      "A61C3/025",
      "2010"
    ],
    "coverImage": "/assets/patents/CH701083B1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/CH701083B1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/CH701083B1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH701083B1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/CH701083B1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH701083B1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/CH701083B1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH701083B1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/CH701083B1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH701083B1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/CH701083B1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH701083B1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/CH701083B1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH701083B1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/CH701083B1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH701083B1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/CH701083B1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/CH701083B1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/CH701083B1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=39&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20101130&CC=CH&NR=701083B1&KC=B1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=CH&NR=701083B1&KC=B1&FT=D&ND=3&date=20101130&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=CH&NR=701083B1&KC=B1&FT=D&ND=3&date=20101130&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=CH&NR=701083B1&KC=B1&FT=D&ND=3&date=20101130&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=CH&NR=701083B1&KC=B1&FT=D&ND=3&date=20101130&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=CH&NR=701083B1&KC=B1&FT=D&ND=3&date=20101130&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=CH&NR=701083B1&KC=B1&FT=D&ND=3&date=20101130&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=CH&NR=701083B1&KC=B1&FT=D&ND=3&date=20101130&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=CH&NR=701083B1&KC=B1&FT=D&ND=3&date=20101130&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/CH701083B1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP2000065A1",
    "publication": "EP2000065 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Device and method for producing a beverage by mixing soluble ingredients and a diluent",
    "abstract": "A device for mixing a soluble food or beverage ingredient and a diluent comprises: - a mixing chamber (13) (13) having an inlet (17) for the ingredient, an inlet (18) for the diluent and an outlet (20) for the beverage or comestible food resulting from the mixing of the ingredient with the diluent, - a reservoir (3) for the ingredient, the reservoir (3) being connected to the mixing chamber (13) via an ingredient flow path, and - air stream generating means designed for generating an stream of air from outside the mixing device and crossing the ingredient flow path, the air stream generating means comprising means for generating a low pressure zone (101) above the ingredient inlet opening (17).",
    "date": "2008-12-10",
    "priorityDate": "2007-06-05",
    "inventors": "THULIEZ JEAN-LUC [CH]; KISSLING IWAN [CH]",
    "applicants": "NESTEC SA [CH]",
    "secondaryInventors": "(THULIEZ, JEAN-LUC; KISSLING, IWAN)",
    "secondaryApplicants": "(NESTEC S.A.)",
    "classification": "Classification: - internationale A47J31/40 - coopérative A47J31/401 (EP)",
    "applicationNumber": "Numéro de demande EP20070109616 20070605 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20070109616 20070605 ;",
    "alsoPublishedAs": "Également publié en tant que: EP2000065 (A1) AR066858 (A1) TW200927044 (A) WO2008148711 (A1) EP2000065 (A1) AR066858 (A1) TW200927044 (A) WO2008148711 (A1) moins Google Patents: HK1124746A",
    "publicationAliases": [
      "AR066858A1",
      "EP2000065A1",
      "HK1124746A",
      "TW200927044A",
      "WO2008148711A1"
    ],
    "publicationHeader": "Données bibliographiques: EP2000065 (A1) ― 2008-12-10",
    "tags": [
      "NESTEC SA",
      "A47J31/40",
      "2008"
    ],
    "coverImage": "/assets/patents/EP2000065A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP2000065A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP2000065A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2000065A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP2000065A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2000065A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP2000065A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP2000065A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=40&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20081210&CC=EP&NR=2000065A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=2000065A1&KC=A1&FT=D&ND=3&date=20081210&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=2000065A1&KC=A1&FT=D&ND=3&date=20081210&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=2000065A1&KC=A1&FT=D&ND=3&date=20081210&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=2000065A1&KC=A1&FT=D&ND=3&date=20081210&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=2000065A1&KC=A1&FT=D&ND=3&date=20081210&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=2000065A1&KC=A1&FT=D&ND=3&date=20081210&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=2000065A1&KC=A1&FT=D&ND=3&date=20081210&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=2000065A1&KC=A1&FT=D&ND=3&date=20081210&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP2000065A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP2129582A1",
    "publication": "EP2129582 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "METHOD FOR INERTING A CONTAINER WITH THE INJECTION OF AN INERT GAS AND DEVICE FOR IMPLEMENTING SAME",
    "abstract": "",
    "date": "2009-12-09",
    "priorityDate": "2007-03-30",
    "inventors": "THULIEZ JEAN-LUC [CH]; RUSSO MICKAEL [FR]; ROBERT THIERRY [CH]; VARIDEL CHRISTOPHE [CH]",
    "applicants": "GRETHER PIERRE YVES [CH]",
    "secondaryInventors": "(THULIEZ, JEAN-LUC; ROBERT, THIERRY; RUSSO, MICKAEL; VARIDEL, CHRISTOPHE; THULIEZ, JEAN-LUC; ROBERT, THIERRY; RUSSO, MICKAEL; VARIDEL, CHRISTOPHE)",
    "secondaryApplicants": "(GRETHER, PIERRE-YVES; GRETHER, PIERRE-YVES)",
    "classification": "Classification: - internationale B65B31/04; B65B31/08 - coopérative B65B31/042 (EP)",
    "applicationNumber": "Numéro de demande EP20080706398 20080311 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: CH20070000514 20070330 ; WO2008CH00101 20080311 ;",
    "alsoPublishedAs": "Également publié en tant que: EP2129582 (A1) EP2129582 (B1) ATE547327 (T1) CH700700 (B1) WO2008119193 (A1) EP2129582 (A1) EP2129582 (B1) ATE547327 (T1) CH700700 (B1) WO2008119193 (A1) moins",
    "publicationAliases": [
      "ATE547327T1",
      "CH700700B1",
      "EP2129582A1",
      "EP2129582B1",
      "WO2008119193A1"
    ],
    "publicationHeader": "Données bibliographiques: EP2129582 (A1) ― 2009-12-09",
    "tags": [
      "GRETHER PIERRE YVES",
      "B65B31/04",
      "2009"
    ],
    "coverImage": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/EP2129582A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP2129582A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP2129582A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=41&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20091209&CC=EP&NR=2129582A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=2129582A1&KC=A1&FT=D&ND=3&date=20091209&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=2129582A1&KC=A1&FT=D&ND=3&date=20091209&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=2129582A1&KC=A1&FT=D&ND=3&date=20091209&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=2129582A1&KC=A1&FT=D&ND=3&date=20091209&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=2129582A1&KC=A1&FT=D&ND=3&date=20091209&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=2129582A1&KC=A1&FT=D&ND=3&date=20091209&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=2129582A1&KC=A1&FT=D&ND=3&date=20091209&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=2129582A1&KC=A1&FT=D&ND=3&date=20091209&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP2129582A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2010173057A1",
    "publication": "US2010173057 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "DEVICE AND METHOD FOR PRODUCING A FROTHED LIQUID FROM SOLUBLE INGREDIENTS AND DILUENT",
    "abstract": "[0000] Device for producing a frothed liquid comprising a chamber 13 opened to atmosphere with a transverse bottom wall 14 and a longitudinal upward wall 15, at least one diluent inlet 18, at least one liquid delivery outlet 20, wherein the diluent inlet is provided through the upward wall and is dimensioned and oriented for directing a thin jet of diluent in the chamber, and wherein the at least one liquid delivery outlet is configured in the bottom wall for liquid to rise up along the side of the upward wall by the jet of diluent entering the chamber as a result of the direction and dimension of the diluent inlet in the chamber.",
    "date": "2010-07-08",
    "priorityDate": "2006-12-11",
    "inventors": "THULIEZ JEAN-LUC [CH]; DOGAN NIHAN [CH]; BEAUSIRE CEDRIC [CH]; KISSLING IWAN [CH]; HAMEL DAVID [CH]; BERNHARDSGRUETTER RAPHAEL [CH]; GUGERLI RAPHAEL [CH]; HARRISON DAVID J [US]",
    "applicants": "THULIEZ JEAN-LUC [CH]; DOGAN NIHAN [CH]; BEAUSIRE CEDRIC [CH]; KISSLING IWAN [CH]; HAMEL DAVID [CH]; NESTEC SA [CH]; BERNHARDSGRUETTER RAPHAEL [CH]; GUGERLI RAPHAEL [CH]; HARRISON DAVID J [US]",
    "secondaryInventors": "(GUGERLI RAPHAEL; THULIEZ JEAN-LUC; KISSLING IWAN; BERNHARDSGRUETTER RAPHAEL; BEAUSIRE CEDRIC; DOGAN NIHAN; HARRISON DAVID J.; HAMEL DAVID; GUGERLI RAPHAEL; THULIEZ JEAN-LUC; KISSLING IWAN; BERNHARDSGRUETTER RAPHAEL; BEAUSIRE CEDRIC; DOGAN NIHAN; HARRISON DAVID J.; HAMEL DAVID)",
    "secondaryApplicants": "(NESTEC S.A.; GUGERLI RAPHAEL; THULIEZ JEAN-LUC; KISSLING IWAN; BERNHARDSGRUETTER RAPHAEL; BEAUSIRE CEDRIC; DOGAN NIHAN; HARRISON DAVID J.; HAMEL DAVID; NESTEC S.A.)",
    "classification": "Classification: - internationale A23L1/00; A23L2/54; A47J31/40; B01F3/04 - coopérative A23F5/262 (EP, US); A23L2/54 (US); A23V2002/00 (US); A47J31/401 (EP, US); A47J31/404 (US); A47J31/407 (US); A47J31/46 (EP, US); A47J31/462 (US); B65D85/8049 (EP, US); B65D85/8052 (EP, US)",
    "applicationNumber": "Numéro de demande US20070518675 20071206 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20060125772 20061211 ; WO2007EP63391 20071206 ;",
    "alsoPublishedAs": "Également publié en tant que: AR064290 (A1) AU2007332588 (A1) AU2007332588 (B2) CA2673279 (A1) CA2673279 (C) plus AR064290 (A1) AU2007332588 (A1) AU2007332588 (B2) CA2673279 (A1) CA2673279 (C) CL2007003578 (A1) CN101600378 (A) CN101600378 (B) EP1932457 (A1) EP2091393 (A1) EP2091393 (B1) EP2653080 (A1) EP2653080 (B1) EP2653081 (A1) EP2653081 (B1) EP2653407 (A1) EP2653407 (B1) EP2907428 (A1) EP2907428 (B1) ES2430293 (T3) ES2545199 (T3) ES2673879 (T3) JP2010512207 (A) JP5422391 (B2) MX2009006128 (A) MX355514 (B) MX355516 (B) MY162226 (A) PE20081619 (A1) PL2091393 (T3) RU2009126593 (A) RU2462977 (C2) TW200911186 (A) TWI459921 (B) US2015110936 (A1) US2015128812 (A1) US8960079 (B2) US9307859 (B2) US9408495 (B2) UY30777 (A1) WO2008071613 (A1) ZA200904862 (B) moins Google Patents: HK1119383A; US20100173057A1",
    "publicationAliases": [
      "AR064290A1",
      "AU2007332588A1",
      "AU2007332588B2",
      "CA2673279A1",
      "CA2673279C",
      "CL2007003578A1",
      "CN101600378A",
      "CN101600378B",
      "EP1932457A1",
      "EP2091393A1",
      "EP2091393B1",
      "EP2653080A1",
      "EP2653080B1",
      "EP2653081A1",
      "EP2653081B1",
      "EP2653407A1",
      "EP2653407B1",
      "EP2907428A1",
      "EP2907428B1",
      "ES2430293T3",
      "ES2545199T3",
      "ES2673879T3",
      "HK1119383A",
      "JP5422391B2",
      "JP2010512207A",
      "MX355514B",
      "MX355516B",
      "MX2009006128A",
      "MY162226A",
      "PE20081619A1",
      "PL2091393T3",
      "RU2462977C2",
      "RU2009126593A",
      "TW200911186A",
      "TWI459921B",
      "US8960079B2",
      "US9307859B2",
      "US9408495B2",
      "US2010173057A1",
      "US2015110936A1",
      "US2015128812A1",
      "US20100173057A1",
      "US20150110936A1",
      "US20150128812A1",
      "UY30777A1",
      "WO2008071613A1",
      "ZA200904862B"
    ],
    "publicationHeader": "Données bibliographiques: US2010173057 (A1) ― 2010-07-08",
    "tags": [
      "THULIEZ JEAN-LUC",
      "A23L1/00",
      "2010"
    ],
    "coverImage": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/US2010173057A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2010173057A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2010173057A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=42&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20100708&CC=US&NR=2010173057A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2010173057A1&KC=A1&FT=D&ND=3&date=20100708&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2010173057A1&KC=A1&FT=D&ND=3&date=20100708&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2010173057A1&KC=A1&FT=D&ND=3&date=20100708&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2010173057A1&KC=A1&FT=D&ND=3&date=20100708&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2010173057A1&KC=A1&FT=D&ND=3&date=20100708&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2010173057A1&KC=A1&FT=D&ND=3&date=20100708&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2010173057A1&KC=A1&FT=D&ND=3&date=20100708&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2010173057A1&KC=A1&FT=D&ND=3&date=20100708&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2010173057A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "USD568097S",
    "publication": "USD568097 (S)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Filter accessory for carafe",
    "abstract": "",
    "date": "2008-05-06",
    "priorityDate": "2006-02-14",
    "inventors": "THULIEZ JEAN-LUC [CH]",
    "applicants": "",
    "secondaryInventors": "(THULIEZ JEAN-LUC)",
    "secondaryApplicants": "",
    "classification": "Classification: - internationale - coopérative",
    "applicationNumber": "Numéro de demande US20070296023F 20071012",
    "priorityNumbers": "Numéro(s) de priorité: EM20060479654F 20060214 ; US20060264609F 20060811 ; US20070296023F 20071012 ;",
    "alsoPublishedAs": "Également publié en tant que: USD568097 (S) USD568097 (S) moins Google Patents: USD568097S1",
    "publicationAliases": [
      "USD568097S",
      "USD568097S1"
    ],
    "publicationHeader": "Données bibliographiques: USD568097 (S) ― 2008-05-06",
    "tags": [
      "2008",
      "Industrial"
    ],
    "coverImage": "/assets/patents/USD568097S/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/USD568097S/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/USD568097S/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/USD568097S/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=43&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20080506&CC=US&NR=D568097S&KC=S",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=D568097S&KC=S&FT=D&ND=3&date=20080506&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=D568097S&KC=S&FT=D&ND=3&date=20080506&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=D568097S&KC=S&FT=D&ND=3&date=20080506&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=D568097S&KC=S&FT=D&ND=3&date=20080506&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=D568097S&KC=S&FT=D&ND=3&date=20080506&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=D568097S&KC=S&FT=D&ND=3&date=20080506&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=D568097S&KC=S&FT=D&ND=3&date=20080506&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=D568097S&KC=S&FT=D&ND=3&date=20080506&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/USD568097S/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US2009320941A1",
    "publication": "US2009320941 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "MULTI-WAY VALVE DEVICE",
    "abstract": "The invention relates to a multi-way valve device, particularly for household appliances, comprising a hollow body (11) and an axially movable piston (12) mounted inside this hollow body. The body (11) is provided with at least one inlet orifice (15) for a liquid solvent and at least two outlet orifices (16, 17) for this solvent. The movable piston (12) is coupled with an axially movable measuring stem (31) of a linear measuring element (30) of a solid substance, this measuring stem (31) being actuated by a mechanical actuator (32) and associated with a return spring (35). This movable piston (12) is arranged so as to move in one direction, freely, or against the pressure of the return spring (35), under the effect of the pressure of the liquid solvent applied at the inlet orifice (15) to this movable piston (12), and in the opposite direction, under the effect of the pressure applied to the measuring stem (31) by the return spring (35).",
    "date": "2009-12-31",
    "priorityDate": "2006-08-28",
    "inventors": "THULIEZ JEAN-LUC [CH]; KISSLING IWAN [CH]",
    "applicants": "THULIEZ JEAN-LUC [CH]; KISSLING IWAN [CH]; NESTEC SA [CH]",
    "secondaryInventors": "(KISSLING IWAN; THULIEZ JEAN-LUC; KISSLING IWAN; THULIEZ JEAN-LUC)",
    "secondaryApplicants": "(NESTEC S.A.; KISSLING IWAN; THULIEZ JEAN-LUC; NESTEC S.A.)",
    "classification": "Classification: - internationale B67D7/78; F16K11/065; F16K37/00 - coopérative A47J31/402 (EP, US); A47J31/404 (EP, US); B01F35/7141 (EP, US); B01F35/882 (EP, US); G01F11/18 (EP, US); Y10T137/8376 (EP, US); Y10T137/86549 (EP, US)",
    "applicationNumber": "Numéro de demande US20070438875 20070802 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20060405371 20060828 ; WO2007EP58010 20070802 ;",
    "alsoPublishedAs": "Également publié en tant que: EP1895279 (A1) JP2010501812 (A) JP5070289 (B2) MX2009002034 (A) US8240510 (B2) plus EP1895279 (A1) JP2010501812 (A) JP5070289 (B2) MX2009002034 (A) US8240510 (B2) WO2008025638 (A1) moins Google Patents: US20090320941A1",
    "publicationAliases": [
      "EP1895279A1",
      "JP5070289B2",
      "JP2010501812A",
      "MX2009002034A",
      "US8240510B2",
      "US2009320941A1",
      "US20090320941A1",
      "WO2008025638A1"
    ],
    "publicationHeader": "Données bibliographiques: US2009320941 (A1) ― 2009-12-31",
    "tags": [
      "THULIEZ JEAN-LUC",
      "B67D7/78",
      "2009"
    ],
    "coverImage": "/assets/patents/US2009320941A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US2009320941A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US2009320941A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2009320941A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US2009320941A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2009320941A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US2009320941A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2009320941A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US2009320941A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2009320941A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US2009320941A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2009320941A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US2009320941A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2009320941A1/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US2009320941A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US2009320941A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US2009320941A1/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=44&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20091231&CC=US&NR=2009320941A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=2009320941A1&KC=A1&FT=D&ND=3&date=20091231&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=2009320941A1&KC=A1&FT=D&ND=3&date=20091231&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=2009320941A1&KC=A1&FT=D&ND=3&date=20091231&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=2009320941A1&KC=A1&FT=D&ND=3&date=20091231&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=2009320941A1&KC=A1&FT=D&ND=3&date=20091231&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=2009320941A1&KC=A1&FT=D&ND=3&date=20091231&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=2009320941A1&KC=A1&FT=D&ND=3&date=20091231&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=2009320941A1&KC=A1&FT=D&ND=3&date=20091231&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US2009320941A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "WO2008017182A1",
    "publication": "WO2008017182 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "digital",
    "title": "METHOD AND DEVICE OR CONTROLLING THE QUALITY OF A FILTRATION CARTRIDGE AND VESSEL WITH SUCH A DEVICE",
    "abstract": "The invention relates to a method and a device for controlling the quality of a filtration cartridge of a vessel for containing filtered water, and to a vessel provided with such a control device. The control device (14) is integrated in the removable lid (13) of the vessel and is located above the filtration cartridge (15) provided in a cartridge holder (16) that is engaged in the vessel opening. The control device (14) comprises a water sensor (30) in the shape of a tab comprising two electrically conducting branches (30a, 30b). The sensor is provided at the outlet of a funnel (27) that directs the flow of water to be filtered onto the filtration cartridge (15). The control device (14) includes a power supply (32) for supplying power to an electronic management device (33) and display means (34) for emitting a light signal according to the charge status of the power supply (32) and to the operational state of the filtration cartridge (15) that depends on the volume of filtered water. The electronic management circuit (33) is switched on automatically when the first drops of water contact the sensor (30), measures the volume of filtered water and switches off at the end of the vessel filling.",
    "date": "2008-02-14",
    "priorityDate": "2006-08-08",
    "inventors": "THULIEZ JEAN-LUC [CH]; FLEURY RAPHAEL [CH]",
    "applicants": "THULIEZ JEAN-LUC [CH]; DOMTEKNIKA S A [CH]; FLEURY RAPHAEL [CH]",
    "secondaryInventors": "(THULIEZ, JEAN-LUC; FLEURY, RAPHAEL)",
    "secondaryApplicants": "(DOMTEKNIKA S.A.; THULIEZ, JEAN-LUC; FLEURY, RAPHAEL)",
    "classification": "Classification: - internationale A47J31/00; B01D46/00; C02F1/68 - coopérative A47J31/605 (EP); C02F1/68 (EP); C02F2201/006 (EP); C02F2209/005 (EP); C02F2307/04 (EP)",
    "applicationNumber": "Numéro de demande WO2007CH00383 20070806 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: CH20060001265 20060808 ;",
    "alsoPublishedAs": "Également publié en tant que: WO2008017182 (A1) WO2008017182 (A1) moins",
    "publicationAliases": [
      "WO2008017182A1"
    ],
    "publicationHeader": "Données bibliographiques: WO2008017182 (A1) ― 2008-02-14",
    "tags": [
      "THULIEZ JEAN-LUC",
      "A47J31/00",
      "2008"
    ],
    "coverImage": "/assets/patents/WO2008017182A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/WO2008017182A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/WO2008017182A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2008017182A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/WO2008017182A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/WO2008017182A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/WO2008017182A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/WO2008017182A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=45&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20080214&CC=WO&NR=2008017182A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=WO&NR=2008017182A1&KC=A1&FT=D&ND=3&date=20080214&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=WO&NR=2008017182A1&KC=A1&FT=D&ND=3&date=20080214&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=WO&NR=2008017182A1&KC=A1&FT=D&ND=3&date=20080214&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=WO&NR=2008017182A1&KC=A1&FT=D&ND=3&date=20080214&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=WO&NR=2008017182A1&KC=A1&FT=D&ND=3&date=20080214&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=WO&NR=2008017182A1&KC=A1&FT=D&ND=3&date=20080214&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=WO&NR=2008017182A1&KC=A1&FT=D&ND=3&date=20080214&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=WO&NR=2008017182A1&KC=A1&FT=D&ND=3&date=20080214&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/WO2008017182A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "USD560092S",
    "publication": "USD560092 (S)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "Carafe",
    "abstract": "",
    "date": "2008-01-22",
    "priorityDate": "2006-02-14",
    "inventors": "THULIEZ JEAN-LUC [CH]",
    "applicants": "",
    "secondaryInventors": "(THULIEZ JEAN-LUC)",
    "secondaryApplicants": "",
    "classification": "Classification: - internationale - coopérative",
    "applicationNumber": "Numéro de demande US20060264609F 20060811",
    "priorityNumbers": "Numéro(s) de priorité: EM20060600132F 20060214 ;",
    "alsoPublishedAs": "Également publié en tant que: USD560092 (S) USD560092 (S) moins Google Patents: USD560092S1",
    "publicationAliases": [
      "USD560092S",
      "USD560092S1"
    ],
    "publicationHeader": "Données bibliographiques: USD560092 (S) ― 2008-01-22",
    "tags": [
      "2008",
      "Industrial"
    ],
    "coverImage": "/assets/patents/USD560092S/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/USD560092S/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/USD560092S/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/USD560092S/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=46&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20080122&CC=US&NR=D560092S&KC=S",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=D560092S&KC=S&FT=D&ND=3&date=20080122&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=D560092S&KC=S&FT=D&ND=3&date=20080122&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=D560092S&KC=S&FT=D&ND=3&date=20080122&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=D560092S&KC=S&FT=D&ND=3&date=20080122&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=D560092S&KC=S&FT=D&ND=3&date=20080122&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=D560092S&KC=S&FT=D&ND=3&date=20080122&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=D560092S&KC=S&FT=D&ND=3&date=20080122&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=D560092S&KC=S&FT=D&ND=3&date=20080122&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/USD560092S/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "EP1744653A1",
    "publication": "EP1744653 (A1)",
    "corpus": "jean-luc-thuliez",
    "filter": "industrial",
    "title": "DEVICE FOR GENERATING AT LEAST ONE BEVERAGE JET AND A BEVERAGE DISPENSER PROVIDED WITH SAID DEVICE",
    "abstract": "",
    "date": "2007-01-24",
    "priorityDate": "2004-05-07",
    "inventors": "THULIEZ JEAN-LUC [CH]",
    "applicants": "DOMTEKNIKA S A [CH]",
    "secondaryInventors": "(THULIEZ, JEAN-LUC; THULIEZ, JEAN-LUC)",
    "secondaryApplicants": "(DOMTEKNIKA S.A.; DOMTEKNIKA S.A.)",
    "classification": "Classification: - internationale A47J31/06; A47J31/46 - coopérative A47J31/0668 (EP); A47J31/4496 (EP); A47J31/46 (EP, US)",
    "applicationNumber": "Numéro de demande EP20050733284 20050502 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: CH20040000808 20040507 ; WO2005CH00244 20050502 ;",
    "alsoPublishedAs": "Également publié en tant que: EP1744653 (A1) EP1744653 (B1) ATE376794 (T1) DE602005003120 (T2) WO2005107541 (A1) plus EP1744653 (A1) EP1744653 (B1) ATE376794 (T1) DE602005003120 (T2) WO2005107541 (A1) WO2005107541 (A8) moins",
    "publicationAliases": [
      "ATE376794T1",
      "DE602005003120T2",
      "EP1744653A1",
      "EP1744653B1",
      "WO2005107541A1",
      "WO2005107541A8"
    ],
    "publicationHeader": "Données bibliographiques: EP1744653 (A1) ― 2007-01-24",
    "tags": [
      "DOMTEKNIKA S A",
      "A47J31/06",
      "2007"
    ],
    "coverImage": "/assets/patents/EP1744653A1/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/EP1744653A1/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/EP1744653A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP1744653A1/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/EP1744653A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP1744653A1/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/EP1744653A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP1744653A1/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/EP1744653A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP1744653A1/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/EP1744653A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/EP1744653A1/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/EP1744653A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/EP1744653A1/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/publicationDetails/biblio?II=47&ND=3&adjacent=true&locale=fr_EP&FT=D&date=20070124&CC=EP&NR=1744653A1&KC=A1",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=EP&NR=1744653A1&KC=A1&FT=D&ND=3&date=20070124&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=EP&NR=1744653A1&KC=A1&FT=D&ND=3&date=20070124&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=EP&NR=1744653A1&KC=A1&FT=D&ND=3&date=20070124&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=EP&NR=1744653A1&KC=A1&FT=D&ND=3&date=20070124&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=EP&NR=1744653A1&KC=A1&FT=D&ND=3&date=20070124&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=EP&NR=1744653A1&KC=A1&FT=D&ND=3&date=20070124&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=EP&NR=1744653A1&KC=A1&FT=D&ND=3&date=20070124&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=EP&NR=1744653A1&KC=A1&FT=D&ND=3&date=20070124&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/EP1744653A1/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US11857104B2",
    "publication": "US11857104 (B2)",
    "corpus": "etienne-crozier-only",
    "filter": "industrial",
    "title": "EXCHANGEABLE CARTRIDGE FOR BEVERAGE PORTION DISPENSER",
    "abstract": "Exchangeable cartridge (3) for portion dispenser (1) arranged for storing and dispensing beverage items (8) for the preparation of beverages comprising: an elongated hollowed storage member (7) comprising an interior for accommodating a plurality of beverage items (8), comprising a closed end (9) and an open end (10) comprising an exit opening (11), a closure cap (14) adapted to connect in a removable manner to the elongated hollowed storage member (7) at the open end of the storage member and to be sealed through a removable complementary connection (15) of the storage member (7) and closure cap (14), wherein the closure cap (14) comprises a locking member (26), or respectively keying member, being arranged for complementarily fitting with a keying member (25), or respectively a locking member, of the portion dispenser (1) and for allowing the closure cap (14) to be removed from the elongated hollowed member (7) and to be re-connected to the elongated hollowed member (7).",
    "date": "2024-01-02",
    "priorityDate": "2017-12-22",
    "inventors": "CROZIER ETIENNE [CH]; ROMAND DAMIEN [FR]; MAGATTI MARCO [CH]",
    "applicants": "NESTLE SA [CH]",
    "secondaryInventors": "(Romand, Damien; Crozier, Etienne; Magatti, Marco; Romand, Damien; Crozier, Etienne; Magatti, Marco)",
    "secondaryApplicants": "(SOCIETE DES PRODUITS NESTLE S.A.; SOCIETE DES PRODUITS NESTLE S.A.)",
    "classification": "Classification: - internationale A47J31/40; A47J31/44; B65D85/804 - coopérative A47J31/3642 (EP, IL, KR); A47J31/407 (IL, US); A47J31/4403 (IL, KR); B65D85/804 (IL, US)",
    "applicationNumber": "Numéro de demande US201816956302 20181219 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20170210543 20171222 ; WO2018EP85717 20181219 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2018390791 (A1) AU2018390791 (B2) BR112020009754 (A2) CA3086645 (A1) CN111491542 (A) plus AU2018390791 (A1) AU2018390791 (B2) BR112020009754 (A2) CA3086645 (A1) CN111491542 (A) CN111491542 (B) DK3501345 (T3) EP3501345 (A1) EP3501345 (B1) EP3727104 (A1) EP3727104 (B1) ES2873938 (T3) IL274180 (A) IL274180 (B1) IL274180 (B2) JP2021506423 (A) JP7305645 (B2) KR20200099128 (A) MX2020007195 (A) PH12020550477 (A1) PT3501345 (T) RU2020123277 (A) RU2020123277 (A3) SG11202003934V (A) TW201927224 (A) US2020323386 (A1) WO2019121834 (A1) moins",
    "publicationAliases": [
      "AU2018390791A1",
      "AU2018390791B2",
      "BR112020009754A2",
      "CA3086645A1",
      "CN111491542A",
      "CN111491542B",
      "DK3501345T3",
      "EP3501345A1",
      "EP3501345B1",
      "EP3727104A1",
      "EP3727104B1",
      "ES2873938T3",
      "IL274180A",
      "IL274180B1",
      "IL274180B2",
      "JP7305645B2",
      "JP2021506423A",
      "KR20200099128A",
      "MX2020007195A",
      "PH12020550477A1",
      "PT3501345T",
      "RU2020123277A",
      "RU2020123277A3",
      "SG11202003934V",
      "TW201927224A",
      "US11857104B2",
      "US2020323386A1",
      "US20200323386A1",
      "WO2019121834A1"
    ],
    "publicationHeader": "Données bibliographiques: US11857104 (B2) ― 2024-01-02",
    "tags": [
      "NESTLE SA",
      "A47J31/40",
      "2024"
    ],
    "coverImage": "/assets/patents/US11857104B2/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_003_drawing_01.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_003_drawing_02.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/images/rendered_mosaic_page_003_drawing_03.png",
        "pdfHref": "/assets/patents/US11857104B2/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003 drawing 03",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US11857104B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11857104B2/pdfs/mosaic_page_003.pdf",
        "label": "mosaic page 003",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/patent/search/family/060813658/publication/US11857104B2?q=Etienne%20Crozier",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=11857104B2&KC=B2&FT=D&ND=3&date=20240102&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=11857104B2&KC=B2&FT=D&ND=3&date=20240102&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=11857104B2&KC=B2&FT=D&ND=3&date=20240102&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=11857104B2&KC=B2&FT=D&ND=3&date=20240102&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=11857104B2&KC=B2&FT=D&ND=3&date=20240102&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=11857104B2&KC=B2&FT=D&ND=3&date=20240102&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=11857104B2&KC=B2&FT=D&ND=3&date=20240102&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=11857104B2&KC=B2&FT=D&ND=3&date=20240102&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US11857104B2/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  },
  {
    "id": "US11950725B2",
    "publication": "US11950725 (B2)",
    "corpus": "etienne-crozier-only",
    "filter": "industrial",
    "title": "PORTION DISPENSER FOR DISPENSING PORTIONED BEVERAGE ITEMS",
    "abstract": "[0001] The invention relates to a portion dispenser (2) for dispensing beverage items (8) from an exchangeable cartridge (3) comprising: a frame (4) with a receiving portion (5) for receiving the exchangeable cartridge, a discharge opening (6) next to the receiving portion (5) and sized for allowing a beverage item to be individually discharged by gravity from the 5 exchangeable cartridge, a moving means assembly (16) comprising a moving means (19) and a moving means housing (20) in which the moving means are arranged for moving therein, wherein the moving means (19) are arranged for providing a discharge chamber (23) for discharge of at least one beverage item therein and for transporting to a dispensing area (17) and wherein the moving means assembly (16) is arranged for sealingly 10 connecting with the exchangeable cartridge (3) and comprises means for opening the exchangeable cartridge to allow the discharge of the beverage item in the discharge chamber and for re-closing the exchangeable cartridge.",
    "date": "2024-04-09",
    "priorityDate": "2017-12-22",
    "inventors": "CROZIER ETIENNE [CH]; ROMAND DAMIEN [FR]; MAGATTI MARCO [CH]",
    "applicants": "NESTLE SA [CH]",
    "secondaryInventors": "(Romand, Damien; Crozier, Etienne; Magatti, Marco; Romand, Damien; Crozier, Etienne; Magatti, Marco)",
    "secondaryApplicants": "(SOCIETE DES PRODUITS NESTLE S.A.; SOCIETE DES PRODUITS NESTLE S.A.)",
    "classification": "Classification: - internationale A47J31/40; B65D83/04 - coopérative A47J31/3642 (EP, KR); A47J31/407 (US); B65D83/0409 (US); G07F11/04 (EP, KR)",
    "applicationNumber": "Numéro de demande US201816956280 20181219 Dossier global",
    "priorityNumbers": "Numéro(s) de priorité: EP20170210546 20171222 ; WO2018EP85715 20181219 ;",
    "alsoPublishedAs": "Également publié en tant que: AU2018390790 (A1) AU2018390790 (B2) BR112020010225 (A2) CA3086622 (A1) CN111511257 (A) plus AU2018390790 (A1) AU2018390790 (B2) BR112020010225 (A2) CA3086622 (A1) CN111511257 (A) CN111511257 (B) EP3501346 (A1) EP3501346 (B1) EP3727103 (A1) EP3727103 (B1) ES2824508 (T3) JP2021506416 (A) JP7305644 (B2) KR20200097692 (A) PT3501346 (T) RU2020119060 (A) RU2020119060 (A3) TW201929751 (A) US2021076866 (A1) WO2019121832 (A1) moins",
    "publicationAliases": [
      "AU2018390790A1",
      "AU2018390790B2",
      "BR112020010225A2",
      "CA3086622A1",
      "CN111511257A",
      "CN111511257B",
      "EP3501346A1",
      "EP3501346B1",
      "EP3727103A1",
      "EP3727103B1",
      "ES2824508T3",
      "JP7305644B2",
      "JP2021506416A",
      "KR20200097692A",
      "PT3501346T",
      "RU2020119060A",
      "RU2020119060A3",
      "TW201929751A",
      "US11950725B2",
      "US2021076866A1",
      "US20210076866A1",
      "WO2019121832A1"
    ],
    "publicationHeader": "Données bibliographiques: US11950725 (B2) ― 2024-04-09",
    "tags": [
      "NESTLE SA",
      "A47J31/40",
      "2024"
    ],
    "coverImage": "/assets/patents/US11950725B2/images/rendered_mosaic_page_001_drawing_01.png",
    "images": [
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_001_drawing_01.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_001_drawing_02.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_001_drawing_03.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_001_drawing_04.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_001_drawing_05.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_001_drawing_06.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001 drawing 06",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_002_drawing_01.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 01",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_002_drawing_02.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 02",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_002_drawing_03.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 03",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_002_drawing_04.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 04",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_002_drawing_05.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 05",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/images/rendered_mosaic_page_002_drawing_06.png",
        "pdfHref": "/assets/patents/US11950725B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002 drawing 06",
        "kind": "mosaic"
      }
    ],
    "pdfs": [
      {
        "href": "/assets/patents/US11950725B2/pdfs/mosaic_page_001.pdf",
        "label": "mosaic page 001",
        "kind": "mosaic"
      },
      {
        "href": "/assets/patents/US11950725B2/pdfs/mosaic_page_002.pdf",
        "label": "mosaic page 002",
        "kind": "mosaic"
      }
    ],
    "links": {
      "biblio": "https://worldwide.espacenet.com/patent/search/family/060813659/publication/US11950725B2?q=Etienne%20Crozier",
      "description": "https://worldwide.espacenet.com/publicationDetails/description?CC=US&NR=11950725B2&KC=B2&FT=D&ND=3&date=20240409&DB=&locale=fr_EP",
      "claims": "https://worldwide.espacenet.com/publicationDetails/claims?CC=US&NR=11950725B2&KC=B2&FT=D&ND=3&date=20240409&DB=&locale=fr_EP",
      "mosaics": "https://worldwide.espacenet.com/publicationDetails/mosaics?CC=US&NR=11950725B2&KC=B2&FT=D&ND=3&date=20240409&DB=&locale=fr_EP",
      "originalDocument": "https://worldwide.espacenet.com/publicationDetails/originalDocument?CC=US&NR=11950725B2&KC=B2&FT=D&ND=3&date=20240409&DB=&locale=fr_EP",
      "citedDocuments": "https://worldwide.espacenet.com/publicationDetails/citedDocuments?CC=US&NR=11950725B2&KC=B2&FT=D&ND=3&date=20240409&DB=&locale=fr_EP",
      "citingDocuments": "https://worldwide.espacenet.com/publicationDetails/citingDocuments?CC=US&NR=11950725B2&KC=B2&FT=D&ND=3&date=20240409&DB=&locale=fr_EP",
      "legalStatus": "https://worldwide.espacenet.com/publicationDetails/inpadoc?CC=US&NR=11950725B2&KC=B2&FT=D&ND=3&date=20240409&DB=&locale=fr_EP",
      "inpadocFamily": "https://worldwide.espacenet.com/publicationDetails/inpadocPatentFamily?CC=US&NR=11950725B2&KC=B2&FT=D&ND=3&date=20240409&DB=&locale=fr_EP"
    },
    "detailPath": "/assets/patents/US11950725B2/detail.json",
    "verification": {
      "source": "",
      "extractedAt": ""
    }
  }
];

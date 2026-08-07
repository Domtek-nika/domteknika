export type ProjectSectorKey =
  | "mobility"
  | "household"
  | "medical"
  | "watchmaking"
  | "building"
  | "sport"
  | "others";

export type RelatedPatent = {
  patentId: string;
  publication: string;
  title: string;
  note: string;
};

export type Project = {
  id: string;
  hiddenFromCatalog?: boolean;
  category: string;
  filter?: ProjectSectorKey;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery?: string[];
  tags: string[];
  overview: string;
  scope?: string[];
  relatedPatents?: RelatedPatent[];
};

export type ProjectCardSummary = Pick<
  Project,
  "category" | "description" | "id" | "image" | "imageAlt" | "tags" | "title"
>;

export type ProjectLink = ProjectCardSummary;

export function getProjectCardImageFitClass(projectId: string) {
  return projectId === "velum-sky-screen"
    ? "object-cover object-[50%_52%]"
    : "object-contain";
}

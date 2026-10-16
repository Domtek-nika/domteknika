import { getImageProps } from "next/image";

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** Prioritize the desktop hero without downloading an invisible image on mobile. */
export function DesktopHeroImage({
  src,
  sizes,
  className,
}: {
  src: string;
  sizes: string;
  className?: string;
}) {
  const {
    props: { srcSet, ...imageProps },
  } = getImageProps({
    src,
    alt: "",
    fill: true,
    sizes,
    className,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={srcSet} sizes={sizes} />
      {/* getImageProps supplies Next's responsive URLs; picture selects them natively. */}
      <img {...imageProps} src={TRANSPARENT_PIXEL} alt="" />
    </picture>
  );
}

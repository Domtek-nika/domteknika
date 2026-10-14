// Shared by project and patent cards linking to each other.
export const RELATED_CARD_MOTION_CLASS =
  "relative z-0 origin-center transform-gpu transition-[scale,box-shadow,border-color] duration-[1100ms] will-change-transform hover:z-10 hover:scale-[1.025] hover:border-brand/25 hover:shadow-[0_16px_34px_rgba(0,0,0,0.15)] active:border-brand focus-visible:z-10 focus-visible:scale-[1.025] focus-visible:border-brand focus-visible:shadow-[0_16px_34px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-brand motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 [transition-timing-function:var(--ease-smooth)]";

// A border overlay stays visible above an embedded card's image without adding size.
export const RELATED_CARD_EMBEDDED_OUTLINE_CLASS =
  "after:pointer-events-none after:absolute after:inset-0 after:z-20 after:border after:border-transparent after:transition-[border-color] after:duration-[1100ms] after:content-[''] hover:after:border-brand/25 active:after:border-brand focus-visible:after:border-brand motion-reduce:after:transition-none after:[transition-timing-function:var(--ease-smooth)]";

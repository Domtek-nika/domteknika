import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export { Link } from "./link";

/**
 * Typed navigation helpers bound to the routing config.
 * Use these `<Link>` / `useRouter` / `usePathname` / `redirect` instead of the
 * ones from `next/navigation` so locale prefixes are handled automatically.
 */
const navigation = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = navigation;

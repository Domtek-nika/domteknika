import { createNavigation } from "next-intl/navigation";
import { createElement, type ComponentProps } from "react";
import { routing } from "./routing";

/**
 * Typed navigation helpers bound to the routing config.
 * Use these `<Link>` / `useRouter` / `usePathname` / `redirect` instead of the
 * ones from `next/navigation` so locale prefixes are handled automatically.
 */
const navigation = createNavigation(routing);
const pageNavigationTypes = ["page-navigation"];

export const { redirect, usePathname, useRouter, getPathname } = navigation;

export function Link(props: ComponentProps<typeof navigation.Link>) {
  // Tag actual navigation so filters and background updates do not fade the page.
  return createElement(navigation.Link, {
    ...props,
    transitionTypes: props.transitionTypes ?? pageNavigationTypes,
  });
}

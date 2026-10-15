import { createNavigation } from "next-intl/navigation";
import { createElement, Fragment, type ComponentProps } from "react";
import { LinkNavigationProgress } from "@/components/layout/navigation-progress";
import { routing } from "./routing";

/**
 * Typed navigation helpers bound to the routing config.
 * Use these `<Link>` / `useRouter` / `usePathname` / `redirect` instead of the
 * ones from `next/navigation` so locale prefixes are handled automatically.
 */
const navigation = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = navigation;

export function Link(props: ComponentProps<typeof navigation.Link>) {
  const { children, ...linkProps } = props;
  return createElement(
    navigation.Link,
    linkProps,
    createElement(Fragment, null, children, createElement(LinkNavigationProgress)),
  );
}

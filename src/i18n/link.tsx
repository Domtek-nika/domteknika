"use client";

import { createNavigation } from "next-intl/navigation";
import { type ComponentProps } from "react";
import { LinkNavigationProgress } from "@/components/layout/navigation-progress";
import { routing } from "./routing";

const navigation = createNavigation(routing);

// Keep this wrapper on the client: Base UI injects a rendered button's children
// here. Resolving it on the server freezes an empty label in the route payload.
export function Link({ children, ...props }: ComponentProps<typeof navigation.Link>) {
  return (
    <navigation.Link {...props}>
      {children}
      <LinkNavigationProgress />
    </navigation.Link>
  );
}

"use client";

import type { ReactNode } from "react";
import { readProjectReturn } from "./project-return.mjs";

export function ProjectBackLink({ slug, className, children }: { slug: string; className?: string; children: ReactNode }) {
  return <a href={`/#project-${slug}`} className={className} onClick={event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try {
      const saved = readProjectReturn(sessionStorage);
      if (saved) {
        event.preventDefault();
        window.location.assign(`/?projectReturn=1#${saved.anchor}`);
      }
    } catch { /* Direct entry keeps the native project anchor. */ }
  }}>{children}</a>;
}

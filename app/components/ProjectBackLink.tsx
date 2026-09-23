"use client";

import type { ReactNode } from "react";

export function ProjectBackLink({ slug, className, children }: { slug: string; className?: string; children: ReactNode }) {
  return <a href={`/#project-${slug}`} className={className} onClick={event => {
    // Preserve normal new-tab behavior and keep a working anchor fallback for
    // direct arrivals, unavailable referrers, and in-page case-study history.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || location.hash || history.length < 2) return;
    try {
      const from = new URL(document.referrer);
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (from.origin === location.origin && from.pathname === "/" && navigation?.type === "navigate") {
        event.preventDefault();
        history.back();
      }
    } catch { /* Direct entry keeps the native project anchor. */ }
  }}>{children}</a>;
}

"use client";

import { useLayoutEffect } from "react";
import { PROJECT_RETURN_KEY, readProjectReturn, projectReturnY } from "./project-return.mjs";

export function ProjectPosition() {
  useLayoutEffect(() => {
    const remember = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="/projects/"]');
      if (!link) return;
      const card = link.closest<HTMLElement>('.project-summary');
      const anchor = card?.id || 'projects';
      const element = document.getElementById(anchor);
      try {
        sessionStorage.setItem(PROJECT_RETURN_KEY, JSON.stringify({
          anchor, y: window.scrollY, offset: element?.getBoundingClientRect().top ?? 0
        }));
      } catch { /* The native project anchor still works when storage is blocked. */ }
    };
    document.addEventListener('click', remember, true);

    let active = true;
    const stop = () => { active = false; };
    const url = new URL(window.location.href);
    if (url.searchParams.has('projectReturn')) {
      let saved = null;
      try { saved = readProjectReturn(sessionStorage); } catch { /* Storage disabled. */ }
      const restore = () => {
        if (!active) return;
        const anchor = document.getElementById(saved?.anchor || location.hash.slice(1) || 'projects');
        const top = anchor ? anchor.getBoundingClientRect().top + window.scrollY : undefined;
        window.scrollTo({ top: saved ? projectReturnY(saved, top) : (top ?? 0), behavior: 'instant' });
      };
      restore();
      // Local fonts can change the heights above the projects after hydration.
      document.fonts.ready.then(restore);
      window.addEventListener('wheel', stop, { passive: true });
      window.addEventListener('touchstart', stop, { passive: true });
      window.addEventListener('keydown', stop);
      url.searchParams.delete('projectReturn');
      history.replaceState(history.state, '', url.pathname + url.search + url.hash);
    }
    return () => {
      active = false;
      document.removeEventListener('click', remember, true);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
  }, []);
  return null;
}

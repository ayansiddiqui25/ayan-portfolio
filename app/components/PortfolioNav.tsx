"use client";

import { useEffect, useState } from "react";
import { ActionLink } from "./ActionLink";
import { isPenaltyNavHidden } from "./penalty-motion.mjs";

export function PortfolioNav() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const story = document.querySelector<HTMLElement>(".penalty-story");
    const hero = document.querySelector<HTMLElement>(".field-hero");
    if (!story || !hero) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = story.getBoundingClientRect();
      setHidden(isPenaltyNavHidden(rect.top, rect.height, hero.offsetHeight, innerHeight, media.matches));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(story);
    observer.observe(hero);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    media.addEventListener("change", schedule);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);
  return <nav className={`site-nav${hidden ? " site-nav--hidden" : ""}`} aria-label="Portfolio navigation" aria-hidden={hidden || undefined} inert={hidden}>
    <a className="site-nav__home" href="#overview" aria-label="Ayan Siddiqui FC home">
      <span className="site-nav__brand"><img src="/game-assets/ayan-retro-portrait.png" alt="" width="64" height="64" /></span>
      <span className="site-nav__identity">Ayan Siddiqui<span>Engineering portfolio</span></span>
    </a>
    <div className="site-nav__links"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></div>
    <ActionLink className="nav-work" href="#projects" compact>View work</ActionLink>
  </nav>;
}

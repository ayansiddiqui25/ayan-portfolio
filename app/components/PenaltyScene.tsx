"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DURATION, penaltyAt, scrollPenaltyTime } from "./penalty-motion.mjs";

const keeperFrames = ["keeper-ready.png", "keeper-launch.png", "keeper-airborne.png", "keeper-stretch.png", "keeper-landed.png"];

export function PenaltyScene() {
  const root = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let ready = false;
    const story = root.current?.closest<HTMLElement>(".penalty-story");
    const hero = root.current?.closest<HTMLElement>(".field-hero");
    if (!story || !hero) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      frame = 0;
      if (cancelled) return;
      const height = hero.offsetHeight;
      const viewport = window.innerHeight;
      story.style.setProperty("--hero-height", `${height}px`);
      story.style.setProperty("--pin-top", `${Math.min(0, viewport - height)}px`);
      if (!ready) return;
      const rect = story.getBoundingClientRect();
      setTime(media.matches ? DURATION : scrollPenaltyTime(rect.top, rect.height, height, viewport));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    // Scroll is the only clock. Stopping holds the pose; scrolling up reverses it.
    const observer = new ResizeObserver(schedule);
    observer.observe(hero);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    media.addEventListener("change", schedule);
    schedule();
    // Decode every pose before applying the current scroll position.
    const assets = ["stadium-field-v2.png", "siddiqui-kick-sheet.png", "ball.png", ...keeperFrames];
    Promise.all(assets.map((file) => {
      const img = new Image();
      img.src = `/game-assets/${file}`;
      return img.decode().catch(() => undefined);
    })).then(() => {
      if (!cancelled) { ready = true; schedule(); }
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);

  const motion = penaltyAt(time);
  const vars = {
    "--player-x": `${motion.player.x}%`, "--player-y": `${motion.player.y}%`,
    "--keeper-x": `${motion.keeper.x}%`, "--keeper-y": `${motion.keeper.y}%`,
    "--keeper-width": `${motion.keeper.width}%`,
    "--ball-x": `${motion.ball.x}%`, "--ball-y": `${motion.ball.y}%`,
    "--ball-scale": motion.ball.scale, "--ball-spin": `${motion.ball.rotation}deg`,
  } as CSSProperties;

  return (
    <div className="penalty-stage" ref={root}>
      <div className="penalty-world" style={vars} role="img" aria-label="Siddiqui takes a penalty into the right side of the goal while the goalkeeper dives left and lands on the grass.">
        <img className="penalty-field" src="/game-assets/stadium-field-v2.png" alt="" fetchPriority="high" />
        <span className="penalty-shadow penalty-shadow--keeper" style={{ opacity: motion.keeper.shadowOpacity }} />
        <div className="penalty-keeper" aria-hidden="true">
          {keeperFrames.map((file, index) => <img key={file} src={`/game-assets/${file}`} alt="" className={motion.keeper.frame === index ? "is-active" : ""} />)}
        </div>
        <span className="penalty-shadow penalty-shadow--player" />
        <span className={`penalty-player penalty-player--${motion.player.frame}`} aria-hidden="true" />
        <img className="penalty-ball" src="/game-assets/ball.png" alt="" aria-hidden="true" />
      </div>
    </div>
  );
}

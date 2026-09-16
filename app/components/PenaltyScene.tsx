"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DURATION, penaltyAt } from "./penalty-motion.mjs";

const keeperFrames = ["keeper-ready.png", "keeper-launch.png", "keeper-airborne.png", "keeper-stretch.png", "keeper-landed.png"];

export function PenaltyScene() {
  const root = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const [replay, setReplay] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReducedMotion(media.matches); };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let visible = true;
    setTime(0);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .15 });
    if (root.current) observer.observe(root.current);
    const animate = (now: number) => {
      if (cancelled) return;
      const delta = last ? Math.min(50, now - last) : 0;
      last = now;
      if (visible && !document.hidden && !pausedRef.current) {
        elapsed = Math.min(DURATION, elapsed + delta);
        setTime(elapsed);
      }
      if (elapsed < DURATION) frame = requestAnimationFrame(animate);
    };
    // Decode all poses before the clock starts to prevent missing-frame flashes.
    const assets = ["stadium-field-v2.png", "siddiqui-kick-sheet.png", "ball.png", ...keeperFrames];
    Promise.all(assets.map((file) => {
      const img = new Image();
      img.src = `/game-assets/${file}`;
      return img.decode().catch(() => undefined);
    })).then(() => {
      if (!cancelled && (!window.matchMedia("(prefers-reduced-motion: reduce)").matches || replay > 0)) frame = requestAnimationFrame(animate);
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); observer.disconnect(); };
  }, [replay, reducedMotion]);

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
      <button className="penalty-control" onClick={() => {
        if (motion.finished || (reducedMotion && time === 0)) { setPaused(false); setReplay((n) => n + 1); }
        else setPaused((value) => !value);
      }}>
        {motion.finished ? "Replay kick ↺" : reducedMotion && time === 0 ? "Play kick ▷" : paused ? "Play ▷" : "Pause Ⅱ"}
      </button>
    </div>
  );
}

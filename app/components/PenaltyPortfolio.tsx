"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const routes = [
  { id: "tl", label: "Experience", path: "/experience", corner: "Top left" },
  { id: "tr", label: "Projects", path: "/projects", corner: "Top right" },
  { id: "bl", label: "About me", path: "/about", corner: "Bottom left" },
  { id: "br", label: "Off the pitch", path: "/hobbies", corner: "Bottom right" },
] as const;

type ShotId = (typeof routes)[number]["id"];
type Phase = "idle" | "shooting" | "goal" | "leaving";

const fanColors = ["#ff4f45", "#ffc83d", "#2d65f2", "#d6ff3f", "#f3f0db"];
const skinColors = ["#7a492f", "#a86442", "#d69062", "#efba88", "#5a3526"];

export function PenaltyPortfolio() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [shot, setShot] = useState<ShotId | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const timers = useRef<number[]>([]);

  const selectedRoute = routes.find((route) => route.id === shot);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => activeTimers.forEach(window.clearTimeout);
  }, []);

  const cheer = () => {
    if (!soundOn) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(220, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + .12);
    gain.gain.setValueAtTime(.04, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .35);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + .35);
  };

  const shoot = (id: ShotId) => {
    if (phase !== "idle") return;
    const route = routes.find((item) => item.id === id);
    if (!route) return;

    setShot(id);
    setPhase("shooting");
    cheer();
    timers.current.push(
      window.setTimeout(() => setPhase("goal"), 1080),
      window.setTimeout(() => setPhase("leaving"), 1740),
      window.setTimeout(() => router.push(route.path), 2250),
    );
  };

  const keeperDirection =
    shot?.endsWith("l") ? "right" : shot?.endsWith("r") ? "left" : "";

  return (
    <main className="game-shell">
      <header className="hero-masthead">
        <span className="hero-masthead__league">The Portfolio Cup · Final</span>
        <h1>AYAN SIDDIQUI FC</h1>
        <p>Pick a corner.</p>
        <div className="brand-lockup">
          <span className="brand-lockup__crest" aria-hidden="true">AS</span>
          <div>
            <strong>Ayan Siddiqui FC</strong>
            <span>Creative developer · #10</span>
          </div>
        </div>
        <div className="scoreboard" aria-label="Portfolio match scoreboard">
          <div className="scoreboard__top">
            <span>90:00</span>
            <span>Portfolio Cup</span>
            <span>Final</span>
          </div>
          <div className="scoreboard__score">YOU 0 — 0 NEXT</div>
        </div>
      </header>

      <div className="stadium" aria-hidden="true">
        <div className="sky" />
        <div className="floodlight floodlight--left">
          <span className="floodlight__panel" />
          <span className="floodlight__tower" />
        </div>
        <div className="floodlight floodlight--right">
          <span className="floodlight__panel" />
          <span className="floodlight__tower" />
        </div>
        <div className="stands">
          <div className="fans">
            {Array.from({ length: 84 }, (_, index) => (
              <span
                className="fan"
                key={index}
                style={{
                  "--fan-shirt": fanColors[index % fanColors.length],
                  "--fan-skin": skinColors[(index * 3) % skinColors.length],
                  "--fan-delay": `${(index % 7) * -0.09}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className="ad-board">
          <span>Ayan Siddiqui FC</span>
          <span>Design · Build · Ship</span>
          <span>Choose your next move</span>
        </div>
        <div className="pitch" />
      </div>

      <section className="game-stage" aria-label="Interactive penalty kick navigation">
        <div className="goal">
          <img
            className="goal__art"
            src="/game-assets/goal-net.png"
            alt=""
            draggable={false}
          />
          {routes.map((route) => (
            <button
              className={`target target--${route.id}`}
              disabled={phase !== "idle"}
              key={route.id}
              onClick={() => shoot(route.id)}
              aria-label={`Shoot ${route.corner} to open ${route.label}`}
            >
              <img
                className="target__art"
                src="/game-assets/corner-target.png"
                alt=""
                draggable={false}
              />
              <span className="target__label">{route.label}</span>
            </button>
          ))}
        </div>

        <img
          src="/game-assets/goalkeeper.png"
          alt="Pixel goalkeeper diving across the goal"
          draggable={false}
          className={`goalkeeper ${
            keeperDirection ? `goalkeeper--dive-${keeperDirection}` : ""
          }`}
        />
        <img
          src="/game-assets/ball.png"
          alt="Pixel soccer ball"
          draggable={false}
          className={`ball ${shot ? `ball--${shot} ball--shot` : ""}`}
        />
        <img
          src="/game-assets/penalty-taker.png"
          alt="Pixel soccer player wearing number 10"
          draggable={false}
          className={`player ${phase !== "idle" ? "player--kick" : ""}`}
        />

        <div className="intro-card">
          <span className="intro-card__eyebrow">Select a glowing target</span>
          <p>Each corner opens a different part of my portfolio.</p>
        </div>
      </section>

      <button
        className="sound-toggle"
        onClick={() => setSoundOn((current) => !current)}
        aria-label={`${soundOn ? "Mute" : "Enable"} game sound`}
        aria-pressed={soundOn}
      >
        {soundOn ? "SFX" : "OFF"}
      </button>

      {(phase === "goal" || phase === "leaving") && (
        <div className="goal-call" aria-live="assertive">
          <strong className="goal-call__word">GOAL!</strong>
          <span className="goal-call__route">Opening {selectedRoute?.label}</span>
        </div>
      )}

      {phase === "leaving" && (
        <div className="pixel-wipe" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} style={{ "--i": index } as React.CSSProperties} />
          ))}
        </div>
      )}
    </main>
  );
}

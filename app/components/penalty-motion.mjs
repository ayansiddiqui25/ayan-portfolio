// Coordinates share the generated field's 2:1 plane on every screen size.
export const CONTACT = 1550;
export const DURATION = 3400;
export const SPOT = { x: 71.6, y: 63.9 };
export const BALL_RADIUS = .75;
export const PLAYER_WIDTH = 12;
export const PLAYER_HEIGHT = PLAYER_WIDTH * (1278 / 1230) * 2;
export const TOE = { x: .955, y: .805 };
const clamp = (n) => Math.max(0, Math.min(1, n));
const smooth = (n) => n * n * (3 - 2 * n);

export function scrollPenaltyTime(storyTop, storyHeight, heroHeight, viewportHeight) {
  // Tall mobile intros scroll naturally until the field fits before scrubbing.
  const leadIn = Math.max(0, heroHeight - viewportHeight);
  const distance = Math.max(1, storyHeight - Math.max(heroHeight, viewportHeight));
  const progress = clamp((-storyTop - leadIn) / distance);
  // Skip the former autoplay delay so the first scroll begins the run-up.
  return 600 + progress * (DURATION - 600);
}

export function penaltyAt(ms) {
  const run = smooth(clamp((ms - 600) / (CONTACT - 600)));
  const flight = clamp((ms - CONTACT) / 720);
  const dive = clamp((ms - CONTACT - 90) / 860);
  const settle = clamp((ms - CONTACT - 720) / 520);
  const impact = clamp((ms - CONTACT - 720) / 600);
  const goalIn = smooth(clamp((ms - CONTACT - 800) / 170));
  const goalOut = smooth(clamp((ms - 3080) / 250));
  const contactX = SPOT.x - BALL_RADIUS - TOE.x * PLAYER_WIDTH;
  const contactY = SPOT.y - BALL_RADIUS * 2 - TOE.y * PLAYER_HEIGHT;
  return {
    player: {
      x: contactX - 3.8 * (1 - run),
      y: contactY + 7 * (1 - run),
      frame: ms < 1060 ? 0 : ms < CONTACT - 100 ? 1 : ms < CONTACT + 120 ? 2 : 3,
    },
    ball: {
      x: SPOT.x + 7.8 * flight - .5 * settle,
      y: SPOT.y - BALL_RADIUS * 2 - 29.3 * flight - 5 * Math.sin(Math.PI * flight) + 6.2 * settle,
      scale: 1 - .48 * flight,
      rotation: 540 * flight + 100 * settle,
      landed: settle === 1,
    },
    keeper: {
      x: 71.55 - 9 * smooth(dive),
      y: 26.9 - 3 * Math.sin(Math.PI * dive) + 3.7 * dive,
      width: 8,
      frame: dive === 0 ? 0 : dive < .18 ? 1 : dive < .44 ? 2 : dive < .85 ? 3 : 4,
      shadowOpacity: .27 - .17 * Math.sin(Math.PI * dive),
    },
    finish: {
      net: Math.sin(impact * Math.PI * 3) * Math.pow(1 - impact, 2),
      goalOpacity: goalIn * (1 - goalOut),
      goalLift: (1 - goalIn) * 6,
    },
    finished: ms >= DURATION,
  };
}

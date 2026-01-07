export type EasingFunction = (t: number) => number;

export const easings: Record<string, EasingFunction> = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function normalizeTime(
  currentTime: number,
  startTime: number,
  duration: number
): number {
  return clamp((currentTime - startTime) / duration, 0, 1);
}

export function oscillate(t: number, frequency: number = 1): number {
  return Math.sin(t * frequency * Math.PI * 2) * 0.5 + 0.5;
}

export function pingPong(t: number): number {
  const cycle = t % 2;
  return cycle <= 1 ? cycle : 2 - cycle;
}

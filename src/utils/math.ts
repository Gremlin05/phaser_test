export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  if (min > max) [min, max] = [max, min];
  return Math.min(max, Math.max(min, value));
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.hypot(dx, dy);
}

export function projectileVelocity(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  speed: number,
): { vx: number; vy: number; angle: number; len: number } {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const len = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);

  if (len <= 1e-9 || speed === 0) {
    return { vx: 0, vy: 0, angle, len };
  }

  return { vx: (dx / len) * speed, vy: (dy / len) * speed, angle, len };
}


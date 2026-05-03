import { describe, expect, it } from "vitest";
import { clamp, distance, projectileVelocity } from "./math";

describe("utils/math", () => {
  it("clamp clamps inside range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(999, 0, 10)).toBe(10);
  });

  it("clamp swaps min/max if inverted", () => {
    expect(clamp(5, 10, 0)).toBe(5);
    expect(clamp(-1, 10, 0)).toBe(0);
    expect(clamp(999, 10, 0)).toBe(10);
  });

  it("distance uses hypot", () => {
    expect(distance(0, 0, 3, 4)).toBe(5);
  });

  it("projectileVelocity returns normalized velocity scaled by speed", () => {
    const { vx, vy, len } = projectileVelocity(0, 0, 10, 0, 200);
    expect(len).toBe(10);
    expect(vx).toBe(200);
    expect(vy).toBe(0);
  });

  it("projectileVelocity avoids division by zero at zero distance", () => {
    const { vx, vy, len } = projectileVelocity(10, 10, 10, 10, 200);
    expect(len).toBe(0);
    expect(vx).toBe(0);
    expect(vy).toBe(0);
  });
});


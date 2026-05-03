import { describe, expect, it } from "vitest";
import { keepDistanceAction } from "./ai";

describe("utils/ai", () => {
  it("returns retreat when too close", () => {
    expect(keepDistanceAction(50, 100, 200)).toBe("retreat");
  });

  it("returns approach when too far", () => {
    expect(keepDistanceAction(250, 100, 200)).toBe("approach");
  });

  it("returns hold when inside band", () => {
    expect(keepDistanceAction(150, 100, 200)).toBe("hold");
    expect(keepDistanceAction(100, 100, 200)).toBe("hold");
    expect(keepDistanceAction(200, 100, 200)).toBe("hold");
  });
});


export type KeepDistanceAction = "retreat" | "approach" | "hold";

export function keepDistanceAction(
  distanceToTarget: number,
  minDistance: number,
  maxDistance: number,
): KeepDistanceAction {
  if (distanceToTarget < minDistance) return "retreat";
  if (distanceToTarget > maxDistance) return "approach";
  return "hold";
}


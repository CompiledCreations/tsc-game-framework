export const mouseButtons = ["Left", "Middle", "Right"] as const;
export type MouseButton = (typeof mouseButtons)[number];

export interface Mouse {
  x: number;
  y: number;
}

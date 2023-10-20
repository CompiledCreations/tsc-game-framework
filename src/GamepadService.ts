export const axisNames = ["LX", "LY", "RX", "RY"] as const;
export const buttonNames = [
  "A",
  "B",
  "X",
  "Y",
  "LB",
  "RB",
  "LT",
  "RT",
  "Back",
  "Start",
  "LS",
  "RS",
  "Up",
  "Down",
  "Left",
  "Right",
  "Home",
] as const;

export type AxisName = (typeof axisNames)[number];
export type ButtonName = (typeof buttonNames)[number];

export interface GamepadService {
  isButtonDown(button: ButtonName): boolean;
  isButtonJustDown(button: ButtonName): boolean;
  isButtonJustUp(button: ButtonName): boolean;
  isButtonUp(button: ButtonName): boolean;

  getAxisValue(axis: AxisName): number;
}

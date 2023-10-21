/**
 * Represents a gamepad
 */
export interface Gamepad {
  readonly id: string;

  /**
   * Should be invoked when the gamepad is being removed from the system
   */
  disconnect(): void;

  /**
   * Determine if a button is currently pressed
   *
   * @param button the button to check
   */
  isButtonDown(button: ButtonName): boolean;

  /**
   * Determine if a button was just pressed
   *
   * @param button the button to check
   */
  isButtonJustDown(button: ButtonName): boolean;

  /**
   * Determine if a button was just released
   *
   * @param button the button to check
   */
  isButtonJustUp(button: ButtonName): boolean;

  /**
   * Determine if a button is currently released
   *
   * @param button the button to check
   */
  isButtonUp(button: ButtonName): boolean;

  /**
   * Get the value of an axis
   *
   * @param axis the axis to check
   */
  getAxisValue(axis: AxisName): number;
}

/**
 * Used to query the state of a gamepad axis
 */
export type AxisName = (typeof axisNames)[number];

/**
 * Used to query the state of a gamepad button
 */
export type ButtonName = (typeof buttonNames)[number];

/**
 * The names of the axes on a gamepad
 */
export const axisNames = ["LX", "LY", "RX", "RY"] as const;

/**
 * The names of the buttons on a gamepad
 */
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

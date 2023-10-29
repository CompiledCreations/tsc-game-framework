export const mouseButtons = ["Left", "Middle", "Right"] as const;
export type MouseButton = (typeof mouseButtons)[number];

/**
 * The mouse state
 */
export interface Mouse {
  /**
   * The current horizontal position of the mouse
   */
  x: number;

  /**
   * The current vertical position of the mouse
   */
  y: number;

  /**
   * Check if the given mouse button is currently down
   *
   * @param button the button to check
   * @returns true if the button is down
   */
  isButtonDown(button: MouseButton): boolean;

  /**
   * Check if the given mouse button was just pressed down this frame
   *
   * @param button the button to check
   * @returns true if the button was just pressed down
   */
  isButtonJustDown(button: MouseButton): boolean;

  /**
   * Check if the given mouse button was just released this frame
   *
   * @param button the button to check
   * @returns true if the button was just released
   */
  isButtonJustUp(button: MouseButton): boolean;

  /**
   * Check if the given mouse button is currently up
   *
   * @param button the button to check
   * @returns true if the button is up
   */
  isButtonUp(button: MouseButton): boolean;
}

import { Color } from "./Color";

export interface Renderer {
  /**
   * Color used to fill shapes
   */
  fillColor: Color;

  /**
   * Fill a rectangle with the current fill color
   */
  fillRect(x: number, y: number, width: number, height: number): void;

  /**
   * Save the current state of the renderer
   */
  save(): void;

  /**
   * Restore the last saved state of the renderer
   */
  restore(): void;

  /**
   * Run the given callback and restore its current state when it completes
   */
  withState(callback: () => void): void;

  /**
   * Rotate the current transform by the given angle in radians
   */
  rotate(angleRadians: number): void;

  /**
   * Translate the current transform by the given amount
   */
  translate(x: number, y: number): void;
}

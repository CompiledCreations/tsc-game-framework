import { Color } from "./Color";
import { Texture } from "./Texture";

export interface Renderer {
  /**
   * Color used to fill shapes
   */
  fillColor: Color;

  /**
   * Draw a texture
   *
   * @param texture the texture to draw
   * @param options controls the texture output
   */
  drawTexture(texture: Texture, options: DrawTextureOptions): void;

  /**
   * Fill a rectangle with the current fill color
   */
  fillRect(x: number, y: number, width: number, height: number): void;

  /**
   * Fill a text string with the current fill color
   */
  fillText(text: string, x: number, y: number): void;

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

/**
 * Options for drawing a texture
 */
export type DrawTextureOptions = {
  /**
   * The destination x coordinate
   */
  dx: number;

  /**
   * The destination y coordinate
   */
  dy: number;

  /**
   * The destination width
   *
   * Defaults to the source width when not specified.
   */
  dw?: number;

  /**
   * The destination height
   *
   * Defaults to the source height when not specified.
   */
  dh?: number;

  /**
   * The source x coordinate
   *
   * Defaults to 0 when not specified.
   */
  sx?: number;

  /**
   * The source y coordinate
   *
   * Defaults to 0 when not specified.
   */
  sy?: number;

  /**
   * The source width
   *
   * Defaults to the full texture width minus the sx when not specified.
   */
  sw?: number;

  /**
   * The source height
   *
   * Defaults to the full texture height minus the sy when not specified.
   */
  sh?: number;
};

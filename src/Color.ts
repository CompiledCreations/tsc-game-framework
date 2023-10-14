/**
 * Represents a color with RGBA channels
 *
 * - Color is immutable.
 * - Channel values should be between 0 and 1 but are not enforced (see clamp).
 * - Alpha channel is opacity, 0 is transparent, 1 is opaque.
 */
export class Color {
  /**
   * Initialize a new color with the given RGB values, alpha will be set to 1
   */
  public static rgb(r: number, g: number, b: number): Color {
    return this.rgba(r, g, b, 1);
  }

  /**
   * Initialize a new color with the given RGBA values
   */
  public static rgba(r: number, g: number, b: number, a: number): Color {
    return new Color(r, g, b, a);
  }

  // Color palette
  public static readonly white = Color.rgb(1, 1, 1);
  public static readonly black = Color.rgb(0, 0, 0);
  public static readonly red = Color.rgb(1, 0, 0);
  public static readonly green = Color.rgb(0, 1, 0);
  public static readonly blue = Color.rgb(0, 0, 1);
  public static readonly yellow = Color.rgb(1, 1, 0);
  public static readonly cyan = Color.rgb(0, 1, 1);
  public static readonly magenta = Color.rgb(1, 0, 1);

  /**
   *
   * @param r red channel
   * @param g green channel
   * @param b blue channel
   * @param a alpha channel (opacity)
   */
  public constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number,
    public readonly a: number
  ) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * @returns CSS style string for this color
   */
  public cssStyle(): string {
    return `rgba(${this.r * 255}, ${this.g * 255}, ${this.b * 255}, ${this.a})`;
  }

  /**
   * Clamp all channels between 0 and 1
   *
   * @returns a new color with all channels clamped between 0 and 1
   */
  public clamp(): Color {
    return new Color(
      clamp(this.r),
      clamp(this.g),
      clamp(this.b),
      clamp(this.a)
    );
  }
}

/**
 * Clamps a value to the range 0 to 1
 *
 * @param value the value to clamp
 * @returns the clamped value constrained to the range
 */
function clamp(value: number): number {
  return Math.max(0, Math.min(1, value));
}

import { Color } from "./Color";
import { Renderer } from "./Renderer";

/**
 * HTML5 Canvas implementation of Renderer
 */
export class CanvasRenderer implements Renderer {
  private readonly context: CanvasRenderingContext2D;
  private _fillColor = Color.black;

  /**
   * Initialize a new instance of CanvasRenderer that will renderer to the given context
   *
   * @param context the canvas rendering context to use
   */
  public constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  public get fillColor(): Color {
    return this._fillColor;
  }

  public set fillColor(value: Color) {
    this._fillColor = value;
    this.context.fillStyle = value.cssStyle();
  }

  public fillRect(x: number, y: number, width: number, height: number): void {
    this.context.fillRect(x, y, width, height);
  }

  public save(): void {
    this.context.save();
  }

  public restore(): void {
    this.context.restore();
  }

  public withState(callback: () => void): void {
    try {
      this.save();
      callback();
    } finally {
      this.restore();
    }
  }

  public translate(x: number, y: number): void {
    this.context.translate(x, y);
  }

  public rotate(angleRadians: number): void {
    this.context.rotate(angleRadians);
  }
}

import { GameLoop } from "./GameLoop";
import { Mouse, MouseButton } from "./Mouse";

export class BrowserMouse implements Mouse {
  private _x = 0;
  private _y = 0;

  private buttonsDown = new Set<number>();
  private buttonsJustDown = new Set<number>();
  private buttonsJustUp = new Set<number>();

  /**
   * Initialize a new instance of BrowserMouse
   *
   * @param element the element to report mouse position relative to
   * @param loop the game loop to use for updating
   */
  public constructor(element: HTMLElement, loop: GameLoop) {
    window.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      this._x = Math.round(e.clientX - rect.left);
      this._y = Math.round(e.clientY - rect.top);
    });

    window.addEventListener("mousedown", (e) => {
      this.buttonsDown.add(e.button);
      this.buttonsJustDown.add(e.button);
    });

    window.addEventListener("mouseup", (e) => {
      this.buttonsDown.delete(e.button);
      this.buttonsJustUp.add(e.button);
    });

    loop.onFrameEnd.add(() => {
      this.buttonsJustDown.clear();
      this.buttonsJustUp.clear();
    }, this);
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public isButtonDown(button: MouseButton): boolean {
    return this.buttonsDown.has(buttonIndex(button));
  }

  public isButtonJustDown(button: MouseButton): boolean {
    return this.buttonsJustDown.has(buttonIndex(button));
  }

  public isButtonJustUp(button: MouseButton): boolean {
    return this.buttonsJustUp.has(buttonIndex(button));
  }

  public isButtonUp(button: MouseButton): boolean {
    return !this.buttonsDown.has(buttonIndex(button));
  }
}

/**
 * Convert a mouse button to its index on the device
 *
 * @param button the button to get the index of
 * @returns the index of the requested button
 */
function buttonIndex(button: MouseButton): number {
  const index = buttonMap.get(button)!;
  return index;
}

/**
 * Map mouse buttons to their index on the device
 */
const buttonMap = new Map<MouseButton, number>([
  ["Left", 0],
  ["Middle", 2],
  ["Right", 1],
]);

import { BrowserGamepadService } from "./BrowserGamepadService";
import { AxisName, ButtonName, GamepadService } from "./GamepadService";
import { KeyboardService } from "./KeyboardService";

/**
 * A service for all input-related functionality
 */
export class InputService implements GamepadService, KeyboardService {
  private keysDown = new Set<string>();
  private keysJustDown = new Set<string>();
  private keysJustUp = new Set<string>();

  private gamepadService: BrowserGamepadService | null = null;

  /**
   * Initialize a new instance of InputService
   *
   * @param loop the game loop to use for updating the input state
   */
  public constructor() {
    window.addEventListener("keydown", (e) => {
      this.keysDown.add(e.key);
      if (!e.repeat) {
        this.keysJustDown.add(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keysDown.delete(e.key);
      this.keysJustUp.add(e.key);
    });

    window.addEventListener("gamepadconnected", (e) => {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length
      );

      if (this.gamepadService === null) {
        this.gamepadService = new BrowserGamepadService({
          id: e.gamepad.id,
          index: e.gamepad.index,
        });
      }
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id
      );

      if (e.gamepad.index === this.gamepadService?.index) {
        this.gamepadService = null;
        console.log("Main gamepad disconnected");
      }
    });
  }

  public isKeyDown(key: string): boolean {
    return this.keysDown.has(key);
  }

  public isKeyJustDown(key: string): boolean {
    return this.keysJustDown.has(key);
  }

  public isKeyJustUp(key: string): boolean {
    return this.keysJustUp.has(key);
  }

  public isKeyUp(key: string): boolean {
    return !this.keysDown.has(key);
  }

  public isButtonDown(button: ButtonName): boolean {
    return this.gamepadService?.isButtonDown(button) ?? false;
  }

  public isButtonJustDown(button: ButtonName): boolean {
    return this.gamepadService?.isButtonJustDown(button) ?? false;
  }

  public isButtonJustUp(button: ButtonName): boolean {
    return this.gamepadService?.isButtonJustUp(button) ?? true;
  }

  public isButtonUp(button: ButtonName): boolean {
    return this.gamepadService?.isButtonUp(button) ?? true;
  }

  public getAxisValue(axis: AxisName): number {
    if (this.gamepadService) {
      return this.gamepadService.getAxisValue(axis);
    }

    return 0.0;
  }

  /**
   * Update the input state
   *
   * This should be called once per frame after the frame completes.
   *
   * @internal
   */
  public update(): void {
    this.keysJustDown.clear();
    this.keysJustUp.clear();
    this.gamepadService?.update();
  }
}

/**
 * The default input service exported by the library
 */
export const Input = new InputService();

import { AxisName, ButtonName, GamepadService } from "./GamepadService";
import { KeyboardService } from "./KeyboardService";

/**
 * A service for all input-related functionality
 */
export class InputService implements GamepadService, KeyboardService {
  private keysDown = new Set<string>();
  private keysJustDown = new Set<string>();
  private keysJustUp = new Set<string>();

  private buttonsDown = new Set<ButtonName>();
  private buttonsJustDown = new Set<ButtonName>();
  private buttonsJustUp = new Set<ButtonName>();

  private mainPadID: { index: number; id: string } | null = null;

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

      if (this.mainPad === null) {
        this.mainPadID = { id: e.gamepad.id, index: e.gamepad.index };
      }
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id
      );

      if (e.gamepad.index === this.mainPadID?.index) {
        this.mainPadID = null;
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
    return this.buttonsDown.has(button);
  }

  public isButtonJustDown(button: ButtonName): boolean {
    return this.buttonsJustDown.has(button);
  }

  public isButtonJustUp(button: ButtonName): boolean {
    return this.buttonsJustUp.has(button);
  }

  public isButtonUp(button: ButtonName): boolean {
    return !this.isButtonDown(button);
  }

  public getAxisValue(axis: AxisName): number {
    const mainPad = this.mainPad;
    if (!mainPad) {
      return 0.0;
    }

    const rawValue = mainPad.axes[axes.get(axis)!];
    if (Math.abs(rawValue) < deadZone) {
      return 0.0;
    }

    return rawValue;
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
    this.updateGamepadState();
  }

  private get mainPad(): Gamepad | null {
    if (!this.mainPadID) {
      return null;
    }

    return navigator.getGamepads()[this.mainPadID.index];
  }

  private updateGamepadState(): void {
    const mainPad = this.mainPad;
    if (!mainPad) {
      return;
    }

    this.buttonsJustDown.clear();
    this.buttonsJustUp.clear();

    for (const [button, index] of buttons) {
      const wasPressed = this.buttonsDown.has(button);
      if (mainPad.buttons[index].pressed) {
        if (!wasPressed) {
          this.buttonsDown.add(button);
          this.buttonsJustDown.add(button);
        }
      } else if (wasPressed) {
        this.buttonsDown.delete(button);
        this.buttonsJustUp.add(button);
      }
    }
  }
}

/**
 * The default input service exported by the library
 */
export const Input = new InputService();

const buttons = new Map<ButtonName, number>([
  ["A", 0],
  ["B", 1],
  ["X", 2],
  ["Y", 3],
  ["LB", 4],
  ["RB", 5],
  ["LT", 6],
  ["RT", 7],
  ["Back", 8],
  ["Start", 9],
  ["LS", 10],
  ["RS", 11],
  ["Up", 12],
  ["Down", 13],
  ["Left", 14],
  ["Right", 15],
  ["Home", 16],
]);

const deadZone = 0.1;
const axes = new Map<AxisName, number>([
  ["LX", 0],
  ["LY", 1],
  ["RX", 2],
  ["RY", 3],
]);

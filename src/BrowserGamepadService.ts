import { AxisName, ButtonName, GamepadService } from "./GamepadService";

export class BrowserGamepadService implements GamepadService {
  private buttonsDown = new Set<ButtonName>();
  private buttonsJustDown = new Set<ButtonName>();
  private buttonsJustUp = new Set<ButtonName>();

  public constructor(private padID: { index: number; id: string }) {}

  public get id(): string {
    return this.padID.id;
  }

  public get index(): number {
    return this.padID.index;
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
    const rawValue = this.pad.axes[axes.get(axis)!];
    if (Math.abs(rawValue) < deadZone) {
      return 0.0;
    }

    return rawValue;
  }

  public update(): void {
    const pad = this.pad;

    this.buttonsJustDown.clear();
    this.buttonsJustUp.clear();

    for (const [button, index] of buttons) {
      const wasPressed = this.buttonsDown.has(button);
      if (pad.buttons[index].pressed) {
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

  private get pad(): Gamepad {
    return navigator.getGamepads()[this.padID!.index]!;
  }
}

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

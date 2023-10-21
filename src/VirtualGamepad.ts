import { AxisName, ButtonName, Gamepad } from "./Gamepad";

/**
 * A virtual gamepad that can be used for testing
 */
export class VirtualGamepad implements Gamepad {
  private buttonsDown = new Set<ButtonName>();
  private buttonsJustDown = new Set<ButtonName>();
  private buttonsJustUp = new Set<ButtonName>();
  private axes = new Map<AxisName, number>();

  public get id(): string {
    return "virtual";
  }

  public disconnect(): void {
    // Do nothing
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

  public getAxisValue(_axis: AxisName): number {
    return 0;
  }

  public update(): void {
    this.buttonsJustDown.clear();
    this.buttonsJustUp.clear();
  }

  public pressButton(button: ButtonName): void {
    this.buttonsDown.add(button);
    this.buttonsJustDown.add(button);
  }

  public releaseButton(button: ButtonName): void {
    this.buttonsDown.delete(button);
    this.buttonsJustUp.add(button);
  }

  public setAxisValue({
    axis,
    value,
  }: {
    axis: AxisName;
    value: number;
  }): void {
    this.axes.set(axis, value);
  }
}

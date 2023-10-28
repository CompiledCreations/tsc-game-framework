import { ReadableSignal, Signal } from "micro-signals";

import { BrowserGamepad } from "./BrowserGamepad";
import { UpdateInfo } from "./GameLoop";
import { Gamepad } from "./Gamepad";
import { InputService } from "./InputService";
import { Mouse } from "./Mouse";
import { VirtualGamepad } from "./VirtualGamepad";

export class BrowserInputService implements InputService {
  private _onUpdate = new Signal<{ dt: number }>();

  private _gamepad: Gamepad;
  private _gamepads = new Map<string, Gamepad>();
  private _mouse: Mouse = { x: 0, y: 0 };

  private keysDown = new Set<string>();
  private keysJustDown = new Set<string>();
  private keysJustUp = new Set<string>();

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

    // Create the virtual gamepad and make it the main gamepad
    this._gamepads.set("virtual", new VirtualGamepad());
    this._gamepad = this._gamepads.get("virtual")!;

    // Listen for physical gamepad connections
    window.addEventListener("gamepadconnected", (e) => {
      this.addGamepad(
        new BrowserGamepad({
          id: e.gamepad.id,
          index: e.gamepad.index,
        })
      );
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      this.removeGamepad(e.gamepad.id);
    });
  }

  public get mouse(): Mouse {
    return this._mouse;
  }

  public get onUpdate(): ReadableSignal<{ dt: number }> {
    return this._onUpdate;
  }

  public get gamepad(): Gamepad {
    return this._gamepad;
  }

  public addGamepad(gamepad: Gamepad): void {
    this._gamepads.set(gamepad.id, gamepad);

    // Prefer a real gamepad over the virtual one
    if (this._gamepad instanceof VirtualGamepad) {
      this._gamepad = gamepad;
    }
  }

  public removeGamepad(id: string): void {
    const gp = this.getGamepad(id);
    gp.disconnect();
    this._gamepads.delete(id);

    // If the current gamepad is being removed then default to a virtual one
    if (id === this._gamepad.id) {
      this._gamepad = this._gamepads.get("virtual") ?? new VirtualGamepad();
    }
  }

  public getGamepads(): Gamepad[] {
    return [...this._gamepads.values()];
  }

  public getGamepad(id: string): Gamepad {
    const gp = this._gamepads.get(id);
    if (!gp) {
      throw new Error(`Gamepad "${id}" is not connected`);
    }

    return gp;
  }

  public setMainGamepad(id: string): void {
    this._gamepad = this.getGamepad(id);
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

  /**
   * Update the input state
   *
   * This should be called once per frame after the frame completes.
   *
   * @internal
   */
  public update(info: UpdateInfo): void {
    this.keysJustDown.clear();
    this.keysJustUp.clear();

    this._onUpdate.dispatch(info);
  }
}

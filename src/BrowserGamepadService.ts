import { BrowserGamepad } from "./BrowserGamepad";
import { GameLoop } from "./GameLoop";
import { Gamepad } from "./Gamepad";
import { GamepadService } from "./GamepadService";
import { VirtualGamepad } from "./VirtualGamepad";

export class BrowserGamepadService implements GamepadService {
  private _gamepad: Gamepad;
  private _gamepads = new Map<string, Gamepad>();

  /**
   * Initialize a new instance of InputService
   *
   * @param loop the game loop to use for updating the input state
   */
  public constructor(loop: GameLoop) {
    // Create the virtual gamepad and make it the main gamepad
    this._gamepads.set("virtual", new VirtualGamepad());
    this._gamepad = this._gamepads.get("virtual")!;

    // Listen for physical gamepad connections
    window.addEventListener("gamepadconnected", (e) => {
      this.addGamepad(
        new BrowserGamepad(
          {
            id: e.gamepad.id,
            index: e.gamepad.index,
          },
          loop
        )
      );
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      this.removeGamepad(e.gamepad.id);
    });
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
}

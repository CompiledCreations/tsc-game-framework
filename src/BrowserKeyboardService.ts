import { GameLoop } from "./GameLoop";
import { KeyboardService } from "./KeyboardService";

export class BrowserKeyboardService implements KeyboardService {
  private keysDown = new Set<string>();
  private keysJustDown = new Set<string>();
  private keysJustUp = new Set<string>();

  /**
   * Initialize a new instance of BrowserKeyboardService
   */
  public constructor(private loop: GameLoop) {
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

    this.loop.onFrameEnd.add(() => {
      this.keysJustDown.clear();
      this.keysJustUp.clear();
    }, this);
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
}

import { GameLoop } from "./GameLoop";
import { KeyboardService } from "./KeyboardService";

/**
 * A service for all input-related functionality
 */
export class InputService implements KeyboardService {
  private keysDown: Set<string> = new Set();
  private keysJustDown: Set<string> = new Set();
  private keysJustUp: Set<string> = new Set();

  /**
   * Initialize a new instance of InputService
   *
   * @param loop the game loop to use for updating the input state
   */
  constructor(private loop: GameLoop = new GameLoop()) {
    window.addEventListener("keydown", (e) => {
      this.keysDown.add(e.key);
      this.keysJustDown.add(e.key);
    });

    window.addEventListener("keyup", (e) => {
      this.keysDown.delete(e.key);
      this.keysJustUp.add(e.key);
    });

    this.loop.addUpdateListener(() => {
      this.keysJustDown.clear();
      this.keysJustUp.clear();
    });
  }

  isKeyDown(key: string): boolean {
    return this.keysDown.has(key);
  }

  isKeyJustDown(key: string): boolean {
    return this.keysJustDown.has(key);
  }

  isKeyJustUp(key: string): boolean {
    return this.keysJustUp.has(key);
  }

  isKeyUp(key: string): boolean {
    return !this.keysDown.has(key);
  }
}

/**
 * The default input service exported by the library
 */
export const Input = new InputService();

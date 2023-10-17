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
  public update(): void {
    this.keysJustDown.clear();
    this.keysJustUp.clear();
  }
}

/**
 * The default input service exported by the library
 */
export const Input = new InputService();

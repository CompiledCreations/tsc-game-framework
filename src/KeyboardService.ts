export interface KeyboardService {
  /**
   * Check if a key is currently held down
   *
   * @param key the key to check
   * @returns true if the key is down
   */
  isKeyDown(key: string): boolean;

  /**
   * Check if a key was pressed down this frame
   *
   * @param key the key to check
   * @returns true if the key was just pressed down
   */
  isKeyJustDown(key: string): boolean;

  /**
   * Check if a key was released this frame
   *
   * @param key the key to check
   * @returns true if the key was just released
   */
  isKeyJustUp(key: string): boolean;

  /**
   * Check if a key is not held down or just down
   *
   * @param key the key to check
   * @returns true if the key is up
   */
  isKeyUp(key: string): boolean;
}

/**
 * Symbol used to lookup the KeyboardService
 */
export const KeyboardService = Symbol("KeyboardService");

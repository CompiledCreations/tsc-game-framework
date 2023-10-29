import { Gamepad } from "./Gamepad";

/**
 * Manages the gamepads connected to the system
 *
 * This includes a main gamepad which is the primary gamepad used for input.
 */
export interface GamepadService {
  /**
   * The main gamepad
   *
   * Can be set with `setMainGamepad` if necessary
   */
  readonly gamepad: Gamepad;

  /**
   * Add a gamepad to the list of connected gamepads
   *
   * @param gamepad the gamepad to add
   */
  addGamepad(gamepad: Gamepad): void;

  /**
   * Remove a previously added gamepad
   *
   * @param id the id of the gamepad to remove
   */
  removeGamepad(id: string): void;

  /**
   * Get the list of connected gamepads
   */
  getGamepads(): Gamepad[];

  /**
   * Get a gamepad by its id
   *
   * @param id the id of the gamepad
   */
  getGamepad(id: string): Gamepad;

  /**
   * Set the main gamepad, can be retrieved through the `gamepad` property
   */
  setMainGamepad(id: string): void;
}

/**
 * Symbol used to lookup the GamepadService
 */
export const GamepadService = Symbol("GamepadService");

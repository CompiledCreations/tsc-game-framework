import { ReadableSignal } from "micro-signals";

export type UpdateInfo = { dt: number };
export type UpdateListenerFunction = (args: UpdateInfo) => void;

/**
 * Game loop represents a continuous loop. To use it, you must register listeners to its signals.
 */
export interface GameLoop {
  /**
   * Whether the game loop is running or not
   */
  isRunning: boolean;

  /**
   * Signal emitted during the update phase of the game loop
   *
   * This is the main update phase of the loop. It is when game logic and rendering should be executed.
   */
  onUpdate: ReadableSignal<UpdateInfo>;

  /**
   * Signal emitted after the update phase of the game loop
   *
   * This is useful for doing clean up required after game logic has been executed.
   */
  onFrameEnd: ReadableSignal<void>;

  /**
   * Start the game loop
   */
  start(): void;

  /**
   * Stop the game loop
   */
  stop(): void;
}

/**
 * Symbol used for looking up the GameLoop
 */
export const GameLoop = Symbol("GameLoop");

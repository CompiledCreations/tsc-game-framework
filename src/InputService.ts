import { ReadableSignal } from "micro-signals";

import { BrowserInputService } from "./BrowserInputService";
import { GamepadService } from "./GamepadService";
import { KeyboardService } from "./KeyboardService";
import { UpdateInfo } from "./GameLoop";

/**
 * A service for all input-related functionality
 */
export interface InputService extends GamepadService, KeyboardService {
  /**
   * Signal dispatched when the input state should be updated
   */
  onUpdate: ReadableSignal<{ dt: number }>;

  /**
   * Update the input state
   *
   * This should be called once per frame after the frame completes.
   *
   * @internal
   */
  update(info: UpdateInfo): void;
}

/**
 * The default input service exported by the library
 */
export const Input: InputService = new BrowserInputService();

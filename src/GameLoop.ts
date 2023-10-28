import { ReadableSignal } from "micro-signals";

export type UpdateInfo = { dt: number };
export type UpdateListenerFunction = (args: UpdateInfo) => void;

export interface GameLoop {
  isRunning: boolean;
  onUpdate: ReadableSignal<UpdateInfo>;
  onFrameEnd: ReadableSignal<void>;

  start(): void;
  stop(): void;
}

/**
 * Symbol used for looking up the GameLoop
 */
export const GameLoop = Symbol("GameLoop");

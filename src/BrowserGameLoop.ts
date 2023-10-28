import { ReadableSignal, Signal } from "micro-signals";
import { GameLoop, UpdateInfo } from "./GameLoop";

export class BrowserGameLoop implements GameLoop {
  private _onUpdate = new Signal<UpdateInfo>();
  private _onFrameComplete = new Signal<void>();
  private lastTime = 0;
  private nextFrame = 0;

  public constructor() {
    this.loop = this.loop.bind(this);
  }

  public get isRunning(): boolean {
    return this.nextFrame !== 0;
  }

  public start(): void {
    this.lastTime = 0;
    this.nextFrame = window.requestAnimationFrame(this.loop);
  }

  public stop(): void {
    window.cancelAnimationFrame(this.nextFrame);
    this.nextFrame = 0;
  }

  public get onUpdate(): ReadableSignal<UpdateInfo> {
    return this._onUpdate;
  }

  public get onFrameEnd(): ReadableSignal<void> {
    return this._onFrameComplete;
  }

  private loop(time: number): void {
    const deltaTime = (time - this.lastTime) / 1000.0;
    this.lastTime = time;

    this._onUpdate.dispatch({ dt: deltaTime });
    this.nextFrame = window.requestAnimationFrame(this.loop);

    this._onFrameComplete.dispatch();
  }
}

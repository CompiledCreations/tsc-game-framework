import { Signal } from "micro-signals";

export type UpdateInfo = { dt: number };
export type UpdateListenerFunction = (args: UpdateInfo) => void;

export class GameLoop {
  private onUpdate = new Signal<UpdateInfo>();
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

  public addUpdateListener(listener: UpdateListenerFunction): void {
    this.onUpdate.add(listener);
  }

  public removeUpdateListener(listener: UpdateListenerFunction): void {
    this.onUpdate.remove(listener);
  }

  private loop(time: number): void {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.onUpdate.dispatch({ dt: deltaTime });
    this.nextFrame = window.requestAnimationFrame(this.loop);
  }
}

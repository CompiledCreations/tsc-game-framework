import { ReadableSignal, Signal } from "micro-signals";

import { GameLoop, UpdateInfo } from "./GameLoop";
import { Renderer } from "./Renderer";
import { ServiceManager } from "./ServiceManager";

/**
 * Game application class
 *
 * This class manages the game loop and dispatches frame lifecycle events.
 *
 * Clients should not extend this class. Instead, they should subscribe to the public signals to implement
 * their behavior.
 */
export class Game {
  public readonly services: ServiceManager;

  private readonly _onDraw = new Signal<DrawEvent>();
  private readonly _onUpdate = new Signal<UpdateEvent>();
  private readonly loop: GameLoop;
  private readonly renderer: Renderer;

  /**
   * Initialize a new instance of Game
   *
   * @param options the game setup options
   */
  public constructor({ renderer, services }: GameOptions) {
    this.renderer = renderer;
    this.services = services;
    this.loop = services.get(GameLoop);
    this.loop.onUpdate.add(this.tick.bind(this));
  }

  /**
   * Signal dispatched when the game should be drawn
   *
   * Clients should listen for this signal and draw to the given renderer.
   */
  public get onDraw(): ReadableSignal<DrawEvent> {
    return this._onDraw;
  }

  /**
   * Signal dispatched when the game should be updated
   *
   * Clients should listen for this signal and update their game state in response. This is
   * where input and other game logic should be processed.
   */
  public get onUpdate(): ReadableSignal<UpdateInfo> {
    return this._onUpdate;
  }

  /**
   * Start running the game loop
   */
  public run() {
    this.loop.start();
  }

  /**
   * Handles a single game loop tick
   *
   * This is called by the game loop and should not be called directly. This where frame
   * lifecycle events are dispatched.
   *
   * @param info the update info from the game loop
   */
  private tick(info: UpdateInfo) {
    this._onUpdate.dispatch({ ...info, game: this });

    this.renderer.withState(() => {
      this._onDraw.dispatch({ ...info, game: this, renderer: this.renderer });
    });
  }
}

/**
 * Game setup options
 */
export type GameOptions = {
  /**
   * Injects the renderer to use for drawing the game
   *
   * This will be emitted with the draw event so that clients can draw to it.
   */
  renderer: Renderer;

  /**
   * Injects the service manager to use for managing services
   */
  services: ServiceManager;
};

/**
 * The base of all game events, provide access to the game instance
 */
export type GameEvent = { game: Game };

/**
 * The event dispatched when the game should be drawn
 */
export type DrawEvent = GameEvent & UpdateInfo & { renderer: Renderer };

/**
 * The event dispatched when the game state should be updated for a frame
 */
export type UpdateEvent = GameEvent & UpdateInfo;

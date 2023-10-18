import { CanvasRenderer } from "./CanvasRenderer";
import { Game } from "./Game";

/**
 * Options for creating a game
 */
export interface CreateGameOptions {
  /**
   * The element to attach the game to
   */
  element: HTMLElement;

  /**
   * The width of the game canvas
   */
  width: number;

  /**
   * The height of the game canvas
   */
  height: number;
}

/**
 * Helper to create a game that uses a canvas renderer.
 *
 * The canvas will be created as a child of the given element and attached to the DOM. The returned
 * game should be run to start the game loop once any signal listeners have been set up.
 *
 * @param options game setup options
 * @returns a game that renders to a canvas
 */
export function createCanvasGame(options: CreateGameOptions) {
  const { element, width, height } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  element.appendChild(canvas);

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Count not create 2d context");
  }

  // Setup the canvas and context for crisp pixels
  canvas.style.imageRendering = "pixelated";
  context.imageSmoothingEnabled = false;

  const game = new Game({ renderer: new CanvasRenderer(context) });

  return game;
}

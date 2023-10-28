import { BrowserMouseService } from "./BrowserMouseService";
import { CanvasRenderer } from "./CanvasRenderer";
import { Game } from "./Game";
import { MouseService } from "./MouseService";

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

  /**
   * Controls the scaling of the canvas in the parent element
   *
   * - `"stretch"`: stretch the canvas to fill the parent element while maintaining aspect ratio
   * - `number`: scale the canvas by the given fixed amount, useful if you want a fixed size with a pixellated look. At 1x the visible canvas will be the same size as the canvas not the size based on the system DPI.
   */
  scale?: number | "stretch";
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
  const { element, scale = 1, width, height } = options;

  const canvas = document.createElement("canvas");
  element.appendChild(canvas);
  canvas.width = width;
  canvas.height = height;

  if (scale === "stretch") {
    setUpStretch(canvas);
  } else {
    // Scale it so that it looks good on high DPI screens
    const physicalPixelScale = (1 / window.devicePixelRatio) * scale;
    canvas.style.width = `${width * physicalPixelScale}px`;
    canvas.style.height = `${height * physicalPixelScale}px`;
  }

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("Count not create 2d context");
  }

  // Setup the canvas and context for crisp pixels
  canvas.style.imageRendering = "pixelated";
  context.imageSmoothingEnabled = false;

  const game = new Game({ renderer: new CanvasRenderer(context) });
  game.services.add(MouseService, new BrowserMouseService(canvas));

  return game;
}

/**
 * Set up a canvas so it stretches to fill its parent element while maintaining aspect ratio
 *
 * @param canvas the canvas to setup
 */
function setUpStretch(canvas: HTMLCanvasElement) {
  const { width, height, parentElement } = canvas;
  if (!parentElement) {
    throw new Error("Canvas must have a parent element");
  }

  const aspectRatio = width / height;

  // Use a resize observer to resize the canvas when the element is resized
  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    if (width / height < aspectRatio) {
      canvas.style.width = "100%";
      canvas.style.height = "auto";
    } else {
      canvas.style.width = "auto";
      canvas.style.height = "100%";
    }
  });
  resizeObserver.observe(parentElement);

  // Stop observing when our canvas is removed from the DOM
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const removedNode of mutation.removedNodes) {
          if (removedNode === canvas) {
            resizeObserver.disconnect();
            observer.disconnect();
            return;
          }
        }
      }
    }
  });

  observer.observe(parentElement, { childList: true });
}

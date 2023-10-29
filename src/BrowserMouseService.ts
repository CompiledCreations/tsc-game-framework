import { BrowserMouse } from "./BrowserMouse";
import { GameLoop } from "./GameLoop";
import { Mouse } from "./Mouse";
import { MouseService } from "./MouseService";

/**
 * A mouse service that uses the browser's mouse events
 */
export class BrowserMouseService implements MouseService {
  private _mouse: Mouse;

  /**
   * Initialize a new instance of BrowserMouseService
   *
   * @param element the element to report mouse position relative to
   * @param loop the game loop to use for updating
   */
  public constructor(element: HTMLElement, loop: GameLoop) {
    this._mouse = new BrowserMouse(element, loop);
  }

  public get mouse(): Mouse {
    return this._mouse;
  }
}

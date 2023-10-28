import { Mouse } from "./Mouse";
import { MouseService } from "./MouseService";

/**
 * A mouse service that uses the browser's mouse events
 */
export class BrowserMouseService implements MouseService {
  private _mouse: Mouse = { x: 0, y: 0 };

  /**
   * Initialize a new instance of BrowserMouseService
   *
   * @param element the element to report mouse position relative to
   */
  public constructor(element: HTMLElement) {
    window.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      this._mouse = { x, y };
    });
  }

  public get mouse(): Mouse {
    return this._mouse;
  }
}

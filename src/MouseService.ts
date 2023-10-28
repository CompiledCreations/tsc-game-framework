import { Mouse } from "./Mouse";

/**
 * Interface for mouse input
 */
export interface MouseService {
  readonly mouse: Mouse;
}

export const MouseService = Symbol("MouseService");

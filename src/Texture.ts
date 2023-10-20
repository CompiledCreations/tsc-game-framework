import { CanvasTexture } from "./CanvasTexture";

/**
 * Interface for texture resources that can be drawn with a renderer
 */
export interface Texture {
  /**
   * Error that occurred while loading the texture
   */
  error: Error | null;

  /**
   * Whether or not the texture is loaded
   */
  isLoaded: boolean;

  /**
   * Image data for the texture
   */
  image: ImageBitmap;
}

/**
 * Texture loading and creation helpers
 */
export const Texture = {
  load: (source: string): Texture => {
    return CanvasTexture.load(source);
  },
};

import { Texture } from "./Texture";

/**
 * A texture that can be drawn to a canvas
 */
export class CanvasTexture implements Texture {
  /**
   * Create a new texture that loads its data from the given source
   *
   * Loading is asynchronous, so the texture will not be immediately available.
   * Use the `isLoaded` property to check if the texture is ready.
   *
   * @param source the source to create the texture from
   * @returns texture created with the source
   */
  public static load(source: string): Texture {
    const texture = new CanvasTexture();
    texture.load(source);
    return texture;
  }

  private _error: Error | null = null;
  private _image: ImageBitmap | null = null;

  public constructor(image?: ImageBitmap) {
    if (image) {
      this._image = image;
    }
  }

  public get error(): Error | null {
    return this._error;
  }

  public get image(): ImageBitmap {
    if (!this._image) {
      throw new Error("Texture not loaded");
    }

    return this._image;
  }

  public get isLoaded(): boolean {
    return !!this._image;
  }

  private load(source: string): void {
    const image = new Image();
    image.src = source;
    image.onload = () => {
      createImageBitmap(image).then((bitmap) => {
        this._image = bitmap;
      });
    };

    image.onerror = () => {
      this._error = new Error(`Failed to load image: ${source}`);
    };
  }
}

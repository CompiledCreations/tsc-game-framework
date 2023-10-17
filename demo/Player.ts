import { Color, Input, Renderer } from "../src";

export class Player {
  public position = { x: 0, y: 0 };
  public velocity = { x: 0, y: 0 };
  public gravity = 800;

  public update(dt: number): void {
    const speed = 100;
    this.velocity.x = 0;
    if (Input.isKeyDown("ArrowLeft")) {
      this.velocity.x = -speed;
    } else if (Input.isKeyDown("ArrowRight")) {
      this.velocity.x = speed;
    }

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.position.y = Math.min(this.position.y, 480 - 16);
  }

  public draw(renderer: Renderer) {
    renderer.withState(() => {
      renderer.translate(this.position.x, this.position.y);
      renderer.fillColor = Color.red;
      renderer.fillRect(-16, -16, 32, 32);
    });
  }
}

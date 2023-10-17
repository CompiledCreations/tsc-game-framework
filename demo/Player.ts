import { Color, Input, Renderer } from "../src";

export class Player {
  private position = { x: 0, y: 0 };
  private velocity = { x: 0, y: 0 };
  private speed = 200;
  private gravity = 800;
  private floorPosition = 400;

  public update(dt: number): void {
    this.velocity.x = 0;
    if (Input.isKeyDown("ArrowLeft")) {
      this.velocity.x = -this.speed;
    } else if (Input.isKeyDown("ArrowRight")) {
      this.velocity.x = this.speed;
    }

    this.velocity.y += this.gravity * dt;

    if (Input.isKeyJustDown("ArrowUp") && this.velocity.y > 0) {
      this.velocity.y = -400;
    }

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.position.y = Math.min(this.position.y, this.floorPosition - 16);
  }

  public draw(renderer: Renderer) {
    renderer.withState(() => {
      renderer.translate(this.position.x, this.position.y);
      renderer.fillColor = Color.red;
      renderer.fillRect(-16, -16, 32, 32);
    });
  }
}

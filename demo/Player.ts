import { Color, Input, Renderer, Texture } from "../src";

import idle from "./assets/player-idle.png";

export class Player {
  private spriteSheet = Texture.load(idle);
  private position = { x: 320, y: 240 };
  private velocity = { x: 0, y: 0 };
  private speed = 200;
  private gravity = 800;
  private floorPosition = 400;

  public update(dt: number): void {
    this.velocity.x = 0;
    if (Input.isKeyDown("ArrowLeft") || Input.gamepad.isButtonDown("Left")) {
      this.velocity.x = -this.speed;
    } else if (
      Input.isKeyDown("ArrowRight") ||
      Input.gamepad.isButtonDown("Right")
    ) {
      this.velocity.x = this.speed;
    } else {
      this.velocity.x = Input.gamepad.getAxisValue("LX") * this.speed;
    }

    this.velocity.y += this.gravity * dt;

    if (
      (Input.isKeyJustDown("ArrowUp") || Input.gamepad.isButtonJustDown("A")) &&
      this.velocity.y > 0
    ) {
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

      renderer.drawTexture(this.spriteSheet, {
        sw: 16,
        sh: 16,
        dx: -16,
        dy: -16,
        dw: 32,
        dh: 32,
      });
    });
  }
}

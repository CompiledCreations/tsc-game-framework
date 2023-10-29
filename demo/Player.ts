import { Color, MouseService, Renderer, Texture } from "../src";
import { GamepadService } from "../src/GamepadService";
import { KeyboardService } from "../src/KeyboardService";

import idle from "./assets/player-idle.png";

export class Player {
  private spriteSheet = Texture.load(idle);
  private position = { x: 320, y: 240 };
  private velocity = { x: 0, y: 0 };
  private speed = 200;
  private gravity = 800;
  private floorPosition = 400;

  public constructor(
    private readonly gamepads: GamepadService,
    private readonly keyboard: KeyboardService,
    private readonly mouse: MouseService
  ) {}

  public update(dt: number): void {
    const gamepad = this.gamepads.gamepad;
    const keyboard = this.keyboard;
    const mouse = this.mouse;

    this.velocity.x = 0;
    if (keyboard.isKeyDown("ArrowLeft") || gamepad.isButtonDown("Left")) {
      this.velocity.x = -this.speed;
    } else if (
      keyboard.isKeyDown("ArrowRight") ||
      gamepad.isButtonDown("Right")
    ) {
      this.velocity.x = this.speed;
    } else {
      this.velocity.x = gamepad.getAxisValue("LX") * this.speed;
    }

    this.velocity.y += this.gravity * dt;

    if (
      (keyboard.isKeyJustDown("ArrowUp") ||
        gamepad.isButtonJustDown("A") ||
        mouse.isButtonJustDown("Left")) &&
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

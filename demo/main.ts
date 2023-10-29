import { html, render } from "lit-html";

import { Color, createCanvasGame } from "../src";
import { GamepadService } from "../src/GamepadService";
import { KeyboardService } from "../src/KeyboardService";
import { MouseService } from "../src/MouseService";
import { Player } from "./Player";
import "./demo.css";

const game = createCanvasGame({
  element: document.getElementById("game")!,
  width: 640,
  height: 480,
  scale: 2,
});

const debug = document.getElementById("debug")!;
const debugOverlay = () => {
  const mouse = game.services.get<MouseService>(MouseService);
  return html`<div>
    ${mouse.x}, ${mouse.y} (${mouse.isButtonDown("Left") ? "Down" : "Up"})
  </div>`;
};

const player = new Player(
  game.services.get(GamepadService),
  game.services.get(KeyboardService),
  game.services.get(MouseService)
);

// Process input during update
game.onUpdate.add(({ dt }) => {
  player.update(dt);

  render(debugOverlay(), debug);
});

// Render the current state during draw
game.onDraw.add(({ renderer }) => {
  renderer.fillColor = Color.black;
  renderer.fillRect(0, 0, 640, 480);

  renderer.fillColor = Color.white;
  renderer.fillText("Hello, World!", 10, 15);

  player.draw(renderer);
});

game.run();

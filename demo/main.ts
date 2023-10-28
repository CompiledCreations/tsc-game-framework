import { html, render } from "lit-html";

import { Color, createCanvasGame } from "../src";
import { Player } from "./Player";
import "./demo.css";
import { MouseService } from "../src/MouseService";

const game = createCanvasGame({
  element: document.getElementById("game")!,
  width: 640,
  height: 480,
  scale: 2,
});

const debug = document.getElementById("debug")!;
const debugOverlay = () => {
  const mouse = game.services.get<MouseService>(MouseService).mouse;
  return html`<div>${mouse.x}, ${mouse.y}</div>`;
};

const player = new Player();

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

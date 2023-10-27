import { Color, createCanvasGame } from "../src";
import { Player } from "./Player";
import "./demo.css";

const game = createCanvasGame({
  element: document.getElementById("game")!,
  width: 640,
  height: 480,
  scale: 2,
});

const player = new Player();

// Process input during update
game.onUpdate.add(({ dt }) => {
  player.update(dt);
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

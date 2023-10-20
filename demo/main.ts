import { Color, createCanvasGame } from "../src";
import { Player } from "./Player";

window.addEventListener("gamepadconnected", (e) => {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length
  );
});

window.addEventListener("gamepaddisconnected", (e) => {
  console.log(
    "Gamepad disconnected from index %d: %s",
    e.gamepad.index,
    e.gamepad.id
  );
});

const game = createCanvasGame({
  element: document.getElementById("game")!,
  width: 640,
  height: 480,
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

  player.draw(renderer);
});

game.run();

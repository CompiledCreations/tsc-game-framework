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

const buttons = new Map([
  ["A", 0],
  ["B", 1],
  ["X", 2],
  ["Y", 3],
  ["LB", 4],
  ["RB", 5],
  ["LT", 6],
  ["RT", 7],
  ["BACK", 8],
  ["START", 9],
  ["LS", 10],
  ["RS", 11],
  ["UP", 12],
  ["DOWN", 13],
  ["LEFT", 14],
  ["RIGHT", 15],
  ["HOME", 16],
]);

const axes = new Map([
  ["LX", 0],
  ["LY", 1],
  ["RX", 2],
  ["RY", 3],
]);

// Process input during update
game.onUpdate.add(({ dt }) => {
  player.update(dt);
});

// Render the current state during draw
game.onDraw.add(({ renderer }) => {
  renderer.fillColor = Color.black;
  renderer.fillRect(0, 0, 640, 480);

  player.draw(renderer);

  for (const [b, i] of buttons) {
    if (navigator.getGamepads()[0]?.buttons[i].pressed) {
      console.log(b);
    }
  }

  for (const [a, i] of axes) {
    if (Math.abs(navigator.getGamepads()[0]?.axes[i] ?? 0) > 0.1) {
      console.log(a, navigator.getGamepads()[0]?.axes[i]);
    }
  }
});

game.run();

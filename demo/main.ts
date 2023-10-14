import { Color, createCanvasGame } from "../src";

const game = createCanvasGame({
  element: document.getElementById("game")!,
  width: 640,
  height: 480,
});

let rotation = 0;
game.onDraw.add(({ renderer }) => {
  renderer.fillColor = Color.black;
  renderer.fillRect(0, 0, 640, 480);

  renderer.withState(() => {
    renderer.translate(320, 240);
    renderer.rotate(rotation);
    renderer.fillColor = Color.red;
    renderer.fillRect(-100, -100, 200, 200);
  });

  renderer.fillColor = Color.blue;
  renderer.fillRect(0, 0, 100, 100);

  rotation += 0.01;
});

game.run();

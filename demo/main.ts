import { GameLoop } from "../src";

const loop = new GameLoop();
loop.addUpdateListener(({ dt }) => {
  console.log(dt);
});

loop.start();

import { afterEach, beforeEach, expect, test, vitest } from "vitest";

import { GameLoop } from "./GameLoop";

test("isRunning must be false when not started", () => {
  const loop = new GameLoop();

  expect(loop.isRunning).toBe(false);
});

test("isRunning must be true when started", () => {
  const loop = new GameLoop();

  loop.start();

  expect(loop.isRunning).toBe(true);
});

test("stop must cancel next requested frame", () => {
  const loop = new GameLoop();

  loop.start();
  loop.stop();

  expect(cancelAnimationFrame).toHaveBeenCalledWith(1);
});

test("must call onUpdate listener with delta time", () => {
  const loop = new GameLoop();
  const listener = vitest.fn();

  loop.onUpdate.addOnce(listener);
  loop.start();

  vitest.mocked(requestAnimationFrame).mock.calls[0][0](1000);

  expect(listener).toHaveBeenCalledOnce();
  expect(listener).toHaveBeenCalledWith({ dt: 1 });

  // Must request next frame
  expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
});

// Globally stub everything out for the entire test suite
let lastFrame = 0;
vitest.stubGlobal(
  "requestAnimationFrame",
  vitest.fn(() => {
    lastFrame++;
    return lastFrame;
  })
);

vitest.stubGlobal("cancelAnimationFrame", vitest.fn());

beforeEach(() => {
  lastFrame = 0;
});

afterEach(() => {
  vitest.mocked(requestAnimationFrame).mockRestore();
  vitest.mocked(cancelAnimationFrame).mockRestore();
});

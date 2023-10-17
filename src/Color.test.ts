import { expect, test } from "vitest";

import { Color } from "./Color";

test("rgb must set rgb channels", () => {
  const color = Color.rgb(0.25, 0.5, 0.75);

  expect(color.r).toBe(0.25);
  expect(color.g).toBe(0.5);
  expect(color.b).toBe(0.75);
  expect(color.a).toBe(1);
});

test("rgba must set rgba channels", () => {
  const color = Color.rgba(0.25, 0.5, 0.75, 0.0);

  expect(color.r).toBe(0.25);
  expect(color.g).toBe(0.5);
  expect(color.b).toBe(0.75);
  expect(color.a).toBe(0.0);
});

test("cssStyle must return CSS style string", () => {
  const color = Color.rgba(0.25, 0.5, 0.75, 0.0);

  expect(color.cssStyle()).toBe("rgba(63.75, 127.5, 191.25, 0)");
});

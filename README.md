# Typescript Game Framework

The "not an engine" game framework for typescript.

## Introduction

Repeat, this is not a "Game Engine". This is a small library to kickstart game development projects written in typescript. It's aim is to provide lightweight utilities to help with common game development tasks, such as rendering, input, and audio. You can take the whole thing, or just the parts you need for your own projects.

## Under Construction

Don't try and use this yet. It's in the very early stages of development. There's not even a published package yet!

## Getting Started

```typescript
import { Color, createCanvasGame } from "tsc-game-framework";

// Create a game instance on a div element
const game = createCanvasGame({
  element: document.getElementById("game")!,
  width: 640,
  height: 480,
});

// Register signals for game events
game.onDraw.add(({ renderer }) => {
  renderer.fillColor = Color.black;
  renderer.fillRect(0, 0, 640, 480);

  // Draw other stuff here!
});

// Start the game loop
game.run();
```
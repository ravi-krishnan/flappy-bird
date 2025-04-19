# Flappy Bird js-grid version

The main idea is to create everything inside a Grid Layout.
We will be using a dynamically created grid layout, with each grid element being 20px x 20px wide.
The grid position of an element is defined by its gridRowStart and gridColumnStart style properties.

## Issues encountered

1. Dynamically allocating grid rows and columns made it quite difficult to find the edges of the game board.
2. The gridRowStart of flappy is actually a string. So adding 1 to it makes it a type coersion.


## Solutions

1. Utilised getComputedStyle property to compute the height and width of the game-board after rendering.
2. parseInt and getComputedStyle is used to get the integer value of the renderd flappy's gridRowStart.

## How it works

1. The "movement" is triggered by a setInterval() which runs every 0.3 seconds.
2. During this time, the flappy keeps falling and the obstacles keep moving left.
3. Arrow key presses on the game-board is used to navigate the flappy.
4. The game ends when either flappy collides with an obstacle or falls down the ground

## Current Issues

1. How to implement obstacles?
2. How to introduce holes in those obstacles?
3. Flappy - Obstacle interaction.
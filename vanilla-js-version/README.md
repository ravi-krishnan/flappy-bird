# Flappy Bird js-grid version

The main idea is to create everything inside a Grid Layout.
We will be using a dynamically created grid layout, with each grid element being 20px x 20px wide.
The grid position of an element is defined by its gridRowStart and gridColumnStart style properties.

## Issues encountered

1. Dynamically allocating grid rows and columns made it quite difficult to find the edges of the game board.
2. The gridRowStart of flappy is actually a string. So adding 1 to it makes it a type coersion.
3. How to create multiple obstacles with different holes?
4. How to safely fly through holes?
5. Clearing the obstacles.
6. Game Over and beyond ...

## Solutions

1. Utilised getComputedStyle property to compute the height and width of the game-board after rendering.
2. parseInt and getComputedStyle is used to get the integer value of the renderd flappy's gridRowStart.
3. Create a different setInterval() to run a create obstacles function. Every x seconds, new obstacle and hole class divs are appended to the game-board. Grid layout of Holes are randomly generated.
4. Every time a obstacle is created, its holes are added into a list. Until the obstacles expire, the holes are kept.
5. All obstacles which pass a column threshold are removed from the game-board. Since obstacles and holes are of same size. Each can be removed using a for loop of fixed size. Once these are removed, hole_rows.shift() is used to remove the first such obstacle holes.
6. My first approach was to restart the game once game is over. But doing so, made the main loop run again and again such that it went out of hand.

## How it works

1. The "movement" is triggered by a setInterval() which runs every 0.3 seconds.
2. During this time, the flappy keeps falling and the obstacles keep moving left.
3. Arrow key presses on the game-board is used to navigate the flappy.
4. The game ends when either flappy collides with an obstacle or falls down the ground

## Current Issues

1. Restart functionality
2. Full restructuring of code.
3. Event loop mismanagement.
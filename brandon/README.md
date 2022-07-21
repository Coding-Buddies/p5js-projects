# Snek

The class arcade game snake! 🐍

## How it works

Firstly, we capture some unchanging configuration in a `CONFIG` constant. This
includes a list of key control codes that way players can use both arrow keys or
the traditional gaming WASD keys. It also includes the board size and scaling
as pixel integers, as well as how fast the game should render in `FRAME_RATE`
which represents frames per second. The frame rate translates directly to how
many tiles the snake can move per second.

Next we store the games changing state over time in the `game` object. It stores
what direction the snake is currently moving in, the position of all the snake
segments, the tail position (this is used to add a segment when the snake eats
the apple to make it grow), the position of the apple itself, if the game is over,
and a value to check if the player moved the snake in the current frame.

After that several methods are defined to encapsulate the games actions and checks,
for things like moving the snake each frame, moving the apple randomly, checking bounds
and game over states, etc etc.

Then in the p5 `setup()` method we create a background canvas based on the config,
set the games frame rate, and move the apple to a random position.

In the actual `draw()` method, several things need to happen:
1. the background needs to be drawn
2. the snake needs to move
3. the snake and apple need to be (re)rendered
4. the check for if the game is over needs to run

And finally the last thing to handle is to capture the players input and hand it
to the game.

## Notes on implementation

A naive way to implement snake is to render a grid tiles, and then track which tiles
are "snake" and "apple" tiles. This is incredibly inefficient as it means we need to
render the entire grid of tiles every frame. Instead, we can create the illusion of
a grid by rendering a single large background tile that fills the board background,
then only track and render the snake and apple tiles. as long as the movement of the
tiles stays locked to a grid, we now no longer need to render both background and
game object tiles!

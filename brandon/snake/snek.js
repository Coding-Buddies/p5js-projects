const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
}

const CONFIG = {
  KEY_CONTROL: {
    38: DIRECTION.UP, // up arrow
    87: DIRECTION.UP, // w
    37: DIRECTION.LEFT, // left arrow
    65: DIRECTION.LEFT, // a
    40: DIRECTION.DOWN, // down arrow
    83: DIRECTION.DOWN, // s
    39: DIRECTION.RIGHT, // right arrow
    68: DIRECTION.RIGHT, // d
  },
  BOARD_SIZE: {
    X: 50,
    Y: 50,
    SCALE: 12,
  },
  FRAME_RATE: 10, // frames per second
};

const game = {
  currentDirection: DIRECTION.RIGHT,
  snekSegments: [
    {x: 4, y: 2},
    {x: 3, y: 2},
    {x: 2, y: 2},
    // TODO: randomize starting position?
  ],
  tailPosition: {x: 1, y: 2},
  applePosition: {x: 0, y: 0},
  gameOver: false,

  // to avoid repeatedly changing directions, track if the direction has been
  // checked in the current frame. this value is used to debounce the position change.
  hasMovedInFrame: false,

  snekHead() {
    return this.snekSegments[0];
  },

  moveSnake() {
    if (this.gameOver) {
      return;
    }
    // Update the tail position
    this.tailPosition = {
      x: this.snekSegments[this.snekSegments.length - 1].x,
      y: this.snekSegments[this.snekSegments.length - 1].y,
    };
    // Move every segment except the head to the position of the previous segment
    for (let i = this.snekSegments.length - 1; i > 0; i--) {
      const previousSegment = this.snekSegments[i - 1];
      this.snekSegments[i].x = previousSegment.x;
      this.snekSegments[i].y = previousSegment.y;
    }
    // Move the head based on the current direction
    switch (this.currentDirection) {
      case DIRECTION.UP:
        this.snekSegments[0].y -= 1;
        break;
      case DIRECTION.DOWN:
        this.snekSegments[0].y += 1;
        break;
      case DIRECTION.LEFT:
        this.snekSegments[0].x -= 1;
        break;
      case DIRECTION.RIGHT:
        this.snekSegments[0].x += 1;
        break;
    }
    // Check for the apple :)
    if (this.snekHead().x === this.applePosition.x && this.snekHead().y === this.applePosition.y) {
      this.snekSegments.push(this.tailPosition)
      this.moveAppleToRandomPosition()
    }
  },

  checkForCollisions() {
    for (let i = 1; i < this.snekSegments.length; i++) {
      if (this.snekSegments[i].x === this.snekHead().x
        && this.snekSegments[i].y === this.snekHead().y) {
        return true;
      }
    }
    return false;
  },

  moveAppleToRandomPosition() {
    this.applePosition = {
      x: Math.floor(Math.random() * CONFIG.BOARD_SIZE.X),
      y: Math.floor(Math.random() * CONFIG.BOARD_SIZE.Y),
    }
  },

  isOutOfBounds() {
    return (
      this.snekHead().x > CONFIG.BOARD_SIZE.X ||
      this.snekHead().x < 0 ||
      this.snekHead().y > CONFIG.BOARD_SIZE.Y ||
      this.snekHead().y < 0
    );
  },

  changeDirection(direction) {
    if (this.hasMovedInFrame) {
      return;
    }
    switch (direction) {
      case DIRECTION.UP:
        if (this.currentDirection === DIRECTION.DOWN) {
          return;
        }
        break;
      case DIRECTION.DOWN:
        if (this.currentDirection === DIRECTION.UP) {
          return;
        }
        break;
      case DIRECTION.LEFT:
        if (this.currentDirection === DIRECTION.RIGHT) {
          return;
        }
        break;
      case DIRECTION.RIGHT:
        if (this.currentDirection === DIRECTION.LEFT) {
          return;
        }
        break;
    }
    this.currentDirection = direction;
    this.hasMovedInFrame = true;
  },

  resetByFrame() {
    this.hasMovedInFrame = false;
  },

  gameOverCheck() {
    this.gameOver = this.isOutOfBounds()
      || this.checkForCollisions()
      || this.snekSegments.length === (CONFIG.BOARD_SIZE.X * CONFIG.BOARD_SIZE.Y);
    return this.gameOver;
  },

  debug() {
    console.log(`tail [${this.tailPosition.x} ${this.tailPosition.y}], apple [${this.applePosition.x} ${this.applePosition.y}]`);
    console.table(this.snekSegments)
  }
}

function setup() {
  createCanvas(
    CONFIG.BOARD_SIZE.X * CONFIG.BOARD_SIZE.SCALE,
    CONFIG.BOARD_SIZE.Y * CONFIG.BOARD_SIZE.SCALE,
  );
  frameRate(CONFIG.FRAME_RATE);
  game.moveAppleToRandomPosition();
}

function drawSnek() {
  fill(color(0, 255, 0));
  noStroke();
  for (const {x, y} of game.snekSegments) {
    rect(
      x * CONFIG.BOARD_SIZE.SCALE,
      y * CONFIG.BOARD_SIZE.SCALE,
      CONFIG.BOARD_SIZE.SCALE,
      CONFIG.BOARD_SIZE.SCALE,
    );
  }
}

function drawApple() {
  fill(color(255, 0, 0));
  noStroke();
  rect(
    game.applePosition.x * CONFIG.BOARD_SIZE.SCALE,
    game.applePosition.y * CONFIG.BOARD_SIZE.SCALE,
    CONFIG.BOARD_SIZE.SCALE,
    CONFIG.BOARD_SIZE.SCALE,
  );
}

function draw() {
  background(10);
  game.moveSnake();
  drawSnek();
  drawApple();
  if (game.gameOverCheck()) {
    noLoop();
  } else {
    game.resetByFrame();
  }
  game.debug();
}

function keyPressed() {
  if (CONFIG.KEY_CONTROL[keyCode]) {
    game.changeDirection(CONFIG.KEY_CONTROL[keyCode]);
  }
}

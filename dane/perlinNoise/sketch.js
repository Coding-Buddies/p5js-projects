let spriteSheet;
let spriteData;
let index = 0;
let start = 0;
let mySpeed = 1;

const generateFrames = (width, array) => {
  if (width === 120) {
    array.push(width);
    return array.reverse();
  } else {
    array.push(width);
    return generateFrames(width - 120, array);
  }
};

const frames = generateFrames(1080, []);

function preload() {
  spriteSheet = loadImage("knight.png");
}

function setup() {
  frameRate(20);
  createCanvas(640, 480);
}

function draw() {
  let from = color(255, 200, 200);
  let to = color(200, 80, 100);
  setGradient(from, to);

  beginShape();
  fill(135, 90, 27);

  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(90, 40, 11);
    if (x === width - 1) {
      vertex(width, height);
      vertex(0, height);
    } else {
      var y = noise(xoff) * height;
      vertex(x, y);
      xoff += 0.005;
    }
  }
  endShape();

  image(
    spriteSheet.get(frames[(index * mySpeed) % frames.length], 0, 120, 80),
    200,
    320
  );
  stroke(255);
  index++;
  start += 0.01;
}

function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

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
  background(0);

  beginShape();
  fill("green");
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke("blue");
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

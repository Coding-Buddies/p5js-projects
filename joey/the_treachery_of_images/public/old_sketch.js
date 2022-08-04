let socket;

let museum;
let painting;
let eyes;

function preload() {
  museum = loadImage("./assets/museum");
  painting = loadImage("./assets/without_eyes");
  eyes = loadImage("./assets/eyeballs");
}

function setup() {
  createCanvas(1329, 1772);

  socket = io.connect("http://localhost:3005");
}

function draw() {
  background(255);
  let mX = map(mouseX, 0, 1000, 0, 220, true);
  let mY = map(mouseY, 0, 700, 120, 164, true);
  image(eyes, mX, mY, 500, 400);
  image(art, 0, 0, 1329, 1772);
}

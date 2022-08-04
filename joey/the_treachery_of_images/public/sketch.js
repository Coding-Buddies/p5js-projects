let museum;
let painting;
let eyes;

function preload() {
  museum = loadImage("./assets/museum.png");
  painting = loadImage("./assets/without_eyes.png");
  eyes = loadImage("./assets/eyeballs.png");
}

function setup() {
  createCanvas(1329, 1772);

  socket = io.connect("http://localhost:3005");
}

function draw() {
  let mX = map(mouseX, 0, 1329, 0, 220, true);
  let mY = map(mouseY, 0, 1772, 120, 164, true);
  image(painting, 0, 0, 1329, 1772);
  image(eyes, mX, mY, 1329, 1772);
  image(museum, 0, 0, 1329, 1772);
}

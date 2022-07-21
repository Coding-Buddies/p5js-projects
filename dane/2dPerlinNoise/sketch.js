let increment = 0.01;
let start = 0;

function setup() {
  createCanvas(200, 200);
  pixelDensity(1);
}

function draw() {
  let yoff = 0;
  loadPixels();
  background(51);
  beginShape();

  for (let x = 0; x < width; x++) {
    let xoff = 0;
    for (var y = 0; y < height; y++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;
      xoff += increment;
    }
    yoff += increment;
  }
  endShape();
  updatePixels();
}

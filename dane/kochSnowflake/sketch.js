const lineA = { x1: 0, y1: 1000, x2: 500, y2: 0 };
const lineB = { x1: 500, y1: 0, x2: 1000, y2: 1000 };
const lineC = { x1: 1000, y1: 1000, x2: 0, y2: 1000 };

function setup() {
  createCanvas(1500, 1500);
  generateLineStrings([lineA, lineB, lineC]);
}

function draw() {

  strokeWeight(10);
  
  // line(0, 1000, 1000, 1000)
  stroke('black')
  line(0, 1000, 333, 1000)
  
  // line(333, 1000, 666, 1000)
  stroke("red")
  line(333, 1000, 500, 1200)
  stroke("green")
  line(500, 1200, 666, 1000)
  stroke('black')
  line(666, 1000, 1000, 1000)
  //pythagorean theorem
}

//                           (500, 0)
//                          /  \
//                         /    \
//              (0, 1000)  ------ (1000, 1000)

const generateLineStrings = (startingTriangle) => {
  // break each side into three

  const splitThree = (line) => {
    const { x1, x2, y1, y2 } = line;
    const a = Math.abs(x2 - x1);
    const b = Math.abs(y2 - y1);
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    
    const divided = [c/3, c/3, c/3]

  };

  const segments = startingTriangle.map((line) => splitThree(line));
};

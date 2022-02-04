var sww = 700;
var shh = 840;

let canvas;
const st_deviation = 50;
const layers = 80;

var left_x;
var right_x;
var top_y;
var bottom_y;
var resolution;
var num_columns;
var num_rows;
var grid;
var offset;
let img;
let easing = 0.05;
const num_steps = 200;
const step_length = 5;
let angoff = 0.0;
let shapecolor;
let pentagon = [];
let x1 = [];
let y1 = [];
let x2 = [];
let y2 = [];

var pp = [[300, -300], [300, -100], [300, 100], [300, 300], [300, 500]];

function createStretchedPentagon(stretchFactor, offset) {
  
  let stretchedPentagon = [
      createVector(910  + randomGaussian(0, stretchFactor) + offset , 320+ offset ),
      createVector(830.9188309203678 + randomGaussian(0, stretchFactor)+ offset , 510.9188309203678+ offset ),
      createVector(640 + randomGaussian(0, stretchFactor)+ offset , 590+ offset ),
      createVector(449.0811690796322 + randomGaussian(0, stretchFactor)+ offset , 510.91883092036784+ offset ),
      createVector(370 + randomGaussian(0, stretchFactor)+ offset ,320.00000000000006+ offset ),
      createVector(449.0811690796321 + randomGaussian(0, stretchFactor)+ offset , 129.0811690796322+ offset ),
      createVector(640 + randomGaussian(0, stretchFactor)+ offset , 50+ offset ),
      createVector(830.9188309203678 + randomGaussian(0, stretchFactor)+ offset , 129.08116907963213+ offset )
  ]
  return stretchedPentagon
}

function preload() {
  img =loadImage('assets/bitmap'+random([1,2,3,4,5])+'.png');
  angoff = PI / 180 * random(0,360);

  left_x = Math.round(ww * -0.5);
  right_x = Math.round(ww * 1.5);
  top_y = Math.round(hh * -0.5);
  bottom_y = Math.round(hh * 1.5); 
  resolution = Math.round(ww * 0.01); 
  num_columns = Math.round((right_x - left_x) / resolution);
  num_rows = Math.round((bottom_y - top_y) / resolution);
  
  grid = new Array(num_columns);
  for (var i=0; i<num_columns; i++)
    grid[i] = new Array(num_rows);

  shapecolor = [random(0,150), random(0,150), random(0,150), 10];
  pentagon = [];
  for (var i=0; i<5; i++) {
    pentagon.push(createStretchedPentagon(pp[i][0], pp[i][1]));
  }
  x1 = [];
  y1 = [];
  x2 = [];
  y2 = [];
  for (var i = 0; i < 10; i++) {
    x1.push(random(0, ww / 2));
    y1.push(random(0, hh / 2));
    x2.push(random(ww / 2, ww));
    y2.push(random(0, hh / 2));
  }
    
}

function setup() {
  noStroke();
  canvas = createCanvas(ww, hh);
  background(255);
  for (var i=0; i<5; i++) {
    drawCustomShape(pentagon[i], shapecolor);
  }
  filter(BLUR, 3);

  beginShape();
  for (var column=0; column<num_columns; column++) {
    for (var row=0; row<num_rows; row++) {
      var scaled_x = parseFloat(column) * 0.01;
      var scaled_y = parseFloat(row) * 0.01;
      var noise_val = noise(scaled_x, scaled_y);
      angle = map(noise_val, 0.0, 1.0, 0.0, TWO_PI) + radians(100);
      grid[column][row] = angle;
    }
  }
  var ec = color(255,255,255);
  ec.setAlpha(1);
  fill(ec);
  for (var i = 0; i < 10; i++) {
    myFlowField(x1[i], y1[i], num_steps);
  }
  for (var i = 0; i < 10; i++) {
    myFlowField(x2[i], y2[i], num_steps);
  }
  endShape();

  tint(255,150);
  translate(ww / 2, hh / 2);
  rotate(angoff);
  imageMode(CENTER);
  image(img, 0, 0, ww*1.5, hh*1.25);
  
  //frameRate(0.1);
}

function draw() {  
  noStroke();
  let borderColor = color(191, 185, 185);
  fill(borderColor);
  rect(0, 0, 12, hh);
  rect(0, 0, ww, 12);
  rect(0, hh-12, ww, hh);
  rect(ww-12, 0, ww, hh);
}

function myFlowField(x, y, num_steps){
  for (var n = 0; n < num_steps; n++) {
    var x_offset = x - left_x;
    var y_offset = y - top_y;
    var column_index = Math.round(x_offset / resolution);
    var row_index = Math.round(y_offset / resolution);
    if (column_index >= num_columns)
      column_index = num_columns - 1;
    if (row_index >= num_rows)
      row_index = num_rows - 1;
    
    var grid_angle = grid[column_index][row_index];
    var x_step = Math.abs(step_length * cos(grid_angle));
    var y_step = Math.abs(step_length * sin(grid_angle));
    // push();
    // translate(x, y);
    // arc(0, 0, x_step * 10, y_step * 10, 0, grid_angle, CHORD);
    ellipse(x, y, x_step * 30, y_step * 30);
    // pop();
    x = x + x_step;
    y = y + y_step;    
  }
}

function drawCustomShape(shapeArchetype, color) {
  for (let j = 0; j < layers; j += 1) {
    let shape = polygon(shapeArchetype, 1);
    fill(color);
    beginShape();
    for (let i of shape) {
      vertex(i.x, i.y);
    }
    //blendMode('darken');
    let pxmax = getXmax(shape);
    let pymax = getYmax(shape);
    
    for (let k = 0; k < 100; k += 1) {
      let px = random(0, pxmax);
      let py = random(0, pymax);
      let wh = Math.abs(randomGaussian(pxmax, 0.03) - randomGaussian(pxmax, 0.02)) * 1000; 
      ellipse(px, py, wh, wh);  
    }
    endShape(CLOSE);
  }
}

function getXmax(shape) {
  let retX = shape[0].x;
  for (let i = 0; i < shape.length; i += 1) {
    if (retX < shape[i].x)
      retX = shape[i].x;
  }
  return retX;
}

function getYmax(shape) {
  let retY = shape[0].y;
  for (let i = 0; i < shape.length; i += 1) {
    if (retY < shape[i].y)
      retY = shape[i].y;
  }
  return retY;
}

function polygon(currentShape, dep) {
  if (dep >= 7) {
    return currentShape;
  } else {
    const nextShape = [];
    for (let i in currentShape) {
      nextShape.push(currentShape[i]);
      let next = int(i) + 1;
      try {
        const midVector = createVector((currentShape[next].x + currentShape[i].x) / 2, (currentShape[next].y + currentShape[i].y) / 2);
        const dx = randomGaussian(0, st_deviation);
        const dy = randomGaussian(0, st_deviation);
        midVector.add(dx, dy);
        nextShape.push(midVector);
      } catch(e) {
        // Handle end of array
        const midVector = createVector((currentShape[0].x + currentShape[i].x) / 2, (currentShape[0].y + currentShape[i].y) / 2);
        const dx = randomGaussian(0, st_deviation);
        const dy = randomGaussian(0, st_deviation);
        midVector.add(dx, dy);
        nextShape.push(midVector);
      }
    }
    return polygon(nextShape, dep + 1);
  }
}

class Random {
  constructor(seed) {
      this.seed = seed;
      this.originalSeed = seed;
  }
  randDec() {
      this.seed ^= this.seed << 13;
      this.seed ^= this.seed >> 17;
      this.seed ^= this.seed << 5;
      return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000;
  }
  randNum(a, b) {
      return a+(b-a)*this.randDec();
  }
  randInt(a, b) {
      return Math.floor(this.randNum(a, b+1));
  }

  reset() {
      this.seed = this.originalSeed;
  }
}

function random_hash() {
  let x = "0123456789abcdef", hash = '0x';
  for (let i = 64; i > 0; --i) {
    hash += x[Math.floor(Math.random()*x.length)];
  }
  return hash;
}

tokenData = {
  //hash: "0x11ac16678959949c12d5410212301960fc496813cbc3495bf77aeed738579738", 
  hash: random_hash(),
  tokenId: "123000456"
};

function windowResized() {
  hh = window.innerHeight;
  ww = hh*ratio;
  const dim = Math.min(ww, hh);
  M = dim / defaultSize;
  console.log(`M: ${M}`);
  R.reset();
  resizeCanvas(ww, hh);
  setup();
}

const defaultSize = 1000;
const ratio = 0.83;
let hh = shh;
let ww = sww;
let dim = Math.min(ww, hh);
let M = dim / defaultSize;
console.log(`M: ${M}`);
console.log(`Hash: ${tokenData.hash}`);
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
console.log(`Seed: ${seed}`);
const R = new Random(seed);
// var ww = window.innerWidth;
// var hh = window.innerHeight;

var ww = 700;
var hh = 840;

let canvas
const st_deviation = 50
const layers = 80

let pentagon1;
let pentagon2;

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
  console.log('assets/bitmap'+random([1,2,3,4])+'.png');
  img =loadImage('assets/bitmap'+random([1,2,3,4])+'.png');
  
}

function setup() {
  
  pentagon1 = [
      createVector(910, 320),
      createVector(830.9188309203678, 510.9188309203678),
      createVector(640, 590),
      createVector(449.0811690796322, 510.91883092036784),
      createVector(370 ,320.00000000000006),
      createVector(449.0811690796321, 129.0811690796322),
      createVector(640, 50),
      createVector(830.9188309203678, 129.08116907963213)
  ]

  pentagon2 = [
    createVector(910, 860),
    createVector(830.9188309203678, 1050.9188309203678),
    createVector(640, 1130),
    createVector(449.0811690796322, 1050.91883092036784),
    createVector(370 ,860.00000000000006),
    createVector(449.0811690796321, 669.0811690796322),
    createVector(640, 590),
    createVector(830.9188309203678, 669.08116907963213)
  ]
  
  noStroke();
  canvas = createCanvas(ww, hh);
  //canvas.mouseClicked(clickOnSave)

  left_x = Math.round(ww * -0.5)
  right_x = Math.round(ww * 1.5)
  top_y = Math.round(hh * -0.5)
  bottom_y = Math.round(hh * 1.5) 
  resolution = Math.round(ww * 0.01) 
  num_columns = Math.round((right_x - left_x) / resolution)
  num_rows = Math.round((bottom_y - top_y) / resolution)
  
  grid = new Array(num_columns);
  for (var i=0; i<num_columns; i++)
    grid[i] = new Array(num_rows);
  
  // background(191, 185, 185);
  // background(random(0,150) * random(0,1), random(0,150), random(0,150));
  background(255);
  
  for (var i=0; i<5; i++) {
    drawCustomShape(createStretchedPentagon(pp[i][0], pp[i][1]), [random(0,150), random(0,150), random(0,150), 10])
  }
  filter(BLUR, 3);
  beginShape();
  for (var column=0; column<num_columns; column++) {
    for (var row=0; row<num_rows; row++) {
      // angle = (row / parseFloat(num_rows)) * Math.PI
      // Processing's noise() works best when the step between
      // points is approximately 0.005, so scale down to that
      var scaled_x = parseFloat(column) * 0.01
      var scaled_y = parseFloat(row) * 0.01
      // get our noise value, between 0.0 and 1.0
      var noise_val = noise(scaled_x, scaled_y)
      // translate the noise value to an angle (betwen 0 and 2 * PI)
      angle = map(noise_val, 0.0, 1.0, 0.0, TWO_PI) + radians(100);
      grid[column][row] = angle
    }
  }
  // var ec = color(random(70,200) * random(0,1), random(0,250), random(0,250));
  var ec = color(255,255,255);

  ec.setAlpha(1);
  fill(ec);
  for (var i = 0; i < 20; i++) {
    var x = random(0, ww / 2);
    var y = random(0, hh / 2);
    myFlowField(x, y, num_steps) ;
  }
  for (var i = 0; i < 20; i++) {
    var x = random(ww / 2, ww);
    var y = random(0, hh / 2);
    myFlowField(x, y, num_steps) ;
  }

  endShape();
 
  // image(img, 0, 0);
  
  tint(255, 185); // Apply transparency without changing color
  translate(ww / 2, hh / 2);
  rotate(PI / 180 * random(0,360));
  imageMode(CENTER);
  // image(img, 0, 0, 150, 150);
  image(img, 0, 0, ww*1.5, hh*1.25);
  

  //frameRate(0.1)
}

function draw() {
  // background(127);
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
    // NOTE: normally you want to check the bounds here
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
    let shape = polygon(shapeArchetype, 1)
    fill(color)
    beginShape();
    for (let i of shape) {
      vertex(i.x, i.y)
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
    return currentShape
  } else {
    const nextShape = []
    for (let i in currentShape) {
      nextShape.push(currentShape[i])
      let next = int(i) + 1
      try {
        const midVector = createVector( (currentShape[next].x + currentShape[i].x) / 2
          , (currentShape[next].y + currentShape[i].y) / 2)
        const dx = randomGaussian(0, st_deviation)
        const dy = randomGaussian(0, st_deviation)
        midVector.add(dx, dy)
        nextShape.push(midVector)
      } catch(e) {
        // Handle end of array
        const midVector = createVector( (currentShape[0].x + currentShape[i].x) / 2
          , (currentShape[0].y + currentShape[i].y) / 2)
        const dx = randomGaussian(0, st_deviation)
        const dy = randomGaussian(0, st_deviation)
        midVector.add(dx, dy)
        nextShape.push(midVector)
      }
    }
    return polygon(nextShape, dep + 1)

  }
}

function clickOnSave() {
  saveCanvas();
}
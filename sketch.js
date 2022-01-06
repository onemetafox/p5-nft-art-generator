// Constants to define color for backgrounds
const WHITE_BACKGROUND = 255;
const BLACK_BACKGROUND = 0;

// Constants for radio button input
const BLACK_BACKGROUND_RGB_RADIO_VALUE = 1;
const BLACK_BACKGROUND_HSB_RADIO_VALUE = 2;
const WHITE_BACKGROUND_RGB_RADIO_VALUE = 3;
const WHITE_BACKGROUND_HSB_RADIO_VALUE = 4;

// The perlin noise flow field object
var perlinNoiseFlowField;


let canvas
let logo
let logoWidth = 250
let logoHeight = 114
const st_deviation = 50
const layers = 80
const backgrounds = [0,255]

let pentagon1;
let pentagon2;


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
  
  /*
  let stretchedPentagon = [
    createVector(910 + stretchFactor , 320+ offset ),
    createVector(830.9188309203678 + stretchFactor , 510.9188309203678+ offset ),
    createVector(640 + stretchFactor , 590+ offset ),
    createVector(449.0811690796322 + stretchFactor , 510.91883092036784+ offset ),
    createVector(370 + stretchFactor ,320.00000000000006+ offset ),
    createVector(449.0811690796321 + stretchFactor , 129.0811690796322+ offset ),
    createVector(640 + stretchFactor , 50+ offset ),
    createVector(830.9188309203678 + stretchFactor , 129.08116907963213+ offset )
  ]
  */
  
  /*
  let stretchedPentagon = [
    createVector(910 + randomGaussian(0, stretchFactor) , 320+ offset ),
    createVector(830.9188309203678 + randomGaussian(0, stretchFactor) , 510.9188309203678+ offset ),
    createVector(640 + randomGaussian(0, stretchFactor) , 590+ offset ),
    createVector(449.0811690796322 + randomGaussian(0, stretchFactor) , 510.91883092036784+ offset ),
    createVector(370 + randomGaussian(0, stretchFactor) ,320.00000000000006+ offset ),
    createVector(449.0811690796321 + randomGaussian(0, stretchFactor) , 129.0811690796322+ offset ),
    createVector(640 + randomGaussian(0, stretchFactor) , 50+ offset ),
    createVector(830.9188309203678 + randomGaussian(0, stretchFactor) , 129.08116907963213+ offset )
  ]
  */
  
  /*
  let stretchedPentagon = [
    createVector(910 + randomGaussian(0, stretchFactor) + stretchFactor , 320+ offset ),
    createVector(830.9188309203678 + randomGaussian(0, stretchFactor) + stretchFactor , 510.9188309203678+ offset ),
    createVector(640 + randomGaussian(0, stretchFactor) + stretchFactor , 590+ offset ),
    createVector(449.0811690796322 + randomGaussian(0, stretchFactor) + stretchFactor , 510.91883092036784+ offset ),
    createVector(370 + randomGaussian(0, stretchFactor) + stretchFactor ,320.00000000000006+ offset ),
    createVector(449.0811690796321 + randomGaussian(0, stretchFactor) + stretchFactor , 129.0811690796322+ offset ),
    createVector(640 + randomGaussian(0, stretchFactor) + stretchFactor , 50+ offset ),
    createVector(830.9188309203678 + randomGaussian(0, stretchFactor) + stretchFactor , 129.08116907963213+ offset )
  ]*/

  return stretchedPentagon
}

function preload() {
  
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
  

  /*
  noStroke()
  canvas = createCanvas(windowWidth, windowHeight)
  background(backgrounds[Math.round(random(0,1))])
  
  drawCustomShape(createStretchedPentagon(300, random(-400,400)), [random(0,255), random(0,255), random(0,255), 10])
  drawCustomShape(createStretchedPentagon(150, random(-400,400)), [random(0,255), random(0,255), random(0,255), 10])
  drawCustomShape(createStretchedPentagon(0, random(-400,400)), [random(0,255), random(0,255), random(0,255), 10])
  */
  

  // Set the angle mode to radians
  angleMode(RADIANS)
  // Create perlin noise flow field
  perlinNoiseFlowField = new FlowField(DEFAULT_VECTOR_FIELD_SIZE,
    DEFAULT_NUM_PARTICLES,
    DEFAULT_ALPHA,
    DEFAULT_VECTOR_FIELD_OFFSET,
    DEFAULT_VECTOR_MAGNITUDE,
    DEFAULT_NOISE_SCALE,
    DEFAULT_STROKE_WEIGHT);

  noStroke()
  //canvas = createCanvas(windowWidth, windowHeight)
  canvas = createCanvas(window.innerWidth, window.innerHeight)
  background(192)
  
  drawCustomShape(createStretchedPentagon(300, -300), [random(0,255), random(0,255), random(0,255), 10])
  drawCustomShape(createStretchedPentagon(300, -100), [random(0,255), random(0,255), random(0,255), 10])
  drawCustomShape(createStretchedPentagon(300, 100), [random(0,255), random(0,255), random(0,255), 10])
  drawCustomShape(createStretchedPentagon(300, 300), [random(0,255), random(0,255), random(0,255), 10])
  drawCustomShape(createStretchedPentagon(300, 500), [random(0,255), random(0,255), random(0,255), 10])
  //frameRate(0.1)
}

function draw() {
  perlinNoiseFlowField.Update();
  perlinNoiseFlowField.Draw();
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

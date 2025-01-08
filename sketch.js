
let scale = 20;
let cols, rows;
const inc = 0.1;

let zoff = 0;
let xoff = 0;
let yoff = 0;

let particles = [];
let flowfield = [];

function setup() {
  const canvasContainer = document.getElementById('canvas-container');
  const canvas = createCanvas(600, 400);  // Adjust the size as needed
  canvas.parent(canvasContainer);  // Attach the canvas to the specified HTML element

  cols = floor(width / scale);
  rows = floor(height / scale);

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 200; i++) {
    particles[i] = new Particle();
  }

  background(255);
  startTime = millis(); // Add this line to record the start time

}

function draw() {
  if (millis() - startTime > 30000) { // Check if 30 seconds have passed

    fill(255);
    noStroke();
    rect(0, height - 30, width, 30);

    noLoop(); // Stop the draw loop
    return;
  }

  xoff = 0;
  for (let row = 0; row < rows; row++) {
    yoff = 0;
    for (let col = 0; col < cols; col++) {
      let x = col * scale;
      let y = row * scale;
      
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(5);

      let index = col + row * cols;
      flowfield[index] = v;

      // stroke(0);
      // push();
      // strokeWeight(1);
      // translate(x, y);
      // rotate(v.heading());
      // line(0, 0, scale, 0);

      // pop();
      
      yoff += inc;
    }
    xoff += inc;
  }

  zoff += 0.01;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fill(255);
  noStroke();
  rect(0, height - 30, width, 30);

  // Calculate and display the remaining time
  let elapsedTime = millis() - startTime;
  let remainingTime = 30 - floor(elapsedTime / 1000);
  fill(0);
  textSize(16);
  textAlign(CENTER, BOTTOM);
  text(`Time left: ${remainingTime} seconds`, width / 2, height - 10);
}

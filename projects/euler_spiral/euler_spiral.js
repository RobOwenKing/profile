const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const startAngleSlider = document.getElementById('startAngle');
const angleIncrementSlider = document.getElementById('angleIncrement');
const segmentLengthSlider = document.getElementById('segmentLength');
const numberOfSegmentsSlider = document.getElementById('numberOfSegments');

canvas.width = 400;
canvas.height = 400;

const dark = document.getElementById('dark');
const light = document.getElementById('light');
let mode = "dark";

let startX = 200;
let startY = 200;
let startAngle = parseInt(startAngleSlider.value);
let angleIncrement = parseInt(angleIncrementSlider.value);
let segmentLength = parseInt(segmentLengthSlider.value);
let numberOfSegments = parseInt(numberOfSegmentsSlider.value);

let currentX = 200;
let currentY = 200;
let currentAngle = 0;

const drawSpiral = () => {
  // Draw background
  ctx.fillStyle = mode === "dark" ? 'black' : 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  currentX = startX;
  currentY = startY;
  currentAngle = startAngle;
  for (let i = 0; i < numberOfSegments; i++) {
    currentAngle += (angleIncrement * i);
    console.log(currentAngle);
    ctx.strokeStyle = mode === "dark" ? `hsl(${currentAngle},100%,50%)` : `hsl(${currentAngle},75%,75%)`;
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    currentX += (segmentLength * Math.cos(Math.PI * (currentAngle / 180)));
    currentY += (segmentLength * Math.sin(Math.PI * (currentAngle / 180)));
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }
};

drawSpiral();

canvas.addEventListener('click', (event) => {
  startX = event.offsetX;
  startY = event.offsetY;
  drawSpiral();
});

light.addEventListener('click', (event) => {
  if (mode === "dark") {
    mode = "light";
    drawSpiral();
  }
});

dark.addEventListener('click', (event) => {
  if (mode === "light") {
    mode = "dark";
    drawSpiral();
  }
});

startAngleSlider.addEventListener('input', (event) => {
  console.log(startAngleSlider.value);
  startAngle = parseInt(startAngleSlider.value);
  drawSpiral();
});

angleIncrementSlider.addEventListener('input', (event) => {
  angleIncrement = parseInt(angleIncrementSlider.value);
  drawSpiral();
});

segmentLengthSlider.addEventListener('input', (event) => {
  segmentLength = parseInt(segmentLengthSlider.value);
  drawSpiral();
});

numberOfSegmentsSlider.addEventListener('input', (event) => {
  numberOfSegments = parseInt(numberOfSegmentsSlider.value);
  drawSpiral();
});

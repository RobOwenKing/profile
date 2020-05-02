const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const dark = document.getElementById('dark');
const light = document.getElementById('light');
let mode = "dark";

let speedButton = document.getElementById('speed');
let speed = 101;
const autoplayButton = document.getElementById('autoplay');
let counter = 0;
let autoplay = false;
let lastTime;

const iterateButton = document.getElementById('iterate');
let iterate = false;

const clear = document.getElementById('clear');
const random = document.getElementById('random');

const resolution = 4;
canvas.width = 400;
canvas.height = 400;

let cols = canvas.width / resolution;
let rows = canvas.height / resolution;

const buildGrid = () => {
	return new Array(cols).fill(null)
		.map(() => new Array(rows).fill('.'));
};

let grid = buildGrid();

const renderCell = (col, row, value) => {
  if (mode === "dark") {
    ctx.fillStyle = value === '.' ? `hsl(0,0%,0%)` : `hsl(${value},100%,50%)`;
  } else if (mode === "light") {
    ctx.fillStyle = value === '.' ? `hsl(0,100%,100%)` : `hsl(${value},75%,75%)`;
  }
	ctx.fillRect(col * resolution, row * resolution, resolution, resolution);
};

const renderGrid = (grid) => {
	for (let col = 0; col < grid.length; col++) {
		for (let row = 0; row < grid[col].length; row++) {
			const value = grid[col][row];
			renderCell(col, row, value);
		}
	}
};

renderGrid(grid);

canvas.addEventListener('click', (event) => {
  console.log(event);
	const col = Math.floor(event.offsetX / resolution);
	const row = Math.floor(event.offsetY / resolution);
	if (grid[col][row] === '.') {
		grid[col][row] = '0';
	} else {
		grid[col][row] = '.';
	}
	renderGrid(grid);
});

const countLivingNeighbours = (x, y) => {
	const neighbours = [
		grid[x][y+1],
		grid[x][y-1]
	];
	if (x > 0) {
		neighbours.push(grid[x-1][y-1], grid[x-1][y], grid[x-1][y+1]);
	}
	if (x < grid.length - 1) {
		neighbours.push(grid[x+1][y+1], grid[x+1][y],	grid[x+1][y-1]);
	}
	const livingNeighbours = neighbours.filter(n => n !== '.' && n !== undefined);
	return livingNeighbours.length;
}

const nextGeneration = (grid) => {
	const nextGen = buildGrid();
	for (let col = 0; col < nextGen.length; col++) {
		for (let row = 0; row < nextGen[col].length; row++) {
			const livingN = countLivingNeighbours(col, row);
			if (grid[col][row] === '.') {
				nextGen[col][row] = livingN === 3 ? '0' : '.';
			} else {
				if (livingN < 2 || livingN > 3) {
					nextGen[col][row] = '.';
				} else {
					nextGen[col][row] = (parseInt(grid[col][row]) + 11).toString();
				}
			}
		}
	}
	return nextGen;
}

const iteration = () => {
	if (iterate === true || counter === speed) {
		grid = nextGeneration(grid);
		renderGrid(grid);
    iterate = false;
	}

	if (counter >= speed) {
		counter = 0;
	}

	if (autoplay === true) {
		counter ++;
		requestAnimationFrame(iteration);
	}
}

// requestAnimationFrame(iteration);

iterateButton.addEventListener('click', (event) => {
	iterate = true;
  iteration();
});

autoplayButton.addEventListener('click', (event) => {
	autoplay = !autoplay;

	if (autoplay === true) {
    autoplayButton.innerText = "Auto off";
		counter = speed - 1;
		iteration();
	} else {
    autoplayButton.innerText = "Autoplay";
  }
});

speedButton.addEventListener('input', (event) => {
	speed = 101 - speedButton.value;
});

random.addEventListener('click', (event) => {
	for (let col = 0; col < grid.length; col++) {
		for (let row = 0; row < grid[col].length; row++) {
			grid[col][row] = Math.random() < 0.5 ? '.' : '0';
		}
	}
	renderGrid(grid);
});

clear.addEventListener('click', (event) => {
  grid = buildGrid();
  renderGrid(grid);
});

light.addEventListener('click', (event) => {
  if (mode === "dark") {
    mode = "light";
    renderGrid(grid);
  }
});

dark.addEventListener('click', (event) => {
  if (mode === "light") {
    mode = "dark";
    renderGrid(grid);
  }
});

/*
neighbours = document.getElementById('neighbours');
neighbours.addEventListener('click', (event) => {
	const nGrid = buildGrid();
	for (let col = 0; col < nGrid.length; col++) {
		for (let row = 0; row < nGrid[col].length; row++) {
			nGrid[col][row] = countLivingNeighbours(col, row);
		}
	}
	console.log(nGrid);
});
*/

// console.log(speed.value);
// window.setInterval(iteration, (5000 / speed.value));

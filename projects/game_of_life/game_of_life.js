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

let adding = 'dot';

const dotButton = document.getElementById('dot');
const rPentominoButton = document.getElementById('r-pentomino');
const bHeptominoButton = document.getElementById('b-heptomino');
const piHeptominoButton = document.getElementById('pi-heptomino');
const gliderButton = document.getElementById('glider');
const acornButton = document.getElementById('acorn');
const lidkaButton = document.getElementById('lidka');
const diehardButton = document.getElementById('diehard');
const bunniesButton = document.getElementById('bunnies');
const pentadecathlonButton = document.getElementById('pentadecathlon');
const lwssButton = document.getElementById('lwss');
const mwssButton = document.getElementById('mwss');
const hwssButton = document.getElementById('hwss');
const loaferButton = document.getElementById('loafer');
const copperheadButton = document.getElementById('copperhead');
const noahsArkButton = document.getElementById('noahsArk');
const queenBeeLoopButton = document.getElementById('queenBeeLoop');
const gliderGunButton = document.getElementById('gliderGun');

const patternButtons = [dotButton, rPentominoButton, bHeptominoButton, piHeptominoButton, gliderButton, acornButton, diehardButton, lidkaButton, bunniesButton, pentadecathlonButton, lwssButton, mwssButton, hwssButton, loaferButton, copperheadButton, noahsArkButton, queenBeeLoopButton, gliderGunButton];


const patterns = new Map([
  ['dot', [[0,0]]],
  ['r-pentomino', [[1,0],[2,0],[1,1],[0,1],[1,2]]],
  ['b-heptomino', [[0,0],[0,1],[1,1],[1,2],[2,1],[2,0],[3,0]]],
  ['pi-heptomino', [[0,0],[0,1],[0,2],[1,0],[2,0],[2,1],[2,2]]],
  ['glider', [[0,2],[1,2],[2,2],[2,1],[1,0]]],
  ['acorn', [[1,0],[3,1],[0,2],[1,2],[4,2],[5,2],[6,2]]],
  ['diehard', [[0,1],[1,1],[1,2],[5,2],[6,2],[7,2],[6,0]]],
  ['bunnies', [[0,0],[2,1],[2,2],[1,3],[3,3],[6,0],[6,1],[5,2],[7,2]]],
  ['lidka', [[1,0],[0,1],[2,1],[1,2],[4,14],[5,14],[6,14],[8,12],[8,11],[8,10],[6,12],[6,11],[5,12]]],
  ['pentadecathlon', [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]]],
  ['lwss', [[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[3,3],[0,1],[0,3]]],
  ['mwss', [[1,0],[2,0],[3,0],[4,0],[5,0],[5,1],[5,2],[4,3],[0,1],[0,3],[2,4]]],
  ['hwss', [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[6,1],[6,2],[5,3],[0,1],[0,3],[2,4],[3,4]]],
  ['loafer', [[1,0],[2,0],[0,1],[1,2],[2,3],[3,1],[3,2],[5,0],[6,1],[7,1],[7,0],[8,0],[8,4],[8,5],[7,5],[6,5],[5,6],[6,7],[7,8],[8,8]]],
  ['copperhead', [[1,0],[2,0],[5,0],[6,0],[3,1],[4,1],[3,2],[4,2],[0,3],[2,3],[5,3],[7,3],[0,4],[7,4],[0,6],[7,6],[1,7],[2,7],[5,7],[6,7],[2,8],[3,8],[4,8],[5,8],[3,10],[4,10],[3,11],[4,11]]],
  ['noahsArk', [[10,0],[9,1],[12,0],[10,2],[13,2],[12,3],[13,3],[14,3],[0,10],[1,9],[0,12],[2,10],[2,13],[3,12],[3,13],[3,14]]],
  ['queenBeeLoop', [[12,0],[12,1],[13,2],[13,3],[13,4],[12,5],[12,6],[14,1],[14,5],[15,2],[15,4],[16,3],[0,11],[1,11],[5,11],[6,11],[2,10],[3,10],[4,10],[1,9],[5,9],[2,8],[4,8],[3,7],[17,12],[18,12],[22,12],[23,12],[19,13],[20,13],[21,13],[18,14],[22,14],[19,15],[21,15],[20,16],[11,17],[11,18],[11,22],[11,23],[10,19],[10,20],[10,21],[9,18],[9,22],[8,19],[8,21],[7,20]]],
  ['gliderGun', [[0,4],[1,4],[0,5],[1,5],[10,4],[10,5],[10,6],[11,3],[11,7],[12,2],[12,8],[13,2],[13,8],[14,5],[15,3],[15,7],[16,4],[16,5],[16,6],[17,5],[20,4],[20,3],[20,2],[21,4],[21,3],[21,2],[22,1],[22,5],[24,0],[24,1],[24,5],[24,6],[34,2],[35,2],[34,3],[35,3]]]
]);

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
	const col = Math.floor(event.offsetX / resolution);
	const row = Math.floor(event.offsetY / resolution);
  let pattern = patterns.get(adding);

  for (let i = 0; i < pattern.length; i++) {
    const colPlus = col + parseInt(pattern[i][0]);
    const rowPlus = row + parseInt(pattern[i][1]);
    grid[colPlus][rowPlus] = '0';
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

iterateButton.addEventListener('click', (event) => {
	iterate = true;
  iteration();
});

autoplayButton.addEventListener('click', (event) => {
	autoplay = !autoplay;

	if (autoplay === true) {
		counter = speed - 1;
		iteration();
	}
  autoplayButton.classList.toggle('btn-active');
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

for (let i = 0; i < patternButtons.length; i++) {
  patternButtons[i].addEventListener('click', (event) => {
    if (patternButtons[i].classList.contains('btn-active')) {
      patternButtons[i].classList.remove('btn-active');
      adding = 'dot';
    } else {
      for (let j = 0; j < patternButtons.length; j++) {
        patternButtons[j].classList.remove('btn-active');
      };
      patternButtons[i].classList.add('btn-active');
      adding = patternButtons[i].id;
    }
  });
};

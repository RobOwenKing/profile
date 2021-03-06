let sudokuArray = [];
let solutionArray = [];
const candidatesArray = [];
const sudokuTable = document.querySelector('#sudoku tbody');
const solutionTable = document.querySelector('#solution tbody');

const enterButton = document.getElementById('btn-enter');
const solveButton = document.getElementById('btn-solve');
const enterMode = document.querySelector('.enter-mode');
const solveMode = document.querySelector('.solve-mode');

const clearButton = document.getElementById('clear-grid');
const bruteForceButton = document.getElementById('brute-force');
const validButton = document.getElementById('valid');

// Save the state of the grid in an array of arrays for ease of manipulation
const createSudokuArray = () => {
  for (let i = 0; i < 9; i += 1) {
    const latestRow = [];
    for (let j = 0; j < 9; j += 1) {
      latestRow.push(0);
    }
    sudokuArray.push(latestRow);
  }
  solutionArray = sudokuArray;
};

// Populate the html table of inputs we'll use for the interface
const createSudokuTable = () => {
  for (let i = 0; i < 9; i += 1) {
    sudokuTable.insertAdjacentHTML('beforeend', '<tr></tr>');
    const latestRow = document.querySelector('#sudoku tbody > tr:last-child');
    for (let j = 0; j < 9; j += 1) {
      latestRow.insertAdjacentHTML('beforeend', '<td><input type="text" /></td>');
    }
  }
};

// Populate the html table we'll use to display the solution
const createSolutionTable = () => {
  for (let i = 0; i < 9; i += 1) {
    solutionTable.insertAdjacentHTML('beforeend', '<tr></tr>');
    const latestRow = document.querySelector('#solution tbody > tr:last-child');
    for (let j = 0; j < 9; j += 1) {
      latestRow.insertAdjacentHTML('beforeend', '<td><input type="text" /></td>');
    }
  }
};

createSudokuArray();
createSudokuTable();
createSolutionTable();

const fillCandidatesArray = () => {
  for (let i = 0; i < 9; i += 1) {
    const latestRow = [];
    for (let j = 0; j < 9; j += 1) {
      const cellCandidates = []
      if (sudokuArray[j][i] === 0) {
        for (let k = 1; k < 10; k+= 1) {
          if (checkValid(k, i, j)) {
            cellCandidates.push(k);
          }
        }
      }
      latestRow.push(cellCandidates);
    }
    candidatesArray.push(latestRow);
  }
  // console.log(candidatesArray);
};


// Check whether a number already appears in a row
const validInRow = (num, row) => {
  if (solutionArray[row].some(entry => entry === num)) {
    return false;
  } else {
    return true;
  }
};

// Check whether a number already appears in a column
const validInCol = (num, col) => {
  if (solutionArray.some(entry => entry[col] === num)) {
    return false;
  } else {
    return true;
  }
};

// Check whether a number already appears in a block
const validInBlock = (num, x, y) => {
  let valid = true;
  // Is our block No 0, 1 or 2 horizontally and vertically?
  const blockCol = Math.floor(x / 3);
  const blockRow = Math.floor(y / 3);
  // Iterate over the cells in that block to check whether they match
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (solutionArray[(blockRow * 3) + i][(blockCol * 3) + j] === num) {
        valid = false;
      }
    }
  }
  return valid;
};

// Checks whether a number can go in a cell (x,y) based on the others in its row, column and block
const checkValid = (num, x, y) => {
  if (validInRow(num, y) && validInCol(num, x) && validInBlock(num, x, y)) {
    return true;
  } else {
    return false;
  }
};

// Updates the value displayed in a single cell in the solution grid
const updateCellInSolution = (x, y) => {
  // console.log(sudokuArray[y][x]);

  // Find the cell in question in the HTML and update its value
  const cell = solutionTable.childNodes[y + 1].childNodes[x].childNodes[0];
  if (solutionArray[y][x] >= 1 && solutionArray[y][x] <= 9) {
    cell.value = solutionArray[y][x];
    cell.disabled = true;
  } else {
    cell.value = "";
    cell.disabled = false;
  }

  // Change the colour of the number in the cell
  if (solutionArray[y][x] === sudokuArray[y][x]) {
    // Black if given by the user
    cell.style.color = "black";
  } else {
    // Blue if calculated by the algorithm
    cell.style.color = "blue";
  }

  cell.style.backgroundColor = "#FFFFFF";
  // console.log(solutionTable.childNodes[y + 1].childNodes[x]);
};

// Updates the entire solution grid
const updateSolution = () => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      updateCellInSolution(i, j);
    }
  }
};

// Algorithm to solve by brute force. As yucky a method as the code.
const solveBruteForce = () => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (solutionArray[j][i] === 0) {
        for (let candidate = 1; candidate < 10; candidate += 1) {
          if (checkValid(candidate, i, j)) {
            solutionArray[j][i] = candidate;
            // updateCellInSolution(i, j);
            if (solveBruteForce()) {
              return true;
            }
            solutionArray[j][i] = 0;
            // updateCellInSolution(i, j);
          }
        }
        return false;
      }
    }
  }
  return true;
};

bruteForceButton.addEventListener('click', event => {
  // console.log(sudokuArray);
  solutionArray = JSON.parse(JSON.stringify(sudokuArray));
  solveBruteForce();
  updateSolution();
  goToSolveMode();
  // console.log(solutionArray);
  // console.log(sudokuArray);
});

/*const btnGenerateCandidates = document.getElementById('candidates');
btnGenerateCandidates.addEventListener('click', event => {
  // console.log(sudokuArray);
  fillCandidatesArray();
  // console.log(solutionArray);
  // console.log(sudokuArray);
});*/

const moveH = (target) => {
  if (target !== null) {
    target.firstElementChild.focus();
  }
};

const moveV = (currentFocus, up) => {
  const child = currentFocus.parentElement;
  const parent = child.parentElement;
  const childPos = Array.prototype.indexOf.call(parent.childNodes, child);
  const newRow = up === true ? parent.previousElementSibling : parent.nextElementSibling;
  if (newRow !== null) {
    const target = newRow.childNodes[childPos].childNodes[0];
    target.focus();
  }
};

document.addEventListener('keyup', (event) => {
  const currentFocus = document.activeElement;
  // console.log(currentFocus.parentElement);
  // console.log(event.key == "ArrowRight");
  // console.log(currentFocus);
  if (event.key === "ArrowRight") {
    const nextElement = currentFocus.parentElement.nextElementSibling;
    moveH(nextElement);
  } else if (event.key === "ArrowLeft") {
    const previousElement = currentFocus.parentElement.previousElementSibling;
    moveH(previousElement);
  } else if (event.key === "ArrowUp") {
    moveV(currentFocus, true);
  } else if (event.key === "ArrowDown") {
    moveV(currentFocus, false)
  }
});

const goToSolveMode = () => {
  enterMode.hidden = true;
  solveMode.hidden = false;
  solveButton.classList.add('btn-active');
  enterButton.classList.remove('btn-active');
};

solveButton.addEventListener('click', (event) => {
  goToSolveMode();
});

enterButton.addEventListener('click', (event) => {
  enterMode.hidden = false;
  solveMode.hidden = true;
  enterButton.classList.add('btn-active');
  solveButton.classList.remove('btn-active');
});

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('focus', (event) => {
    input.style.backgroundColor = "yellow";
  });
  input.addEventListener('blur', (event) => {
    input.style.backgroundColor = "#FFFFFF";
    const y = input.closest("tr").rowIndex;
    const x = input.closest("td").cellIndex;
    const num = parseInt(input.value, 10);
    digitRegex = /^[1-9]$/;
    if (input.closest('table').id === 'sudoku') {
      if (digitRegex.test(input.value)) {
        // checkValid(num, x, y);
        sudokuArray[y][x] = num;
      } else {
        sudokuArray[y][x] = 0;
      }
      updateCellInSolution(x, y);
    } else {
      if (digitRegex.test(input.value)) {
        // checkValid(num, x, y);
        solutionArray[y][x] = num;
      } else {
        solutionArray[y][x] = 0;
      }
    }
  });
});

clearButton.addEventListener('click', (event) => {
  sudokuArray = [];
  solutionArray = [];
  createSudokuArray();
  inputs.forEach(input => {
    input.value = '';
  });
  updateSolution();
});

validButton.addEventListener('click', (event) => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      const temp = solutionArray[j][i];
      solutionArray[j][i] = 0;
      // console.log(solutionArray[j][i]);
      if (!checkValid(temp, i, j)) {
        solutionTable.childNodes[j + 1].childNodes[i].childNodes[0].style.color = 'red';
      }
      solutionArray[j][i] = temp;
    }
  }
})

// const createTableListeners = () => {
//   sudokuCells.forEach(cell => {
//     cell.addEventListener('blur', (event) => {
//       const y = cell.closest("tr").rowIndex;
//       const x = cell.closest("td").cellIndex;
//       const num = parseInt(cell.value, 10);
//       digitRegex = /^[1-9]$/;
//       if (digitRegex.test(cell.value)) {
//         // checkValid(num, x, y);
//         sudokuArray[y][x] = num;
//       } else {
//         sudokuArray[y][x] = 0;
//       }
//       updateCellInSolution(x, y);
//     });
//   });
// };

// const sudokuCells = document.querySelectorAll('input');
// createTableListeners();

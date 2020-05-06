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



// const rPentomino = [[1,0],[2,0],[1,1],[0,1],[1,2]];
// const bHeptomino = [[0,0],[0,1],[1,1],[1,2],[2,1],[2,0],[3,0]];
// const piHeptomino = [[0,0],[0,1],[0,2],[1,0],[2,0],[2,1],[2,2]];
// const glider = [[0,2],[1,2],[2,2],[2,1],[1,0]];
// const acorn = [[1,0],[3,1],[0,2],[1,2],[4,2],[5,2],[6,2]];
// const diehard = [[0,1],[1,1],[1,2],[5,2],[6,2],[7,2],[6,0]];
// const bunnies = [[0,0],[2,1],[2,2],[1,3],[3,3],[6,0],[6,1],[5,2],[7,2]];
// const lidka = [[1,0],[0,1],[2,1],[1,2],[4,14],[5,14],[6,14],[8,12],[8,11],[8,10],[6,12],[6,11],[5,12]];
// const pentadecathlon = [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]];
// const lwss = [[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[3,3],[0,1],[0,3]];
// const mwss = [[1,0],[2,0],[3,0],[4,0],[5,0],[5,1],[5,2],[4,3],[0,1],[0,3],[2,4]];
// const hwss = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[6,1],[6,2],[5,3],[0,1],[0,3],[2,4],[3,4]];
// const loafer = [[1,0],[2,0],[0,1],[1,2],[2,3],[3,1],[3,2],[5,0],[6,1],[7,1],[7,0],[8,0],[8,4],[8,5],[7,5],[6,5],[5,6],[6,7],[7,8],[8,8]];
// const copperhead = [[1,0],[2,0],[5,0],[6,0],[3,1],[4,1],[3,2],[4,2],[0,3],[2,3],[5,3],[7,3],[0,4],[7,4],[0,6],[7,6],[1,7],[2,7],[5,7],[6,7],[2,8],[3,8],[4,8],[5,8],[3,10],[4,10],[3,11],[4,11]];
// const noahsArk = [[10,0],[9,1],[12,0],[10,2],[13,2],[12,3],[13,3],[14,3],[0,10],[1,9],[0,12],[2,10],[2,13],[3,12],[3,13],[3,14]];
// const queenBeeLoop = [[12,0],[12,1],[13,2],[13,3],[13,4],[12,5],[12,6],[14,1],[14,5],[15,2],[15,4],[16,3],[0,11],[1,11],[5,11],[6,11],[2,10],[3,10],[4,10],[1,9],[5,9],[2,8],[4,8],[3,7],[17,12],[18,12],[22,12],[23,12],[19,13],[20,13],[21,13],[18,14],[22,14],[19,15],[21,15],[20,16],[11,17],[11,18],[11,22],[11,23],[10,19],[10,20],[10,21],[9,18],[9,22],[8,19],[8,21],[7,20]];
// const gliderGun = [[0,4],[1,4],[0,5],[1,5],[10,4],[10,5],[10,6],[11,3],[11,7],[12,2],[12,8],[13,2],[13,8],[14,5],[15,3],[15,7],[16,4],[16,5],[16,6],[17,5],[20,4],[20,3],[20,2],[21,4],[21,3],[21,2],[22,1],[22,5],[24,0],[24,1],[24,5],[24,6],[34,2],[35,2],[34,3],[35,3]];


  // if (adding === 'dot') {
 //    if (grid[col][row] === '.') {
 //     grid[col][row] = '0';
 //   } else {
 //     grid[col][row] = '.';
 //   }
 //  } else {
 //    switch (adding) {
 //      case 'r-pentomino':
 //        pattern = rPentomino;
 //        break;
 //      case 'b-heptomino':
 //        pattern = bHeptomino;
 //        break;
 //      case 'pi-heptomino':
 //        pattern = piHeptomino;
 //        break;
 //      case 'glider':
 //        pattern = glider;
 //        break;
 //      case 'acorn':
 //        pattern = acorn;
 //        break;
 //      case 'diehard':
 //        pattern = diehard;
 //        break;
 //      case 'lidka':
 //        pattern = lidka;
 //        break;
 //      case 'bunnies':
 //        pattern = bunnies;
 //        break;
 //      case 'pentadecathlon':
 //        pattern = pentadecathlon;
 //        break;
 //      case 'lwss':
 //        pattern = lwss;
 //        break;
 //      case 'mwss':
 //        pattern = mwss;
 //        break;
 //      case 'hwss':
 //        pattern = hwss;
 //        break;
 //      case 'loafer':
 //        pattern = loafer;
 //        break;
 //      case 'copperhead':
 //        pattern = copperhead;
 //        break;
 //      case 'noahsArk':
 //        pattern = noahsArk;
 //        break;
 //      case 'queenBeeLoop':
 //        pattern = queenBeeLoop;
 //        break;
 //      case 'gliderGun':
 //        pattern = gliderGun;
 //        break;
 //    }


  //  if (adding === 'r-pentomino') {
  //   for (let i = 0; i < rPentomino.length; i++) {
  //     const colPlus = col + parseInt(rPentomino[i][0]);
  //     const rowPlus = row + parseInt(rPentomino[i][1]);
  //     grid[colPlus][rowPlus] = '0';
  //   }
  // } else if (adding === 'glider') {
  //   for (let i = 0; i < glider.length; i++) {
  //     const colPlus = col + parseInt(glider[i][0]);
  //     const rowPlus = row + parseInt(glider[i][1]);
  //     grid[colPlus][rowPlus] = '0';
  //   }
  // } else if (adding === 'acorn') {
  //   for (let i = 0; i < acorn.length; i++) {
  //     const colPlus = col + parseInt(acorn[i][0]);
  //     const rowPlus = row + parseInt(acorn[i][1]);
  //     grid[colPlus][rowPlus] = '0';
  //   }
  // }

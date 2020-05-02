//Creating the triangle as an array of arrays
function createTree (numRows, prune) {
	var pascalTree = [];
	
	//step through rows, making an array to contain each
	for (var i = 0; i < numRows; i++) { 
		pascalTree[i] = new Array(i+1);
    
		//step through columns within the row
		for (var j = 0; j < i+1; j++) {

			if (i === 0) {
				//if it's the first row, we make it a 1
				pascalTree[i][j] = 1;
			} else {
				if (j === 0) {
					//left-hand edge
					pascalTree[i][j] = pascalTree[i-1][j];
				} else if (j === i) {
					//right-hand edge
					pascalTree[i][j] = pascalTree[i-1][j-1];
				} else {
					//make centre positions on each row sum of two above
					pascalTree[i][j] = pascalTree[i-1][j-1] + pascalTree[i-1][j];
				}
			}
			
			if (i > 0) {
				if (i % prune === 0) {
					var div = (i / prune);
					pascalTree[i][div-1] = 0;
					pascalTree[i][i+1-div] = 0;
				}
			}
		}
	}
  
  return pascalTree;
}

function setGreenRed (test, factor) {
	
	if (test % factor == 0 ) {
		return true;
	} else {
		return false;
	}
	
	
	/*
	if (Math.floor(Math.sqrt(2*test))*Math.ceil(Math.sqrt(2*test)) == test*2) {
		//Ignore actual square numbers
		if (Math.floor(Math.sqrt(2*test)) != Math.ceil(Math.sqrt(2*test))) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
	*/
}

function stringTree (numRows, prune, factor) {
	//We want to take in the output of createTriangle (an array of arrays) and output it as a string
	var inputTree = createTree(numRows, prune);
	var outputTree = "";
	
	for (var i = 0; i < numRows; i++) {
		
		//Set the variable test to the first non-zero element of the row
		var first = (Math.floor(i / prune));
		var test = inputTree[i][first];
		
		//Number of spaces is proportional to the order of magnitude of the first element
		var spaces = 5 - (Math.floor(Math.log(test) / Math.LN10));
		
		if (spaces <= 1) {spaces = 1;}
		
		var space = "";
		for (var k = 0; k < spaces; k++) {
			space += "&nbsp;";
		}
		
		
		for (var j = 0; j < i+1; j++) {
			if (inputTree[i][j] != 0) {
				if (setGreenRed(inputTree[i][j], factor) === false) {
					outputTree += "<span class=\"green\">";
					outputTree += String(inputTree[i][j]);
					outputTree += "</span class=\"green\">";
					outputTree += space;
				} else {
					outputTree += "<span class=\"red\">";
					outputTree += String(inputTree[i][j]);
					outputTree += "</span class=\"red\">";
					outputTree += space;
				}
			}
		}
		outputTree += "<br / >";
	}
	
	return outputTree;
}

//var outputTree = stringTree(15,4,3); 

document.getElementById("tree").innerHTML = stringTree(16,4,3);
document.getElementById("triangle").innerHTML = stringTree(16,16,3);

function update() {
	var userRows = parseInt(document.getElementById("userRows").value);
	var userPrune = parseInt(document.getElementById("userPrune").value);
	var userFactor = parseInt(document.getElementById("userFactor").value);
	
	var outputTree = stringTree(userRows,userPrune,userFactor); 
	document.getElementById("tree").innerHTML = outputTree;
	
	var outputTriangle = stringTree(userRows,userRows,userFactor); 
	document.getElementById("triangle").innerHTML = outputTriangle;
}

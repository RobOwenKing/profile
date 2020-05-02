const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculatorDisplay");
const keys = calculator.querySelector(".calculatorKeys");
var memory = [0, 0, "null"];
var buttons = 1;

var justEvaluated = false;

keys.addEventListener("click", buttonPress);

function buttonPress(buttonClicked) {
	//if we've clicked a button, save which one it is
	if (buttonClicked.target.matches("button")) {
		var input = buttonClicked.target.id;
		var classCheck = buttonClicked.target.className;
		
		//Now we act based on which button it is
		//Cheating, all the number buttons have 1-character long ids
		if (input.length == 1) {
			//If the display is 0, change it to the value pressed, else concatenate to the current display
			if (document.getElementById("display").textContent == "Nulla") {
				display.textContent = input;
			} else {
				var currentDisplay = display.textContent;
				display.textContent = currentDisplay + input;
			}
		} else if (input == "switch") {
			switchButtons();
		} else if (input == "clear") {
			//When we clear, we also need to clear the memory
			display.textContent = "Nulla";
			memory = [0, 0, "null"];
			justEvaluated = false;
		} else if (input == "sqrt") {
			var currentDisplay = romanToTen(display.textContent);
			var root = Math.sqrt(currentDisplay);
			display.textContent = tenToRoman(root);
		} else if (input == "sin") {
			var currentDisplay = romanToTen(display.textContent);
			var sin = Math.sin(currentDisplay);
			display.textContent = tenToRoman(sin);
		} else if (input == "cos") {
			var currentDisplay = romanToTen(display.textContent);
			var cos = Math.cos(currentDisplay);
			display.textContent = tenToRoman(cos);
		} else if (input == "tan") {
			var currentDisplay = romanToTen(display.textContent);
			var tan = Math.tan(currentDisplay);
			display.textContent = tenToRoman(tan);
		} else if (classCheck == "keyOperator") {
			if (memory[0] == 0 || justEvaluated == true) {
				memory[0] = display.textContent;
				justEvaluated = false;
			} else {
				memory[0] = evaluate(memory[0], display.textContent, memory[2]);
			}
			display.textContent = "Nulla";
			memory[2] = input;
		} else if (input == "equals") {
			memory[1] = display.textContent;
			var baseRoman = evaluate(memory[0], memory[1], memory[2]);
			memory[0] = baseRoman;
			display.textContent = baseRoman;
			justEvaluated = true;
		}
		
	}
}

function evaluate(roman1, roman2, operator) {
	var num1 = romanToTen(roman1);
	var num2 = romanToTen(roman2);
	
	if (operator == "add") {
		return tenToRoman(num1 + num2);
	} else if (operator == "subtract") {
		return tenToRoman(num1 - num2);
	} else if (operator == "multiply") {
		return tenToRoman(num1 * num2);
	} else if (operator == "divide") {
		return tenToRoman(num1 / num2);
	} else if (operator == "power") {
		return tenToRoman(num1 ** num2);
	}
}

function romanToTen(baseRoman) {
	if (baseRoman == "Nulla") {
		return 0;
	} else {
		var tempTotal = 0;
		var current = 0;
		var total = 0;
		
		for (i = 0; i < baseRoman.length; i++) {
			current = romanCharToTen(baseRoman.charAt(i));
			tempTotal += current;
			
			if (i == baseRoman.length - 1) {
				total += tempTotal;
			} else if (current > romanCharToTen(baseRoman.charAt(i + 1))) {
				total += tempTotal;
				tempTotal = 0;
			} else if (current < romanCharToTen(baseRoman.charAt(i + 1))) {
				total -= tempTotal;
				tempTotal = 0;
			}
		}
		
		return total;
	}
}

function romanCharToTen(romanChar) {
	switch (romanChar) {
		case "M":
			return 1000;
			break;
		case "D":
			return 500;
			break;
		case "C":
			return 100;
			break;
		case "L":
			return 50;
			break;
		case "X":
			return 10;
			break;
		case "V":
			return 5;
			break;
		case "I":
			return 1;
			break;
		default:
			return 1;
	}
}


function tenToRoman(baseTen) {
	baseRoman = "";
	
	if (baseTen <= (1/24)) {
		return baseRoman = "Nulla";
	}
	
	var fracPart = baseTen - Math.floor(baseTen);
	
	if (fracPart > (23/24)) {
		baseTen = Math.ceil(baseTen);
	}
	
	while (baseTen >= 1000) {
		baseRoman += "M";
		baseTen -= 1000;
	}
	if (baseTen >= 900) {
		baseRoman += "CM";
		baseTen -= 900;
	} else {
		while (baseTen >= 500) {
			baseRoman += "D";
			baseTen -= 500;
		}
	}
	if (baseTen >= 400) {
		baseRoman += "CD";
		baseTen -= 400;
	} else {
		while (baseTen >= 100) {
			baseRoman += "C";
			baseTen -= 100;
		}
	}
	if (baseTen >= 90) {
		baseRoman += "XC";
		baseTen -= 90;
	} else {
		while (baseTen >= 50) {
			baseRoman += "L";
			baseTen -= 50;
		}
	}
	if (baseTen >= 40) {
		baseRoman += "XL";
		baseTen -= 40;
	} else {
		while (baseTen >= 10) {
			baseRoman += "X";
			baseTen -= 10;
		}
	}
	if (baseTen >= 9) {
		baseRoman += "IX";
		baseTen -= 9;
	} else {
		while (baseTen >= 5) {
			baseRoman += "V";
			baseTen -= 5;
		}
	}
	if (baseTen >= 4) {
		baseRoman += "IV";
	} else {
		while (baseTen >= 1) {
			baseRoman += "I";
			baseTen -= 1;
		}
	}
	
	fracPart += 1/24;
	
	if (fracPart > 0.5) {
		baseRoman += "s";
		fracPart -= 0.5;
	}
	
	if (fracPart > (5/12)) {
		baseRoman += "\u{02059}";
	} else if (fracPart > (4/12)) {
		baseRoman += "\u{02237}";
	} else if (fracPart > (3/12)) {
		baseRoman += "\u{02234}";
	} else if (fracPart > (2/12)) {
		baseRoman += "\u{03A}";
	} else if (fracPart > (1/12)) {
		baseRoman += "\u{0B7}";
	}
	
	return baseRoman;
}

function switchButtons() {
	if (buttons == 1) {
		document.getElementById("add").innerHTML = "sin";
		document.getElementById("add").id = "sin";
		
		document.getElementById("multiply").innerHTML = "cos";
		document.getElementById("multiply").id = "cos";
		
		document.getElementById("empty").innerHTML = "tan";
		document.getElementById("empty").id = "tan";
		
		document.getElementById("subtract").innerHTML = "&radic;";
		document.getElementById("subtract").id = "sqrt";
		
		document.getElementById("divide").innerHTML = "^";
		document.getElementById("divide").id = "power";
		
		buttons = 2;
	} else {
		document.getElementById("sin").innerHTML = "+";
		document.getElementById("sin").id = "add";
		
		document.getElementById("cos").innerHTML = "&times;";
		document.getElementById("cos").id = "multiply";
		
		document.getElementById("tan").innerHTML = "";
		document.getElementById("tan").id = "empty";
		
		document.getElementById("sqrt").innerHTML = "-";
		document.getElementById("sqrt").id = "subtract";
		
		document.getElementById("power").innerHTML = "&divide;";
		document.getElementById("power").id = "divide";
		
		buttons = 1;
	}
}
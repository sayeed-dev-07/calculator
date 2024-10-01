let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";
let hasDecimal = false;
let lastResultWasDecimal = false; // Track if the last result was a decimal

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const decimal = document.querySelector(".decimal");

// Input from screen
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.id;

    if (!isNaN(value)) {
      handleNumberInput(value);
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/" ||
      value === "%"
    ) {
      handleOperatorInput(value);
      hasDecimal = false;
      decimal.disabled = false;
    } else if (value === "=") {
      hasDecimal = false;
      calculateResult();
      decimal.disabled = false;
    } else if (value === "AC") {
      clearEverything();
      hasDecimal = false;
      decimal.disabled = false;
      lastResultWasDecimal = false; // Reset flag
    } else if (value === "del") {
      delLastDigit();
      hasDecimal = false;
      decimal.disabled = false;
    }
  });
});

// Input from keyboard
window.addEventListener("keydown", (e) => {
  let key = e.key;
  let number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  
  if (number.includes(key)) {
    handleNumberInput(key);
  } else if (
    key == "+" ||
    key == "-" ||
    key == "*" ||
    key == "/" ||
    key == "%"
  ) {
    handleOperatorInput(key);
    hasDecimal = false;
  } else if (key == 'Enter' || key == '=') {
    calculateResult();
    hasDecimal = false;
  } else if (key == 'Backspace' || key == 'Delete') {
    hasDecimal = false;
    decimal.disabled = false;
    delLastDigit();
  } else if (key == '.') {
    if (!hasDecimal && !lastResultWasDecimal) { // Prevent decimal after result
      handleNumberInput(key);
      hasDecimal = true;
    }
  }
});

decimal.addEventListener("click", (e) => {
  let value = e.target.id;
  if (!hasDecimal && !lastResultWasDecimal) { // Prevent decimal after result
    decimal.disabled = true;
    handleNumberInput(value);
  }
});

function handleNumberInput(value) {
  if (operator === "") {
    firstNum += value;
    display.textContent = firstNum;
  } else {
    secondNum += value;
    display.textContent = secondNum;
  }
}

function handleOperatorInput(value) {
  if (value === "%") {
    calculatePercentage();
  } else {
    if (firstNum !== "" && secondNum === "") {
      operator = value;
    } else if (firstNum !== "" && secondNum !== "") {
      calculateResult();
      operator = value;
      secondNum = "";
    }
  }
}

function calculateResult() {
  if (firstNum !== "" && operator !== "" && secondNum !== "") {
    const num1 = parseFloat(firstNum);
    const num2 = parseFloat(secondNum);

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
    }

    if (!Number.isInteger(result)) {
      result = Math.round(result * 100) / 100;
      hasDecimal = true;
      lastResultWasDecimal = true; // Set flag if the result is decimal
      decimal.disabled = true;
    } else {
      lastResultWasDecimal = false; // Reset if the result is not decimal
    }

    firstNum = result.toString();
    display.textContent = firstNum;
    secondNum = "";
    operator = "";
  }
}

function calculatePercentage() {
  if (operator === "") {
    if (firstNum !== "") {
      firstNum = (parseFloat(firstNum) / 100).toString();
      display.textContent = firstNum;
    }
  } else {
    if (secondNum !== "") {
      secondNum = (parseFloat(secondNum) / 100).toString();
      display.textContent = secondNum;
    }
  }
}

function clearEverything() {
  firstNum = "";
  secondNum = "";
  operator = "";
  result = "";
  display.textContent = "";
  lastResultWasDecimal = false; // Reset flag
}

function delLastDigit() {
  if (operator === "") {
    firstNum = firstNum.slice(0, -1);
    display.textContent = firstNum;
  } else {
    secondNum = secondNum.slice(0, -1);
    display.textContent = secondNum;
  }
}

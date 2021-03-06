const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const operations = [add, subtract, multiply, divide];

const operate = (operation, num1, num2) => {
  return operation(num1, num2);
};

let displayValue = 0;
let prevVal = undefined;
let newVal = undefined;
let prevKey = "";
let nextOperation;

const zeroKey = document.querySelector("#zero-key");
const oneKey = document.querySelector("#one-key");
const twoKey = document.querySelector("#two-key");
const threeKey = document.querySelector("#three-key");
const fourKey = document.querySelector("#four-key");
const fiveKey = document.querySelector("#five-key");
const sixKey = document.querySelector("#six-key");
const sevenKey = document.querySelector("#seven-key");
const eightKey = document.querySelector("#eight-key");
const nineKey = document.querySelector("#nine-key");
const addKey = document.querySelector("#add-key");
const subtractKey = document.querySelector("#subtract-key");
const multiplyKey = document.querySelector("#multiply-key");
const divideKey = document.querySelector("#divide-key");
const decimalPointKey = document.querySelector("#decimal-point-key");
const equalsKey = document.querySelector("#equals-key");
const clearKey = document.querySelector("#clear-key");
const displayOutput = document.querySelector("#display-fg");

const keys = [
  zeroKey,
  oneKey,
  twoKey,
  threeKey,
  fourKey,
  fiveKey,
  sixKey,
  sevenKey,
  eightKey,
  nineKey,
  addKey,
  subtractKey,
  multiplyKey,
  divideKey,
  decimalPointKey,
  equalsKey,
  clearKey,
];

const createNumKeyListeners = () => {
  for (let i = 0; i <= 9; i++) {
    keys[i].addEventListener("click", () => {
      runNumKeyLogic(prevKey, i);
      prevKey = "number";
      debug();
    });
  }
};

const createOperationsKeyListeners = () => {
  for (let i = 10; i < 14; i++) {
    keys[i].addEventListener("click", () => {
      if (prevKey == "number" && prevVal != undefined) {
        cycleVals(operate(nextOperation, prevVal, newVal));
      }
      nextOperation = operations[i - 10];
      removeOperatorHighlight();
      keys[i].style.backgroundColor = "#f9f7a9";
      prevKey = "operation";
      truncateDisplayValue();
      debug();
    });
  }
};

const createDecimalKeyListener = () => {
  decimalPointKey.addEventListener("click", () => {
    prevKey = "decimal";
    displayValue += ".";
    debug();
  });
};

const createEqualsKeyListener = () => {
  equalsKey.addEventListener("click", () => {
    if (prevKey == "operation") {
      return;
    } else if (prevKey != "equals") {
      cycleVals(operate(nextOperation, prevVal, newVal));
      prevKey = "equals";
      truncateDisplayValue();
    } else {
      // this case allows the user to 'chain' an operation by pressing equals
      // repeatedly without 'cycling' away prevVal.  Has to change the order of
      // the operands to work as expected.
      displayValue = operate(nextOperation, newVal, prevVal);
      displayOutput.textContent = displayValue;
      newVal = displayValue;
      prevKey = "equals";
      truncateDisplayValue();
    }
    removeOperatorHighlight();
    debug();
  });
};

const createClearKeyListener = () => {
  clearKey.addEventListener("click", () => {
    wipeVariables();
    removeOperatorHighlight();
    displayOutput.textContent = displayValue;
  });
};

createNumKeyListeners();
createOperationsKeyListeners();
createDecimalKeyListener();
createEqualsKeyListener();
createClearKeyListener();

const runNumKeyLogic = (prevKey, newKey) => {
  if (prevKey == "number" || prevKey == "decimal") {
    buildNumber(prevKey, newKey);
    newVal = displayValue;
    displayOutput.textContent = displayValue;
    truncateDisplayValue();
  } else if (prevKey == "equals") {
    cycleVals(newKey);
    prevVal = 0;
  } else {
    cycleVals(newKey);
  }
};

const buildNumber = (prevKey, newKey) => {
  if (newKey == 0 && displayValue.toString().includes(".")) {
    // this case solves the problem of not being able to add a zero to the end of a float.
    // if it finds a decimal point in displayValue, it determines how many digits exist
    // after the decimal and forces the float to display one extra digit (a zero).
    let floatLength =
      displayValue.toString().length - displayValue.toString().indexOf(".");
    displayValue = parseFloat(displayValue).toFixed(floatLength);
    return;
  }
  if (prevKey == "number") {
    displayValue = parseFloat(displayValue.toString() + newKey.toString());
  } else if (prevKey == "decimal") {
    displayValue = parseFloat(displayValue.toString() + newKey.toString());
  }
};

const cycleVals = (newNum) => {
  prevVal = newVal;
  newVal = newNum;
  displayValue = newNum;
  displayOutput.textContent = displayValue;
};

const truncateDisplayValue = () => {
  if (displayValue.toString().length > 8) {
    wipeVariables();
    displayOutput.textContent = "oh!no";
  }
};

const wipeVariables = () => {
  displayValue = 0;
  prevVal = undefined;
  newVal = undefined;
  prevKey = "";
  nextOperation = undefined;
};

const removeOperatorHighlight = () => {
  addKey.style.backgroundColor = null;
  subtractKey.style.backgroundColor = null;
  multiplyKey.style.backgroundColor = null;
  divideKey.style.backgroundColor = null;
};

const debug = () => {
  console.log("prevVal is " + prevVal);
  console.log("newVal is " + newVal);
  console.log("displayValue is " + displayValue);
  console.log("prevKey is " + prevKey);
  console.log("nextOp is " + nextOperation);
};

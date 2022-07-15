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

const operate = (operation, num1, num2) => {
  return operation(num1, num2);
};

let displayValue = 0;
let prevVal = 0;
let newVal = 0;
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
];

const addNumButtonFunctionality = () => {
  for (let i = 0; i <= 9; i++) {
    keys[i].addEventListener("click", () => {
      //   displayValue = i;
      //   prevVal = newVal;
      //   newVal = i;
      //   displayOutput.textContent = displayValue;
      runNumKeyLogic(prevKey, i);
      prevKey = "number";
    });
  }
};

addNumButtonFunctionality();

const addAddButtonFunctionality = () => {
  addEventListener("click", () => {
    addKey.addEventListener("click", () => {
      nextOperation = add;
      prevKey = "operation";
    });
  });
};

addAddButtonFunctionality();

const addEqualsButtonFunctionality = () => {
  addEventListener("click", () => {
    equalsKey.addEventListener("click", () => {
      displayValue = operate(nextOperation, prevVal, newVal);
      displayOutput.textContent = displayValue;
      prevKey = "equals";
    });
  });
};

addEqualsButtonFunctionality();

const runNumKeyLogic = (prevKey, newKey) => {
  if (prevKey == "") {
    cycleVals(newKey);
  }
  if (prevKey == "number") {
    displayValue = parseInt(displayValue.toString() + newKey.toString());
    newVal = displayValue;
    displayOutput.textContent = displayValue;
  }
  if (prevKey == "operation") {
    cycleVals(newKey);
  }
  if (prevKey == "equals") {
    cycleVals(newKey);
  }
};

const cycleVals = (newNum) => {
  prevVal = newVal;
  newVal = newNum;
  displayValue = newNum;
  displayOutput.textContent = displayValue;
};

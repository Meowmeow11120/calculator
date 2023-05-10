// Get the display element and number buttons
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.btn:not(.orange)');
const clearButton = document.querySelector('.AC');
const signButton = document.querySelector('.sign');
const percentButton = document.querySelector('.gray');
const operationButtons = document.querySelectorAll('.orange:not(.equal)');
const equalsButton = document.querySelector('.equal');

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    });
});

// Add event listeners to operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        setOperation(button.textContent);
    });
});

// Add event listener to equals button
equalsButton.addEventListener('click', calculate);

// Add event listener to clear button
clearButton.addEventListener('click', clearDisplay);

// Add event listener to sign button
signButton.addEventListener('click', changeSign);

// Add event listener to percent button
percentButton.addEventListener('click', calculatePercent);

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
}

function setOperation(operation) {
    if (currentOperation !== null) {
        calculate();
    }

    firstOperand = display.textContent;
    currentOperation = operation;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperation === null || shouldResetDisplay) {
        return;
    }

    if (currentOperation === '÷' && display.textContent === '0') {
        alert("Can't divide by 0");
        clearDisplay();
        return;
    }

    secondOperand = display.textContent;
    display.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
    currentOperation = null;
}

function clearDisplay() {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function changeSign() {
    display.textContent = parseFloat(display.textContent) * -1;
}

function calculatePercent() {
    display.textContent = parseFloat(display.textContent) / 100;
}

function operate(operation, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operation) {
        case '+':
            return a + b;
        case '−':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            return a / b;
        default:
            return null;
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

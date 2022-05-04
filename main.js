class Calculator {

    constructor(previousOutputText, currentOutputText) {
        this.previousOutputText = previousOutputText;
        this.currentOutputText = currentOutputText;
        this.clear();
    }
    add() {

    }
    subtract() {

    }
    multiply() {

    }
    divide() {

    }
    clear() {
        this.currentUnit = '';
        this.previousUnit = '';
        this.operator = undefined;
        this.updateScreen();
    }
    delete() {

    }
    appendDigit(digit) {
        this.currentUnit = this.currentUnit.toString() + digit.toString();
    }
    selectOperator(operator) {

    }
    compute() {

    }
    updateScreen() {
        this.currentOutputText.innerText = this.currentUnit;
    }
}


const digitButtons = document.querySelectorAll('[data-digit]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-clear=clear]');
const deleteButton = document.querySelector('[data-delete=delete]');
const equalsButton = document.querySelector('[data-equals=equals]');
const previousOutputText = document.querySelector('.previous-output');
const currentOutputText = document.querySelector('.current-output');

const calculator = new Calculator(previousOutputText, currentOutputText);

digitButtons.forEach(digitButton => {
    digitButton.addEventListener('click', () => {
        if (currentOutputText.textContent.toString().includes('.') && digitButton.getAttribute('data-digit') == '.')
            return;
        calculator.appendDigit(digitButton.innerText);
        calculator.updateScreen();
    });
});
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        let text = currentOutputText.innerText.toString();
        let lastChar = text.charAt(text.length - 1);
        if (lastChar == '+' || lastChar == '÷' || lastChar == '×' || lastChar == '−')
            return;
        calculator.appendDigit(operatorButton.textContent);
        calculator.updateScreen();
    })
})

clearButton.addEventListener('click', () => calculator.clear());
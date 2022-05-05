class Calculator {

    expression = '';
    operator = '';
    currentResult = 0.0;
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
        if (this.currentOutputText.innerText.includes('=')) {
            return;
        }
        this.currentUnit = this.currentUnit.slice(0, -1);
        this.updateScreen();

    }
    appendDigit(digit) {
        this.currentUnit = this.currentUnit.toString() + digit.toString();
    }
    selectOperator(op) {
        this.operator = op;
        let newOperator = '';
        switch (op) {
            case '/':
                newOperator = '÷';
                calculator.divide();
                break;
            case '+':
                newOperator = '+';
                calculator.add();
                break;
            case '-':
                newOperator = '−';
                calculator.subtract();
                break;
            case '*':
                newOperator = '×';
                calculator.multiply();
                break;

        }
        if (this.previousUnit == '') {
            this.previousUnit = this.currentUnit + newOperator;
        } else {
            this.previousUnit = this.previousUnit + this.currentUnit + newOperator;

        }

        if (this.previousUnit == '') {
            this.expression = this.currentUnit + op;
        } else {
            this.expression += this.currentUnit + op;

        }
        this.currentUnit = '';

    }
    compute() {

        if (this.expression != '' && this.currentUnit != '' && this.previousUnit != '') {
            //Get lastChar of the upper expression, and if it is an operator then delete it
            let lastChar = this.expression.charAt(this.expression.length - 1);
            if (lastChar == '+' || lastChar == '/' || lastChar == '*' || lastChar == '-') {
                if (currentOutputText.textContent == '')
                    this.expression = this.expression.slice(0, -1);
                else
                    this.expression = this.expression + currentOutputText.textContent;
            } else {
                this.expression = this.previousUnit;
            }
            let answer = eval(this.expression);
            this.previousOutputText.textContent = this.previousUnit + currentOutputText.textContent;
            this.currentOutputText.textContent = '=           ' + answer.toString();
            this.expression = '';
            this.currentUnit = '';
            this.previousUnit = '';
        } else if (this.previousUnit != '') {
            //Get lastChar of the upper expression, and if it is an operator then delete it
            let lastChar = this.expression.charAt(this.expression.length - 1);
            if (lastChar == '+' || lastChar == '/' || lastChar == '*' || lastChar == '-') {
                if (currentOutputText.textContent == '')
                    this.expression = this.expression.slice(0, -1);
                else
                    this.expression = this.expression + currentOutputText.textContent;
            } else {
                this.expression = this.previousUnit;
            }
            let answer = eval(this.expression);
            this.previousOutputText.textContent = this.previousUnit + currentOutputText.textContent;
            this.currentOutputText.textContent = '=           ' + answer.toString();
            this.expression = '';
            this.currentUnit = '';
            this.previousUnit = '';
        } else return;

    }
    updateScreen() {
        this.currentOutputText.innerText = this.currentUnit;
        this.previousOutputText.innerText = this.previousUnit;
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

        //Multiple zeros barrier 
        if (digitButton.getAttribute('data-digit') == '0' && !currentOutputText.textContent.toString().includes('.') && currentOutputText.textContent.toString().includes('0'))
            return;

        calculator.appendDigit(digitButton.innerText);
        calculator.updateScreen();

    });
});
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        let text = previousOutputText.innerText.toString();
        let lastChar = text.charAt(text.length - 1);
        if ((lastChar == '+' || lastChar == '÷' || lastChar == '×' || lastChar == '−' || currentOutputText.textContent == '') && (currentOutputText.textContent == ''))
            return;
        switch (operatorButton.getAttribute('data-operator')) {
            case '/':
                calculator.selectOperator('/');
                break;
            case '+':
                calculator.selectOperator('+');
                break;
            case '-':
                calculator.selectOperator('-');
                break;
            case '*':
                calculator.selectOperator('*');
                break;
            case '=':
                calculator.selectOperator('=');
                break;

        }
        calculator.updateScreen();
    });
});

clearButton.addEventListener('click', () => calculator.clear());

equalsButton.addEventListener('click', () => calculator.compute());

deleteButton.addEventListener('click', () => calculator.delete());
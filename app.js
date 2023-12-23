const current = document.querySelector('#current');
const recent = document.querySelector('#recent');
const numButtons = document.querySelectorAll('.num')
const opButtons = document.querySelectorAll('.operations');
const clear = document.querySelector('#clear');
const delBtn = document.querySelector('#delete');
const equals = document.querySelector('#equals');
const decimal = document.querySelector('#decimal');

let a = 0, b, op, result;
const nextNum = [];
const opList = ['+','×','-','÷','mod'];

function operate( a, op, b){
    let ans = null;
    switch(op) {
        case '+': 
            ans = a + b;
            break;
        case '-': 
            ans = a - b;
            break;
        case '×':
            ans = a * b;
            break;
        case '÷':
            if((b == 0)) return current.textContent ='bruh';
            ans = a / b;
            break;
        case 'mod':
            if((b == 0 || a == 0)) return current.textContent ='bruh';
            ans = a % b;
            break;
    }

    result = Math.round((ans + Number.EPSILON)*100)/100;
    current.textContent = `${result}`;
    recent.textContent = `${a} ${op} ${b} =`
}

function isEmpty(val){
    return (val == null || val === '');
}

function handleNum(str) {
    if(!isEmpty(result) && isEmpty(op) || current.textContent == 'bruh') {
        clearAll();
    }
    if(current.textContent === '0' && str !== '.') current.textContent = '';

    if(isEmpty(op)) {
        let entry = current.textContent += str;
        a = +entry;

    }else if(!isEmpty(op)) {
        current.textContent += str;
        nextNum.push(str)
        b = +nextNum.join('');
    }
}

function handleOperator(str) {
    if((isEmpty(a)) || current.textContent.endsWith(op) || current.textContent.endsWith('.')) return;
    if(!isEmpty(b) && !isEmpty(op)){
        calculate();
    }
    if(!isEmpty(a) || !isEmpty(b)){
        current.textContent += str;
        op = str;
    }
}

function calculate() {
    if(isEmpty(a)|| isEmpty(b) || isEmpty(op)) return
    operate(a, op, b);
    a = result; b = undefined; op = undefined; nextNum.length = 0;
}

function clearAll() {
    recent.textContent = "";
    current.textContent = "0";
    a = 0; b = undefined; op = undefined; result = "";nextNum.length = 0;
}

function deleteNumber() {
    if(opList.some(operator => current.textContent.endsWith(operator))){
        current.textContent = current.textContent.slice(0, -1)
        op = undefined;
    }
    else if(opList.some(operator => current.textContent.includes(operator))){
        current.textContent = current.textContent.slice(0, -1)
        nextNum.splice(-1)
        b = +nextNum.join('');
    }
    else if(isEmpty(op)){
        current.textContent = current.textContent.slice(0, -1);
        a = +current.textContent;
        if(current.textContent == "") clearAll();
    }
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) handleNum(e.key)
    if (e.key === '.') handleDecimal()
    if (e.key === '=' || e.key === 'Enter') calculate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clearAll()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%')
    handleOperator(convertOp(e.key))
  }

function handleDecimal(){
    if(!isEmpty(b)){
        let secondEntry = current.textContent.split(op.toString());
        if(secondEntry[1].includes('.'))return;
    }
    else if(current.textContent.includes('.')) return;
    handleNum('.');
}

function convertOp(operator) {
    if(operator == '/') return '÷';
    if(operator == '*') return '×';
    if(operator == '%') return 'mod';
    return operator;
}
// -----------          EVENT LISTENERS      ---------------//
clear.onclick = () => clearAll();
decimal.onclick = () => handleDecimal();
window.addEventListener('keydown', handleKeyboardInput);
equals.onclick = () => calculate();
opButtons.forEach(button => button.addEventListener('click', () => handleOperator(button.textContent)));

numButtons.forEach(button => {
    button.addEventListener('click', function () {
        handleNum(button.textContent)
    });  
})

delBtn.onclick = () => {
    if(current.textContent == '0') return;
    deleteNumber();
}
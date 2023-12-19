const current = document.querySelector('#current');
const recent = document.querySelector('#recent');
const numButtons = document.querySelectorAll('.num')
const opButtons = document.querySelectorAll('.operations');
const clear = document.querySelector('#clear');
const delBtn = document.querySelector('#delete');
const equals = document.querySelector('#equals');

let a, b, op, result;
const nextNum = [];

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
            ans = a / b;
            break;
        case '%':
            ans = a % b;
            break;
        default: return 'error'
    }

    result = Math.round((ans + Number.EPSILON)*100)/100;
    current.textContent = `${result}`;
    recent.textContent = `${a} ${op} ${b} =`
}

function isEmpty(val){
    return (val == null || val === '');
}

function handleNum(str) {
    if(!isEmpty(result) && isEmpty(op)) {
        clearAll();
    }
    if(current.textContent === '0') current.textContent = '';

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
    if((isEmpty(a)) || current.textContent.endsWith(op)) return;
    if(!isEmpty(b)){
        calculate();
    }
    if(!isEmpty(a) || !isEmpty(b)){
        current.textContent += str;
        op = str;
    }
}

function calculate() {
    operate(a, op, b);
    console.log("a=", a, op, "b= ", b ," =", result )
    a = result; b = null; op = null; nextNum.length = 0;
}

function clearAll() {
    recent.textContent = "";
    current.textContent = "0";
    a = ""; b = ""; op = undefined; result = "";nextNum.length = 0;
}

// -----------          EVENT LISTENERS      ---------------//
numButtons.forEach(button => {
    button.addEventListener('click', () => handleNum(button.textContent));  
    }
)

opButtons.forEach(button => {
    button.addEventListener('click', () => handleOperator(button.textContent));
    }
)

clear.onclick = function(){
    clearAll();
}

equals.onclick = () => {
    if(isEmpty(a)|| isEmpty(b) || isEmpty(op)) return
    calculate()
}


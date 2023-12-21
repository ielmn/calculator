const current = document.querySelector('#current');
const recent = document.querySelector('#recent');
const numButtons = document.querySelectorAll('.num')
const opButtons = document.querySelectorAll('.operations');
const clear = document.querySelector('#clear');
const delBtn = document.querySelector('#delete');
const equals = document.querySelector('#equals');

let a = 0, b, op, result;
const nextNum = [];
const opList = ['+','×','-','÷','%'];

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
    if(!isEmpty(result) && isEmpty(op)
    || current.textContent == 'bruh') {
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
    operate(a, op, b);
    console.log("a=", a, op, "b= ", b ," =", result )
    a = result; b = null; op = null; nextNum.length = 0;
}

function clearAll() {
    recent.textContent = "";
    current.textContent = "0";
    a = 0; b = ""; op = undefined; result = "";nextNum.length = 0;
}

function deleteNumber() {
    if(opList.some(o => current.textContent.endsWith(o))){
        current.textContent = current.textContent.slice(0, -1)
        op = undefined;
    }
    else if(opList.some(o => current.textContent.includes(o))){
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
// -----------          EVENT LISTENERS      ---------------//
numButtons.forEach(button => {
    button.addEventListener('click', function () {
        //handle multiple decimals
        if(button.textContent == '.'){
            if(!isEmpty(b)){
                let secondEntry = current.textContent.split(op.toString());
                if(secondEntry[1].includes('.'))return;
            }
            else if(current.textContent.includes('.')) return;
        }
        handleNum(button.textContent)
    });  
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
    calculate();
}

delBtn.onclick = () => {
    if(current.textContent == '0') return;
    deleteNumber();
}

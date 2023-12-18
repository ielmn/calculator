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

    switch(op) {
        case '+': 
            result = a + b;
            break;
        case '-': 
            result = a - b;
            break;
        case '×':
            result = a * b;
            break;
        case '÷':
            result = a / b;
            break;
        case '%':
            result = a % b;
            break;
        default: return 'error'
    }
    current.textContent = `${result}`;
    recent.textContent = `${a} ${op} ${b} =`
}

function isEmpty(val){
    return (val == null || val === '');
}

function handleNum(str) {
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
    // if(!isEmpty(a) && !isEmpty(b)){
    //     operate(a, op, b);
    // }
    if(!isEmpty(a) || !isEmpty(b)){
        current.textContent += str;
        op = str;
        console.log("a=", a, op, "b=", b )
    }
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
    recent.textContent = "";
    current.textContent = "0";
    a = ""; b = ""; op = undefined; result = "";nextNum.length = 0;
}

equals.onclick = () => {
    if(isEmpty(a)|| isEmpty(b) || isEmpty(op)) return
    operate(a, op, b);
    a = result;
    b;
    nextNum.length = 0;
}

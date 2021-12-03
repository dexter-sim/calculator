const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("8");
const nine = document.getElementById("9");
const zero = document.getElementById("0");
const decimal = document.getElementById("decimal");

let previous = 0;
let current = 0;
let op = null;
let decimalPlaces = 0;
let dec = false;

const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equal = document.getElementById("equal");
const prev = document.getElementById("prev");
const curr = document.getElementById("curr");

decimal.addEventListener("click", () => {
    if (!dec){
        dec = true;
        decimalPlaces++;
    }
});
one.addEventListener("click", () => {appendNum(1);});
two.addEventListener("click", () => {appendNum(2);});
three.addEventListener("click", () => {appendNum(3);});
four.addEventListener("click", () => {appendNum(4);});
five.addEventListener("click", () => {appendNum(5);});
six.addEventListener("click", () => {appendNum(6);});
seven.addEventListener("click", () => {appendNum(7);});
eight.addEventListener("click", () => {appendNum(8);});
nine.addEventListener("click", () => {appendNum(9);});
zero.addEventListener("click", () => {appendNum(0);});

backspace.addEventListener("click", backspaceHelper);
clear.addEventListener("click", () => {curr.textContent = "0"; prev.textContent = "---"; previous = 0; current = 0; op = null;});

function backspaceHelper(){
    if (curr.textContent !== "0"){
        curr.textContent = curr.textContent.substring(0, curr.textContent.length - 1);
        if (curr.textContent.length === 0){
            curr.textContent = "0";
        }
        if (decimalPlaces >= 1){
            decimalPlaces--;
            if (decimalPlaces === 1){
                curr.textContent = curr.textContent.substring(0, curr.textContent.length - 1);
                dec = false;
            }
        }
        if (curr.textContent.length > 0){
            current = parseFloat(curr.textContent, 10);
        } else {
            current = 0;
        }
    }
}

function appendNum(digit){
    if (dec) {
        curr.textContent += "." + digit;
        current += digit/10;
        dec = false;
        decimalPlaces++;
    } else if (curr.textContent === "0"){
        curr.textContent = digit;
        current = digit;
    } else if (decimalPlaces > 0){
        curr.textContent += digit;
        current += digit / (Math.pow(10, decimalPlaces));
        decimalPlaces++;
    } else {
        curr.textContent += digit;
        current = current * 10 + digit;
    }
}


add.addEventListener("click", addHelper);
function addHelper(){
    dec = false;
    decimalPlaces = 0;
    if (previous !== 0){
        evaluate();
    }
    previous = current;
    prev.textContent = previous + " +";
    op = "add";
    current = null;
    curr.textContent = " ";
}

subtract.addEventListener("click", () => {
    dec = false;
    decimalPlaces = 0;
    evaluate();
    previous = current;
    prev.textContent = previous + " -";
    op = "subtract";
    current = null;
    curr.textContent = " ";
});

multiply.addEventListener("click", () => {
    dec = false;
    decimalPlaces = 0;
    evaluate();
    previous = current;
    prev.textContent = previous + " ×";
    op = "multiply";
    current = null;
    curr.textContent = " ";
});

divide.addEventListener("click", () => {
    dec = false;
    decimalPlaces = 0;
    evaluate();
    previous = current;
    prev.textContent = previous + " ÷";
    op = "divide";
    current = null;
    curr.textContent = " ";
});

equal.addEventListener("click", evaluate);
function evaluate(){
    dec = false;
    decimalPlaces = 0;
    const res = operator(previous, current, op)
    curr.textContent = res;
    if (res === "undefined"){
        current = 0;
        previous = 0;
    } else {
        current = res;
    }
    op = null;
}

function operator(num1, num2, op){
    if (current === null){return num1};
    return op === "add" 
        ? num1 + num2 
        : op === "subtract"
        ? num1 - num2
        : op === "multiply"
        ? num1 * num2
        : op === "divide"
        ? operatorDivide(num1, num2)
        : num2;
}

function operatorDivide(num1, num2){
    if (num2 === 0){
        return "undefined";
    } else {
        return num1 / num2;
    }
}
const buttonElements = document.getElementsByClassName('button');
const result = document.getElementById('result');
const resultList = document.getElementById('result_list');

let firstInput = true;
let dotUsed = false;

//const signElements = document.getElementsByClassName('calc_sign');

// for(let i=0; i < numberElements.length; i++){
//        numberElements[i]
// }

// Array.from(numberElements).forEach(element => {
//     element.addEventListener
// })


for(const buttonElement of buttonElements) {
    buttonElement.addEventListener('click', () => {
       buttonListener(buttonElement);
        
    })
}

const buttonListener = (button) => {
    if (button.innerText == '=') {
        calculate2();
        
    } else if(button.innerText == 'C') {
        resetToZero();
        firstInput = true;
    } else if (button.innerText == '.') {
        if (dotUsed) {
            console.log('!!!')
            return;
        } else {
            dotUsed = true;
            display(button.innerText);
        }
    } else if (!isCharNumeric(button.innerText)) {
        dotUsed = false;
        display(button.innerText);
    } else {
        display(button.innerText);
    }
}

const clearResult = () => {
    result.innerText = '';
}

const resetToZero = () => {
    result.innerText = '0';
}

const display = (value) => {
    if (firstInput) {
        clearResult();
        firstInput = false;
    }
    result.innerText += value;
}

const calculate = () => {
    let res = eval(result.innerText); // använd ej eval!
    display('=' + res)
    firstInput = true;
    displayResult(result.innerHTML)
}

const calculate2 = () => {
    let currentNumString = '';
    let currentNumber = 0;
    let currentResult = 0;
    let currentSign = 'X';
    for (let char of result.innerText) {
        
        if (isCharNumeric(char) || char == '.') {
            
            currentNumString += char;
            console.log('!num!', 'char:',char, 'currentNumber:',currentNumber, 'currentResult:', currentResult, 'currentSign:',currentSign);
            
            //console.log(currentNumString);
        } else if (currentSign == 'X') {
            currentResult = parseFloat(currentNumString);
            currentNumString = ''
            currentSign = char;
            console.log('!first_sign!', 'char:',char, 'currentNumber:',currentNumber, 'currentResult:', currentResult, 'currentSign:',currentSign, dotUsed);
        } else {
            currentNumber = parseFloat(currentNumString);
            currentResult = updateCurrentResult(currentResult, currentNumber, currentSign);
            currentSign = char;
            currentNumString = ''
            console.log('!sign!', 'char:',char, 'currentNumber:',currentNumber, 'currentResult:', currentResult, 'currentSign:',currentSign, dotUsed);
        }
        
    }
    currentNumber = parseFloat(currentNumString);
        currentResult = updateCurrentResult(currentResult, currentNumber, currentSign);
        //console.log(currentNumber, currentSign);
        currentResult = +currentResult.toFixed(2)
        display('=' + currentResult)
        firstInput = true;
        displayResult(result.innerHTML)
        console.log('!end!',  'currentNumber:',currentNumber, 'currentResult:', currentResult, 'currentSign:',currentSign);
}

const updateCurrentResult = (currentResult, currentNumber,  currentSign) => {
    console.log('!update!', currentResult, currentNumber, currentSign)
    if (currentSign == '+') {
        return currentResult + currentNumber;
    } else if (currentSign == '-') {
        return currentResult - currentNumber;
    } else if (currentSign == '*') {
        return currentResult * currentNumber;
    } else if (currentSign == '/') {
        return currentResult / currentNumber;
    }
}
   


const isCharNumeric = (char) => {
    return !isNaN(parseInt(char));
}

const displayResult = (result) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = result;
    resultList.appendChild(listItem);
}
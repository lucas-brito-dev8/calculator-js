const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const equal = document.getElementById('equal');
const comma = document.getElementById('float');
const simbols = ['+', '-', '*', '/'];

//Exibir números no display
const displayNums = function () {
    numbers.forEach(num => {
        let content = num.textContent;

        num.addEventListener('click', () => {
            display.textContent += content;
        })
    })
};

displayNums();

//Exibir vírgula no display
const displayComma = function () {
    comma.addEventListener('click', () => {
        let lastChar = display.textContent[display.textContent.length - 1];
        let lastNum = display.textContent.split(/[+\-*/]/).pop();

        if (display.textContent !== '' && !simbols.includes(lastChar) && !lastNum.includes(comma.textContent)) {
            display.textContent += comma.textContent;
        }
    })
};

displayComma();

//Calcular
const result = function () {
    try {
        const expression = display.textContent.replace(/,/g, '.');
        const nums = expression.match(/\d+[.,]?\d*/g);
        const operators = expression.match(/[+\-*/]/g);

        if (!operators) {
            return;
        }

        for (let i = 0; i < operators.length; i++) {
            switch (operators[i]) {
                case '*':
                    nums[i] = Number(nums[i]) * Number(nums[i + 1]);
                    nums.splice(i + 1, 1);
                    operators.splice(i, 1);
                    i--;
                    break;
                case '/':
                    if (Number(nums[i + 1]) === 0) {
                        throw new Error('Divisão por zero.');
                    }
                    nums[i] = Number(nums[i]) / Number(nums[i + 1]);
                    nums.splice(i + 1, 1);
                    operators.splice(i, 1);
                    i--;
                    break;
            }
        }

        for (let j = 0; j < operators.length; j++) {
            switch (operators[j]) {
                case '+':
                    nums[j] = Number(nums[j]) + Number(nums[j + 1]);
                    nums.splice(j + 1, 1);
                    operators.splice(j, 1);
                    j--;
                    break;
                case '-':
                    nums[j] = Number(nums[j]) - Number(nums[j + 1]);
                    nums.splice(j + 1, 1);
                    operators.splice(j, 1);
                    j--;
                    break;
            }
        }

        return display.textContent = nums[0].toString().replace('.', ',');

    } catch (error) {
        display.textContent = 'Erro.';
    }
};

//Limpar display e exibir resultado
const clean = function () {
    const cBtn = document.querySelector('#clean');

    //Botão clean
    cBtn.addEventListener('click', () => {
        display.textContent = '';
    })

    //Callback da result
    equal.addEventListener('click', () => {
        result();
    })
};

clean();

const operations = document.querySelectorAll('.operations');

//Exibir sinais de operações
const displayOpr = function () {
    operations.forEach(opr => {
        let content = opr.textContent;

        opr.addEventListener('click', () => {
            let lastChar = display.textContent[display.textContent.length - 1];

            if (display.textContent !== '' && !simbols.includes(lastChar) && lastChar !== comma.textContent) {
                display.textContent += content;
            }
        })
    })
};

displayOpr();
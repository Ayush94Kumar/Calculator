let input = document.getElementById("inputbtn");
let buttons = document.querySelectorAll("button");

function operation(exp) {
    let value = [];
    let oper = [];

    exp = String(exp);
    let num = "";

    function applyOp() {
        let b = value.pop();
        let a = value.pop();
        let op = oper.pop();

        if (op === '+') value.push(a + b);
        else if (op === '-') value.push(a - b);
        else if (op === '*') value.push(a * b);
        else if (op === '/') value.push(a / b);
        else if (op === '%') value.push(a % b);
    }

    function prec(op) {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/' || op === '%') return 2;
        return 0;
    }

    for (let i = 0; i < exp.length; i++) {
        let ch = exp[i];

        if ((ch >= '0' && ch <= '9') || ch === '.') {
            num += ch;
        } else {
            if (num !== "") {
                value.push(Number(num));
                num = "";
            }

            if (ch === ' ') continue;

            if (ch === '(') {
                oper.push(ch);
            } else if (ch === ')') {
                while (oper.length && oper.at(-1) !== '(') {
                    applyOp();
                }
                oper.pop(); // remove '('
            } else {
                while (
                    oper.length &&
                    prec(oper.at(-1)) >= prec(ch)
                ) {
                    applyOp();
                }
                oper.push(ch);
            }
        }
    }

    if (num !== "") {
        value.push(Number(num));
    }

    while (oper.length) {
        applyOp();
    }

    return value[0];
}


let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerHTML;

        if (value == '=') {
            string = operation(string).toString();
            input.value = string;
        }
        else if (value == 'AC') {
            string = "";
            input.value = string;
        }
        else if (value == 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } else {
            let last = string.at(-1);

            if (
                ['+', '-', '*', '/', '%'].includes(last) &&
                ['+', '-', '*', '/', '%'].includes(value)
            ) {
                return;
            }
            string += value;
            input.value = string;
        }

    });
});
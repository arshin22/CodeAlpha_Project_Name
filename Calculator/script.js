const input = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');
let string = "";
const arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;

        if (value === '=') {
            try {
                string = eval(string);
                if (string === Infinity || string === -Infinity) {
                    input.value = "Error";
                    string = "";
                } else {
                    input.value = string;
                }
            } catch {
                input.value = "Error";
                string = "";
            }
        } else if (value === 'AC') {
            string = "";
            input.value = "0";
        } else if (value === 'C') {
            string = string.slice(0, -1);
            input.value = string || "0";
        } else {
            if (string === "0" && !isNaN(value)) {
                string = value;
            } else {
                string += value;
            }
            input.value = string;
        }
        input.scrollLeft = input.scrollWidth;
    });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key) || key === '.') {
        string += key;
        input.value = string;
    } else if (key === 'Enter' || key === '=') {
        try {
            string = eval(string);
            input.value = string;
        } catch {
            input.value = "Error";
            string = "";
        }
    } else if (key === 'Backspace') {
        string = string.slice(0, -1);
        input.value = string || "0";
    } else if (key === 'Escape') {
        string = "";
        input.value = "0";
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        string += key;
        input.value = string;
    }
    input.scrollLeft = input.scrollWidth;
});
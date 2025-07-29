// i need to make a simple counter works

const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");
const increase = document.getElementById("increase");
const label = document.getElementById("label");

let count = 0;

function updateDisplay() {
    label.textContent = count; 
}

decrease.onclick = function() {
    count--;
    updateDisplay()
}

reset.onclick = function() {
    count = 0;
    updateDisplay()
}

increase.onclick = function() {
    count++;
    updateDisplay()
}
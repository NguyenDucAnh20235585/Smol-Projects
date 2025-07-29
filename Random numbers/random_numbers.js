// i need to make a random number generate

const random = document.getElementById("random")
const reset = document.getElementById("reset")
const label = document.getElementById("label")

const min = 0;
const max = 100;

let count = 0;

function generate_random_number() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

random.onclick = function () {
    const randomNumber = generate_random_number();
    label.textContent = "Your random generated number is: " + randomNumber;
}

reset.onclick = function() {
    label.textContent = "Your number will be reset to " + 0;
}
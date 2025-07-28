// i need to make a simple counter works

let count = 0;

document.getElementById("increase").onclick = function() {
    count = count + 1;
    document.getElementById("h1").textContent = count;
}

document.getElementById("decrease").onclick = function() {
    count = count - 1;
    document.getElementById("h1").textContent = count;
}

document.getElementById("reset").onclick = function() {
    count = 0;
    document.getElementById("h1").textContent = count;
}
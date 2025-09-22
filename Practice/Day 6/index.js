const quotes = [
    "If she wins, it's all hers. If she lost, it's my fault.",
    "I will make Haru Urara won Arima Kinen. No, I will make Urara won it.",
    "She tried her best. Rest in peace.",
    "I will make all my doubters sway in fear.",
    "If Urara can do it, why can't I?",
    "I will be the villain for my hero so that you can shine."
]

function generate_quote(){

    let random_index = Math.floor(Math.random() * quotes.length);

    const select_quote = quotes[random_index];

    document.getElementById("quote_paragraph").textContent = select_quote;
}

function reset_everything() {
    document.getElementById("quote_paragraph").textContent = "";
}

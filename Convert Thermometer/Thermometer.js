const button1 = document.getElementById("button1");

const button2 = document.getElementById("button2");

const text_box = document.getElementById("text_box");

const submit = document.getElementById("submit");

const answer = document.getElementById("answer");

function convert() {

    const temp = Number(text_box.value);

    if (temp === "") {

        answer.textContent = "Enter a temperature, human.";

        return;
    }

    if (isNaN(temp)) {

        answer.textContent = "That's not a number, human.";

        return;

    }

    if (button1.checked){

        const celcius = (temp - 32)/ 1.8;

        answer.textContent = `I think it is ${celcius.toFixed(1)} ℃, human`;
    }

    else if (button2.checked){

        const farenheit = temp * 1.8 + 32;

        answer.textContent = `I think it is ${farenheit.toFixed(1)} ℉, human`;
    }

    else{

        answer.textContent = "Make a choice, human.";

    }

}

submit.addEventListener("click", convert);

text_box.addEventListener("keydown", (e) => {
    if (e.key === "Enter") convert();
});
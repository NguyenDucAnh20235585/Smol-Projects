const display = document.getElementById("display");

let timer = null;

let start_time = 0;

let elapsed_time = 0;

let is_running = false;

function start(){

    if(!is_running){
        start_time = Date.now() - elapsed_time;

        timer = setInterval(update, 10);

        console.log(timer); //test purpose
        
        is_running = true;
    }

    console.log(start_time); //test purpose
}

function stop(){

    if(is_running){

        clearInterval(timer);

        elapsed_time = Date.now() - start_time;

        is_running = false;
    }
}

function reset(){

    clearInterval(timer);

    start_time = 0;

    elapsed_time = 0;

    is_running = false;

    display.textContent = "00:00:00:00";
}

function update(){

    const current_time = Date.now();

    elapsed_time = current_time - start_time;

    let hours = Math.floor(elapsed_time / (1000 * 60 * 60));

    let minutes = Math.floor(elapsed_time / (1000 * 60) % 60);

    let seconds = Math.floor(elapsed_time / 1000 % 60);

    let miliseconds = Math.floor(elapsed_time % 1000 / 10);

    hours = String(hours).padStart(2, "0");

    minutes = String(minutes).padStart(2, "0");

    seconds = String(seconds).padStart(2, "0");

    miliseconds = String(miliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}
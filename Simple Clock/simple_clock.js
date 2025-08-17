function update_clock(){

    const current_time = new Date();

    const hours = current_time.getHours().toString().padStart(2, 0);

    const minutes = current_time.getMinutes().toString().padStart(2, 0);

    const seconds = current_time.getSeconds().toString().padStart(2, 0);

    const time_string = `${hours}:${minutes}:${seconds}`;

    document.getElementById("clock").textContent = time_string;
}

update_clock();

setInterval(update_clock, 1000);
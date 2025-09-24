function update_clock(){
    const now = new Date();
    const current_hours = now.getHours();
    const current_minutes = now.getMinutes();
    const current_seconds = now.getSeconds();
    const time_string = `${current_hours}:${current_minutes}:${current_seconds}`;
    document.getElementById("clock_container").textContent = time_string;
};

update_clock();

setInterval(update_clock, 1000);
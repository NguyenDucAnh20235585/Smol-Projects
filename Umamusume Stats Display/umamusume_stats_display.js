document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('confirm_button').addEventListener('click', show_uma);
});

function show_uma(){
    const select_uma = document.getElementById("umas");
    const chosen_uma = select_uma.value;

    document.getElementById("select-umas").classList.add("hidden");

    const uma_display = document.getElementById("display-informations");
    uma_display.classList.remove("hidden");

    fetch("umas.json") 
        .then(res => res.json())
        .then(data => {
            const uma = data.umas.find(u => u.name === chosen_uma);

            if (!uma) {
                console.error("Uma not found! Trainer goes berserk!");
                return;
            }

            document.getElementById("selected-uma-name").textContent = uma.name;

            const growthValues = document.querySelectorAll("#stat-growth-list .growth-value");
            growthValues[0].textContent = uma.stat_growth.SPD;
            growthValues[1].textContent = uma.stat_growth.STA;
            growthValues[2].textContent = uma.stat_growth.POW;
            growthValues[3].textContent = uma.stat_growth.GUTS;
            growthValues[4].textContent = uma.stat_growth.WIT;

            document.getElementById("turf-aptitude").textContent = uma.track_aptitudes.Turf;
            document.getElementById("dirt-aptitude").textContent = uma.track_aptitudes.Dirt;

            document.getElementById("sprint-aptitude").textContent = uma.distance_aptitude.Sprint;
            document.getElementById("mile-aptitude").textContent = uma.distance_aptitude.Mile;
            document.getElementById("med-aptitude").textContent = uma.distance_aptitude.Med;
            document.getElementById("long-aptitude").textContent = uma.distance_aptitude.Long;

            document.getElementById("front-aptitude").textContent = uma.pace_aptitude.Front;
            document.getElementById("pace-aptitude").textContent = uma.pace_aptitude.Pace;
            document.getElementById("late-aptitude").textContent = uma.pace_aptitude.Late;
            document.getElementById("end-aptitude").textContent = uma.pace_aptitude.End;  

            // Add data attributes for coloring the grades
            document.getElementById("turf-aptitude").setAttribute("data-grade", uma.track_aptitudes.Turf);
            document.getElementById("dirt-aptitude").setAttribute("data-grade", uma.track_aptitudes.Dirt);

            document.getElementById("sprint-aptitude").setAttribute("data-grade", uma.distance_aptitude.Sprint);
            document.getElementById("mile-aptitude").setAttribute("data-grade", uma.distance_aptitude.Mile);
            document.getElementById("med-aptitude").setAttribute("data-grade", uma.distance_aptitude.Med);
            document.getElementById("long-aptitude").setAttribute("data-grade", uma.distance_aptitude.Long);

            document.getElementById("front-aptitude").setAttribute("data-grade", uma.pace_aptitude.Front);
            document.getElementById("pace-aptitude").setAttribute("data-grade", uma.pace_aptitude.Pace);
            document.getElementById("late-aptitude").setAttribute("data-grade", uma.pace_aptitude.Late);
            document.getElementById("end-aptitude").setAttribute("data-grade", uma.pace_aptitude.End);

        })
        .catch(err => console.error("Monkey scream:", err));
}

function go_back(){
    document.getElementById("display-informations").classList.add("hidden");

    document.getElementById("select-umas").classList.remove("hidden");
}
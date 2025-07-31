// guessing number, huh?

const input = document.getElementById("input");

const submit = document.getElementById("submit");

const h3 = document.getElementById("H3");

const remaining = document.getElementById("remaining");

const min = 1;

const max = 100;

const max_attempts = 16;

const answer = Math.floor(Math.random() * (max - min + 1)) + min

let guess;

let attempt = 0;

let running = true;

function update_attempt(){

    let remaining_attempts = max_attempts - attempt;

    remaining.textContent = `Remaining: ${remaining_attempts} attempts, human!!!`
    
}

function papyrus_guessing(){

        if (!running) return;

        guess = input.value.trim();

        if(!guess) {

        h3.textContent = "Enter a number, human!";

        return;
    }

        guess = Number(guess);

        if(isNaN(guess)){

            h3.textContent = "Not a number. Pick again, human.";

            return;
        }

        if((guess < min) || (guess > max)) {

            h3.textContent = "Pick from 1 to 100, human."

            return;
        }

        attempt++

        update_attempt();

        if(guess === answer) {
            
            h3.textContent = `NYEH HEH HEH! ABOUT ${attempt} attempts, I guess?`

            running = false;
        }
        else if (attempt >= max_attempts) {

            h3.textContent = `The answer was ${answer}, too bad human.`

            running = false;
        }

        else if (guess < answer) {

            h3.textContent = "Too low, human! Try Again";
        }

        else{

            h3.textContent = "Too high, human! Try Again";
        }

        input.value ="";
    
        }


submit.addEventListener("click", papyrus_guessing);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") papyrus_guessing();
});

update_attempt();
const choices = ["rock", "paper", "scissors"];

const kris_display = document.getElementById("kris_display");

const queen_display = document.getElementById("queen_display");

const result_display = document.getElementById("result_display");

const kris_score_display = document.getElementById("kris_score_display");

const queen_score_display = document.getElementById("queen_score_display");

let kris_score = 0;

let queen_score = 0;

function play_game(kris_make_a_choice){

    const queen_choice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if(kris_make_a_choice === queen_choice){

        result = "OH NO WHAT THAT? IT'S A TIE!";

    }

    else{
        switch(kris_make_a_choice){
            case "rock":
                result = (queen_choice === "scissors") ? "Kris you won!" : "LMAO you lose!";
                break;

            case "paper":
                result = (queen_choice === "rock") ? "Kris you won!" : "LMAO you lose!";
                break;

            case "scissors":
                result = (queen_choice === "paper") ?  "Kris you won!" : "LMAO you lose!";
                break;
        }
    }

    kris_display.textContent = `Kris: ${kris_make_a_choice}`;

    queen_display.textContent = `Queen: ${queen_choice}`;

    result_display.textContent = result;

    result_display.classList.remove("victory_text", "lose_text");

    switch(result){
        case "Kris you won!":
            result_display.classList.add("victory_text");
            kris_score++;
            kris_score_display.textContent = kris_score;
            break;

        case "LMAO you lose!":
            result_display.classList.add("lose_text");
            queen_score++;
            queen_score_display.textContent = queen_score;
            break;
    }

    check_and_reset_scores();
}



function check_and_reset_scores(){

    if(kris_score >= 5 || queen_score >= 5) {

    const winner = kris_score >= 5 ? "Kris" : "Queen";

    const loser = kris_score < 5 ? "Kris" : "Queen";

    result_display.textContent = `${winner} wins the game. ${loser} got teabagged. Resetting after 15 seconds.`;

        setTimeout(() => {
            kris_score = 0;
            queen_score = 0;

            kris_score_display.textContent = kris_score;

            queen_score_display.textContent = queen_score;

            result_display.textContent = 'Reset! Play again. I"ll beat u this time!';

            result_display.classList.remove("victory_text", "lose_text");
        }, 15000);

}
}

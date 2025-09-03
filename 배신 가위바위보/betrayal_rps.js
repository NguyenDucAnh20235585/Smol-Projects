const choices = ["rock", "paper", "scissors"];

const kris_declaration_display = document.getElementById("kris_declaration");
const queen_declaration_display = document.getElementById("queen_declaration");
const kris_secret_choice_display = document.getElementById("kris_secret_choice");
const queen_secret_choice_display = document.getElementById("queen_secret_choice");
const result_display = document.getElementById("result_display");
const kris_score_display = document.getElementById("kris_score_display");
const queen_score_display = document.getElementById("queen_score_display");

let kris_score = 0;
let queen_score = 0;
let kris_declared_move = null;
let queen_declared_move = null;

function declare_move(kris_choice){
    // Store declared moves
    kris_declared_move = kris_choice;
    queen_declared_move = choices[Math.floor(Math.random() * 3)];
    
    // Update display
    kris_declaration_display.textContent = `Kris declared: ${kris_declared_move}`;
    queen_declaration_display.textContent = `Queen declared: ${queen_declared_move}`;
    
    // Switch to execution phase after delay
    setTimeout(() => {
        document.getElementById("declaration_buttons").style.display = "none";
        document.getElementById("execution-phase").style.display = "block";
        result_display.textContent = "Now choose your actual move!";
        
        // Clear previous actual moves display
        kris_secret_choice_display.textContent = "Kris played: ";
        queen_secret_choice_display.textContent = "Queen played: ";
    }, 1000);
}

function play_actual_move(kris_actual_move) {
    // Generate queen's actual move
    const queen_actual_move = choices[Math.floor(Math.random() * 3)];
    
    // Update display with actual choices
    kris_secret_choice_display.textContent = `Kris played: ${kris_actual_move}`;
    queen_secret_choice_display.textContent = `Queen played: ${queen_actual_move}`;
    
    // Determine winner
    let result = "";
    
    if (kris_actual_move === queen_actual_move) {
        result = "OH NO WHAT THAT? IT'S A TIE!";
    } else {
        switch(kris_actual_move) {
            case "rock":
                result = (queen_actual_move === "scissors") ? "Kris you won!" : "LMAO you lose!";
                break;
            case "paper":
                result = (queen_actual_move === "rock") ? "Kris you won!" : "LMAO you lose!";
                break;
            case "scissors":
                result = (queen_actual_move === "paper") ? "Kris you won!" : "LMAO you lose!";
                break;
        }
    }
    
    // Apply betrayal scoring
    result_display.classList.remove("victory_text", "lose_text");
    
    switch(result) {
        case "Kris you won!":
            const kris_points = kris_actual_move === kris_declared_move ? 2 : 1;
            kris_score += kris_points;
            kris_score_display.textContent = kris_score;
            result_display.textContent = `Kris wins with ${kris_points} point(s)!`;
            result_display.classList.add("victory_text");
            break;
            
        case "LMAO you lose!":
            const queen_points = queen_actual_move === queen_declared_move ? 2 : 1;
            queen_score += queen_points;
            queen_score_display.textContent = queen_score;
            result_display.textContent = `Queen wins with ${queen_points} point(s)!`;
            result_display.classList.add("lose_text");
            break;
            
        default:
            result_display.textContent = result;
    }
    
    // Show declaration buttons again for next round
    setTimeout(() => {
        document.getElementById("declaration_buttons").style.display = "block";
        document.getElementById("execution-phase").style.display = "none";
        check_and_reset_scores();
    }, 2000);
}

function check_and_reset_scores() {
    if (kris_score >= 5 || queen_score >= 5) {
        const winner = kris_score >= 5 ? "Kris" : "Queen";
        const loser = kris_score >= 5 ? "Queen" : "Kris";
        
        result_display.textContent = `${winner} wins the game. ${loser} got teabagged. Resetting after 10 seconds.`;
        
        setTimeout(() => {
            kris_score = 0;
            queen_score = 0;
            kris_score_display.textContent = kris_score;
            queen_score_display.textContent = queen_score;
            result_display.textContent = 'Reset! Play again. I"ll beat u this time!';
            result_display.classList.remove("victory_text", "lose_text");
            
            // Reset declaration displays
            kris_declaration_display.textContent = "Kris declared: ";
            queen_declaration_display.textContent = "Queen declared: ";
        }, 10000); 
    }
}
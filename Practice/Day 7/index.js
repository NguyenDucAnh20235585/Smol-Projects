const counter = document.getElementById("counter");

let count = 0;

function update_counter(){
    counter.textContent = count;

    if (count === 0){
    counter.style.color = "grey";
    }
    else if (count < 0){
    counter.style.color = "turquoise";
    }
    else if (count > 0){
    counter.style.color = "green";    
    }
    else{
    counter.textContent = "WTF is this, human?"
    }
}

function increase(){
    count++;
    update_counter();
}

function decrease(){
    count--;
    update_counter();
}

function reset(){
    count = 0;
    update_counter();
}
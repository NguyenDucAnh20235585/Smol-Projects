const counter = document.getElementById("counter");

let count = 0;

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

function update_counter(){
  counter.textContent = count;

  if (count === 0){
    counter.style.color = "grey";
  }

  else if (count > 0 && count < 30){
    counter.style.color = "crimson";
  }

  else if (count > -30 && count < 0){
    counter.style.color = "aquamarine";
  }

  else{
    counter.textContent = "Human, i can't count anymore."
    counter.style.color = "black";
  }

}
let player1RedChip = 0;
let bankRemainingRedChip = 7;

const player1RedDiv = document.querySelector("#player1RedChip");
const bankRemainingRedDiv = document.querySelector("#bankRemainingRedChip");
const additionButton = document.querySelector("#addChip");

function render(){
  player1RedDiv.textContent = player1RedChip;
  bankRemainingRedDiv.textContent = bankRemainingRedChip;
}

additionButton.addEventListener("click", ()  => {
  if (bankRemainingRedChip <= 0) return;
  bankRemainingRedChip--;
  player1RedChip++;
  render();
})

render();
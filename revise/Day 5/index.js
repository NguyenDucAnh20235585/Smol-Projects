const COLORS = ["Red", "Green", "Blue", "Brown", "White", "Wild"];

const state = {
  player1: Object.fromEntries(COLORS.map(c => [c, 0])),
  bank: { Red: 7, Green: 7, Blue: 7, Brown: 7, White: 7, Wild: 5 }
};

function render() {
  for (const color of COLORS) {
    document.querySelector(`#player1${color}Chip`).textContent = state.player1[color];
    document.querySelector(`#bankRemaining${color}Chip`).textContent = state.bank[color];
  }

  document.querySelectorAll("#player1 .chipButton").forEach(btn => {
    const action = btn.dataset.action;
    const color = btn.dataset.color;

    if (action === "add") btn.disabled = state.bank[color] <= 0;
    if (action === "remove") btn.disabled = state.player1[color] <= 0;
  });
}

function moveToken(color, from, to) {
  if (state[from][color] <= 0) return;
  state[from][color]--;
  state[to][color]++;
}

function handleClick(e) {
  const btn = e.target.closest(".chipButton");
  if (!btn) return;

  const action = btn.dataset.action; 
  const color = btn.dataset.color;

  if (action === "add") moveToken(color, "bank", "player1");
  if (action === "remove") moveToken(color, "player1", "bank");

  render();
}

document.querySelector("#player1").addEventListener("click", handleClick);

render();
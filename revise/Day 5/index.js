const COLORS = ["Red", "Green", "Blue", "Brown", "White", "Wild"];

const state = {
  player1: Object.fromEntries(COLORS.map(c => [c, 0])),
  bank: { Red: 7, Green: 7, Blue: 7, Brown: 7, White: 7, Wild: 5 }
};

const selected = Object.fromEntries(COLORS.map(c => [c, 0]));

const playerSection = document.querySelector("#player1");
const selectedTextEl = document.querySelector("#selectedText");
const confirmButton = document.querySelector("#confirmTake");
const clearButton = document.querySelector("#clearTake");

function totalChip(obj){
  return Object.values(obj).reduce((a, b) => a + b, 0);
}

function render(){
  for (const c of COLORS) {
    document.querySelector(`#player1${c}Chip`).textContent = state.player1[c];
    document.querySelector(`#bankRemaining${c}Chip`).textContent = state.bank[c];
  }

  const parts = [];
  for (const c of COLORS) if (selected[c] > 0) parts.push(`${c} x${selected[c]}`);
  selectedTextEl.textContent = parts.length ? parts.join(", ") : "none";

  const player1TotalChip = totalChip(state.player1);
  const selectedTotalChip = totalChip(selected);

  confirmButton.disabled =
    (selectedTotalChip === 0) ||
    (player1TotalChip + selectedTotalChip > 10) ||
    (!isValidTakeSelection());

  // Clear (optional), 
  clearButton.disabled = (selectedTotalChip === 0);

  document.querySelectorAll("#player1 .chipButton").forEach(btn => {
    const action = btn.dataset.action;
    const color = btn.dataset.color;

    if (action === "add"){
      const noSpace = player1TotalChip >= 10;
      const remainingToSelect = state.bank[color] - selected[color];
      btn.disabled = noSpace || (remainingToSelect <= 0);
    }

    if (action === "remove"){
      btn.disabled = state.player1[color] <= 0;
    }
  });
}

function isValidTakeSelection(){
  const totalSel = totalChip(selected);
  if (totalSel === 0) return true; 

  const pickedColors = COLORS.filter(c => selected[c] > 0);
  const distinct = pickedColors.length;
  const maxPerColor = Math.max(...COLORS.map(c => selected[c]));

  const threeChipDistinct = totalSel <= 3 && maxPerColor === 1;

  const twoSame =
    totalSel === 2 &&
    distinct === 1 &&
    state.bank[pickedColors[0]] >= 4;

  return threeChipDistinct || twoSame;
}

function confirmTake(){
  const player1TotalChip = totalChip(state.player1);
  const selectedTotalChip = totalChip(selected);
  if (player1TotalChip + selectedTotalChip > 10) return;

  for (const c of COLORS) {
    const k = selected[c];
    if (k <= 0) continue;
    if (state.bank[c] < k) continue;

    state.bank[c] -= k;
    state.player1[c] += k;
    selected[c] = 0;
  }
  render();
}

function clearSelection(){
  for (const c of COLORS) selected[c] = 0;
  render();
}

playerSection.addEventListener("click", (e) => {
  const btn = e.target.closest(".chipButton");
  if (!btn) return;

  const action = btn.dataset.action;
  const color = btn.dataset.color;

  if (action === "add") {
  if ((state.bank[color] - selected[color]) <= 0) return;

  // thử chọn thêm 1 rồi check xem imply logic rule splendor correct ch
  selected[color] += 1;
  if (!isValidTakeSelection()) {
    selected[color] -= 1;
    return;
  }

  render();
}

  if (action === "remove") {
    if (state.player1[color] <= 0) return;
    state.player1[color] -= 1;
    state.bank[color] += 1;
    render();
  }
});

confirmButton.addEventListener("click", confirmTake);
clearButton.addEventListener("click", clearSelection);

render();
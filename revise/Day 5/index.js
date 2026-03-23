const TAKE_COLORS = ["Red", "Green", "Blue", "Black", "White"];
const ALL_COLORS = ["Red", "Green", "Blue", "Black", "White", "Wild"];

const BONUS_COLORS = ["Red", "Green", "Blue", "Black", "White"];

function createPlayer() {
  return {
    chips: Object.fromEntries(ALL_COLORS.map(c => [c, 0])),
    victoryPoints: 0,
    bonusChip: Object.fromEntries(BONUS_COLORS.map(c => [c, 0])),
    ownedCards: [],
    reservedCards: []
  };
}

const state = {
  players: [createPlayer(), createPlayer()],
  currentPlayerIndex: 0,
  bank: { Red: 7, Green: 7, Blue: 7, Black: 7, White: 7, Wild: 5 },
  currentAction: "take",
  selectedReserveIndex: null
};

function getCurrentPlayer() {
  return state.players[state.currentPlayerIndex];
}

//basic card
const marketCards = [
 {
    id: 1,
    level: 1,
    color: "Red",
    points: 1,
    cost:{
      Red: 0,
      Green: 0,
      Blue: 0,
      Black: 0,
      White: 4
    }
  },

 {
    id: 2,
    level: 1,
    color: "Black",
    points: 0,
    cost:{
      Red: 1,
      Green: 1,
      Blue: 1,
      Black: 0,
      White: 1
    }
  },

 {
    id: 3,
    level: 1,
    color: "Blue",
    points: 0,
    cost:{
      Red: 2,
      Green: 2,
      Blue: 0,
      Black: 0,
      White: 1
    }
  },

 {
    id: 4,
    level: 1,
    color: "Green",
    points: 0,
    cost:{
      Red: 1,
      Green: 0,
      Blue: 1,
      Black: 1,
      White: 1
    }
  },

 {
    id: 5,
    level: 1,
    color: "White",
    points: 0,
    cost:{
      Red: 0,
      Green: 2,
      Blue: 2,
      Black: 0,
      White: 0
    }
  },

 {
    id: 41,
    level: 2,
    color: "Red",
    points: 2,
    cost:{
      Red: 0,
      Green: 2,
      Blue: 4,
      Black: 0,
      White: 1
    }
  },

 {
    id: 42,
    level: 2,
    color: "Black",
    points: 2,
    cost:{
      Red: 0,
      Green: 0,
      Blue: 0,
      Black: 0,
      White: 5
    }
  },

 {
    id: 43,
    level: 3,
    color: "Blue",
    points: 3,
    cost:{
      Red: 0,
      Green: 0,
      Blue: 6,
      Black: 0,
      White: 0
    }
  },

 {
    id: 44,
    level: 2,
    color: "Green",
    points: 2,
    cost:{
      Red: 0,
      Green: 3,
      Blue: 5,
      Black: 0,
      White: 0
    }
  },

 {
    id: 45,
    level: 2,
    color: "White",
    points: 1,
    cost:{
      Red: 3,
      Green: 0,
      Blue: 3,
      Black: 0,
      White: 2
    }
  },

 {
    id: 71,
    level: 3,
    color: "Red",
    points: 4,
    cost:{
      Red: 0,
      Green: 7,
      Blue: 0,
      Black: 0,
      White: 0
    }
  },

 {
    id: 72,
    level: 3,
    color: "Black",
    points: 3,
    cost:{
      Red: 3,
      Green: 5,
      Blue: 3,
      Black: 0,
      White: 3
    }
  },

 {
    id: 73,
    level: 3,
    color: "Blue",
    points: 4,
    cost:{
      Red: 0,
      Green: 0,
      Blue: 0,
      Black: 0,
      White: 7
    }
  },

 {
    id: 74,
    level: 2,
    color: "Green",
    points: 5,
    cost:{
      Red: 0,
      Green: 3,
      Blue: 7,
      Black: 0,
      White: 0
    }
  },

 {
    id: 75,
    level: 2,
    color: "White",
    points: 4,
    cost:{
      Red: 3,
      Green: 0,
      Blue: 0,
      Black: 6,
      White: 3
    }
  },


];

const selected = Object.fromEntries(TAKE_COLORS.map(c => [c, 0]));

const playerSection = document.querySelector("#player1");
const selectedTextEl = document.querySelector("#selectedText");

const confirmButton = document.querySelector("#confirmTake");
const clearButton = document.querySelector("#clearTake");

const reserveModeButton = document.querySelector("#reserveModeButton");
const confirmReserveButton = document.querySelector("#confirmReserve");
const cancelActionButton = document.querySelector("#cancelAction");
const selectedReserveTextEl = document.querySelector("#selectedReserveText");
const currentPlayerLabelEl = document.querySelector("#currentPlayerLabel");

//bonusChip
const player1VictoryPointsEl = document.querySelector("#player1VictoryPoints");

const bonusChipEl = document.querySelector("#bonusChip");
const player1RedBonusEl = document.querySelector("#player1RedBonus");
const player1GreenBonusEl = document.querySelector("#player1GreenBonus");
const player1BlueBonusEl = document.querySelector("#player1BlueBonus");
const player1BlackBonusEl = document.querySelector("#player1BlackBonus");
const player1WhiteBonusEl = document.querySelector("#player1WhiteBonus");

//log
const gameLogEl = document.querySelector("#gameLog");

function setLog(message){
  gameLogEl.textContent = message;
}

function totalChip(obj){
  return Object.values(obj).reduce((a, b) => a + b, 0);
}

function render(){
  const player = getCurrentPlayer();

  for (const c of ALL_COLORS){
    document.querySelector(`#player1${c}Chip`).textContent = player.chips[c];
    document.querySelector(`#bankRemaining${c}Chip`).textContent = state.bank[c];
  }

  const parts = [];
  for (const c of TAKE_COLORS){
    if (selected[c] > 0) parts.push(`${c} x${selected[c]}`);
  }
  selectedTextEl.textContent = parts.length ? parts.join(", ") : "none";

  const playerTotalChip = totalChip(player.chips);
  const selectedTotalChip = totalChip(selected);

  confirmButton.disabled =
  (state.currentAction !== "take") ||
  (selectedTotalChip === 0) ||
  (playerTotalChip + selectedTotalChip > 10) ||
  (!isValidTakeSelection());

  clearButton.disabled = (selectedTotalChip === 0);

  document.querySelectorAll("#player1 .chipButton").forEach(btn =>{
    const action = btn.dataset.action;
    const color = btn.dataset.color;

    if (color === "Wild"){
      btn.disabled = true;
      return;
    }

    if (action === "add"){
      const noSpace = playerTotalChip >= 10;
      const remainingToSelect = state.bank[color] - selected[color];
      btn.disabled = noSpace || (remainingToSelect <= 0);
    }

    if (action === "remove"){
      btn.disabled = player.chips[color] <= 0;
    }
  });

  if (state.selectedReserveIndex === null){
    selectedReserveTextEl.textContent = "none";
  } else{
    const card = marketCards[state.selectedReserveIndex];
    selectedReserveTextEl.textContent = card
      ? `${card.color} | Level ${card.level} | ${card.points} VP`
      : "none";
  }

  confirmReserveButton.disabled =
    state.currentAction !== "reserve" ||
    state.selectedReserveIndex === null ||
    player.reservedCards.length >= 3;

    cancelActionButton.disabled = (state.currentAction === "take");
    reserveModeButton.disabled = (state.currentAction === "reserve");

  player1VictoryPointsEl.textContent = player.victoryPoints;

  player1RedBonusEl.textContent = player.bonusChip.Red;
  player1GreenBonusEl.textContent = player.bonusChip.Green;
  player1BlueBonusEl.textContent = player.bonusChip.Blue;
  player1BlackBonusEl.textContent = player.bonusChip.Black;
  player1WhiteBonusEl.textContent = player.bonusChip.White;
  
  currentPlayerLabelEl.textContent = `Player ${state.currentPlayerIndex + 1}`;

  renderMarket();
  renderOwnedCards();
  renderReservedCards();
}

function isValidTakeSelection(){
  const totalSel = totalChip(selected);
  if (totalSel === 0) return true; 

  const pickedColors = TAKE_COLORS.filter(c => selected[c] > 0);
  const distinct = pickedColors.length;
  const maxPerColor = Math.max(...TAKE_COLORS.map(c => selected[c]));

  const threeChipDistinct = totalSel <= 3 && maxPerColor === 1;

  const twoSame =
    totalSel === 2 &&
    distinct === 1 &&
    state.bank[pickedColors[0]] >= 4;

  return threeChipDistinct || twoSame;
}

function endTurn(){
  clearSelectionOnly();
  state.selectedReserveIndex = null;
  state.currentAction = "take";
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  render();
}

function clearSelectionOnly(){
  for (const c of TAKE_COLORS) selected[c] = 0;
}

function confirmTake(){
  const player = getCurrentPlayer();
  const playerTotalChip = totalChip(player.chips);
  const selectedTotalChip = totalChip(selected);

  const currentPlayerNumber = state.currentPlayerIndex + 1;
  const nextPlayerNumber = ((state.currentPlayerIndex + 1) % state.players.length) + 1;

  const takenParts = TAKE_COLORS
    .filter(c => selected[c] > 0)
    .map(c => `${c} x${selected[c]}`);

  if (playerTotalChip + selectedTotalChip > 10) {
    setLog(`Player ${state.currentPlayerIndex + 1} cannot take more than 10 chips.`);
    return;
  }

  for (const c of TAKE_COLORS){
    const k = selected[c];
    if (k <= 0) continue;
    if (state.bank[c] < k) continue;

    state.bank[c] -= k;
    player.chips[c] += k;
    selected[c] = 0;
  }

  setLog(`Player ${currentPlayerNumber} took ${takenParts.join(", ")}. Player ${nextPlayerNumber}'s turn.`);
  endTurn();
}

function clearSelection(){
  clearSelectionOnly();
  render();
}

playerSection.addEventListener("click", (e) =>{
  const btn = e.target.closest(".chipButton");
  if (!btn) return;

  if (state.currentAction !== "take") return;

  const action = btn.dataset.action;
  const color = btn.dataset.color;

  if (action === "add"){
  if ((state.bank[color] - selected[color]) <= 0) return;

  // thử chọn thêm 1 rồi check xem imply logic rule splendor correct ch
  selected[color] += 1;
  if (!isValidTakeSelection()){
    selected[color] -= 1;
    return;
  }

  render();
}

if (action === "remove"){
  const player = getCurrentPlayer();
  if (player.chips[color] <= 0) return;
  player.chips[color] -= 1;
  state.bank[color] += 1;
  render();
}
});

function createCardHTML(card, index){
  const costHTML = Object.entries(card.cost)
    .filter(([color, amount]) => amount > 0)
    .map(([color, amount]) =>{
      return `<div class="cost ${color.toLowerCase()}">${color}: ${amount}</div>`;
    })
    .join("");

  return `
    <div class="card" data-index="${index}">
      <div class="card-top">
        <span class="card-points">${card.points}</span>
        <span class="card-bonus ${card.color.toLowerCase()}">${card.color}</span>
      </div>
      <div class="card-middle">
        <div>Level ${card.level}</div>
      </div>
      <div class="card-costs">
        ${costHTML}
      </div>
      <button class="buyCardButton" data-index="${index}">Buy</button>
    </div>
  `;
}

const marketCardsEl = document.querySelector("#marketCards");

//important
marketCardsEl.addEventListener("click", (e) =>{
  const cardEl = e.target.closest(".card");
  if (!cardEl) return;

  if (state.currentAction === "reserve"){
    const index = Number(cardEl.dataset.index);
    state.selectedReserveIndex = index;
    render();
    return;
  }

  const btn = e.target.closest(".buyCardButton");
  if (!btn) return;

  const index = Number(btn.dataset.index);
  const card = marketCards[index];

  if (!canAffordCard(card)){
  setLog(`Player ${state.currentPlayerIndex + 1} does not have enough chips to buy this card.`);
  return;
}

  payForCard(card);
  applyCardReward(card);
  marketCards.splice(index, 1);
  const player = getCurrentPlayer();
  player.ownedCards.push(card);

  setLog(`Player ${state.currentPlayerIndex + 1} bought a ${card.color} card (${card.points} VP).`);
  endTurn();
  });

function canAffordCard(card){
  const player = getCurrentPlayer();
  let wildNeeded = 0;

  for (const color of BONUS_COLORS){
    const cost = card.cost[color] || 0;
    const bonus = player.bonusChip[color] || 0;
    const chips = player.chips[color] || 0;

    const discountedCost = Math.max(0, cost - bonus);
    const missing = Math.max(0, discountedCost - chips);

    wildNeeded += missing;
  }

  return wildNeeded <= player.chips.Wild;
}

function payForCard(card){
  const player = getCurrentPlayer();

  for (const color of BONUS_COLORS){
    const cost = card.cost[color] || 0;
    const bonus = player.bonusChip[color] || 0;

    const discountedCost = Math.max(0, cost - bonus);

    const useNormalChips = Math.min(player.chips[color], discountedCost);
    player.chips[color] -= useNormalChips;
    state.bank[color] += useNormalChips;

    const stillMissing = discountedCost - useNormalChips;

    if (stillMissing > 0){
      player.chips.Wild -= stillMissing;
      state.bank.Wild += stillMissing;
    }
  }
}

function applyCardReward(card){
  const player = getCurrentPlayer();
  player.victoryPoints += card.points;
  player.bonusChip[card.color] += 1;
}

function renderOwnedCards(){
  const player = getCurrentPlayer();
  const ownedEl = document.querySelector("#player1OwnedCards");

  ownedEl.innerHTML = player.ownedCards
    .map(card =>{
      return `
        <div class="card">
          <div class="card-top">
            <span class="card-points">${card.points}</span>
            <span class="card-bonus ${card.color.toLowerCase()}">${card.color}</span>
          </div>
          <div class="card-middle">
            <div>Level ${card.level}</div>
          </div>
        </div>
      `;
    })
    .join("");
}

function enterReserveMode(){
  state.currentAction = "reserve";
  state.selectedReserveIndex = null;
  setLog(`Player ${state.currentPlayerIndex + 1} is choosing a card to reserve.`);
  render();
}

function confirmReserveCard(){
  const player = getCurrentPlayer();

  if (state.currentAction !== "reserve") return;
  if (state.selectedReserveIndex === null) return;
  if (player.reservedCards.length >= 3) return;

  // fix save card logic

  const card = marketCards[state.selectedReserveIndex];
  if (!card) return;

  player.reservedCards.push(card);
  marketCards.splice(state.selectedReserveIndex, 1);

  if (state.bank.Wild > 0 && totalChip(player.chips) < 10){
  player.chips.Wild += 1;
  state.bank.Wild -= 1;
}

  setLog(`Player ${state.currentPlayerIndex + 1} reserved a ${card.color} level ${card.level} card.`);

  endTurn();
}

function renderReservedCards(){
  const player = getCurrentPlayer();
  const reservedEl = document.querySelector("#player1ReservedCards");

  reservedEl.innerHTML = player.reservedCards
    .map(card =>{
      return `
        <div class="card">
          <div class="card-top">
            <span class="card-points">${card.points}</span>
            <span class="card-bonus ${card.color.toLowerCase()}">${card.color}</span>
          </div>
          <div class="card-middle">
            <div>Level ${card.level}</div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderMarket(){
  const marketEl = document.querySelector("#marketCards");
  marketEl.innerHTML = marketCards
    .map((card, index) => createCardHTML(card, index))
    .join("");
}

function cancelAction(){
  state.currentAction = "take";
  state.selectedReserveIndex = null;
  clearSelectionOnly();
  setLog(`Player ${state.currentPlayerIndex + 1} cancelled the current action.`);
  render();
}

confirmButton.addEventListener("click", confirmTake);
clearButton.addEventListener("click", clearSelection);
reserveModeButton.addEventListener("click", enterReserveMode);
confirmReserveButton.addEventListener("click", confirmReserveCard);
cancelActionButton.addEventListener("click", cancelAction);
setLog("Game started. Player 1's turn.");

render();
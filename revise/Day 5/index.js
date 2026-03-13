const TAKE_COLORS = ["Red", "Green", "Blue", "Black", "White"];
const ALL_COLORS = ["Red", "Green", "Blue", "Black", "White", "Wild"];

const BONUS_COLORS = ["Red", "Green", "Blue", "Black", "White"];

const state = {
  player1: Object.fromEntries(ALL_COLORS.map(c => [c, 0])),
  bank: { Red: 7, Green: 7, Blue: 7, Black: 7, White: 7, Wild: 5 }
};

//vp state
state.player1VictoryPoints = 0;
//bonus chip earned from cards
state.player1BonusChip = Object.fromEntries(BONUS_COLORS.map(c => [c, 0]));
//show cards earned
state.player1OwnedCards = [];
//show cards reserved and buttons
state.player1ReservedCards = [];
state.currentAction = "take";
state.selectedReserveIndex = null;

//basic card
const marketCards = [
  {
    id: 1,
    level: 1,
    color: "Red",
    points: 1,
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
    cost: {
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
const selectedReserveTextEl = document.querySelector("#selectedReserveText");

//bonusChip
const player1VictoryPointsEl = document.querySelector("#player1VictoryPoints");

const bonusChipEl = document.querySelector("#bonusChip");
const player1RedBonusEl = document.querySelector("#player1RedBonus");
const player1GreenBonusEl = document.querySelector("#player1GreenBonus");
const player1BlueBonusEl = document.querySelector("#player1BlueBonus");
const player1BlackBonusEl = document.querySelector("#player1BlackBonus");
const player1WhiteBonusEl = document.querySelector("#player1WhiteBonus");

function totalChip(obj){
  return Object.values(obj).reduce((a, b) => a + b, 0);
}

function render() {
  for (const c of ALL_COLORS) {
    document.querySelector(`#player1${c}Chip`).textContent = state.player1[c];
    document.querySelector(`#bankRemaining${c}Chip`).textContent = state.bank[c];
  }

  const parts = [];
  for (const c of TAKE_COLORS) {
    if (selected[c] > 0) parts.push(`${c} x${selected[c]}`);
  }
  selectedTextEl.textContent = parts.length ? parts.join(", ") : "none";

  const player1TotalChip = totalChip(state.player1);
  const selectedTotalChip = totalChip(selected);

  confirmButton.disabled =
    (selectedTotalChip === 0) ||
    (player1TotalChip + selectedTotalChip > 10) ||
    (!isValidTakeSelection());

  clearButton.disabled = (selectedTotalChip === 0);

  document.querySelectorAll("#player1 .chipButton").forEach(btn => {
    const action = btn.dataset.action;
    const color = btn.dataset.color;

    if (color === "Wild") {
      btn.disabled = true;
      return;
    }

    if (action === "add") {
      const noSpace = player1TotalChip >= 10;
      const remainingToSelect = state.bank[color] - selected[color];
      btn.disabled = noSpace || (remainingToSelect <= 0);
    }

    if (action === "remove") {
      btn.disabled = state.player1[color] <= 0;
    }
  });

  if (state.selectedReserveIndex === null) {
    selectedReserveTextEl.textContent = "none";
  } else {
    const card = marketCards[state.selectedReserveIndex];
    selectedReserveTextEl.textContent = card
      ? `${card.color} | Level ${card.level} | ${card.points} VP`
      : "none";
  }

  confirmReserveButton.disabled =
    state.currentAction !== "reserve" ||
    state.selectedReserveIndex === null ||
    totalChip(state.player1) >= 10 ||
    state.player1ReservedCards.length >= 3;

  player1VictoryPointsEl.textContent = state.player1VictoryPoints;

  player1RedBonusEl.textContent = state.player1BonusChip.Red;
  player1GreenBonusEl.textContent = state.player1BonusChip.Green;
  player1BlueBonusEl.textContent = state.player1BonusChip.Blue;
  player1BlackBonusEl.textContent = state.player1BonusChip.Black;
  player1WhiteBonusEl.textContent = state.player1BonusChip.White;

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

function confirmTake(){
  const player1TotalChip = totalChip(state.player1);
  const selectedTotalChip = totalChip(selected);
  if (player1TotalChip + selectedTotalChip > 10) return;

  for (const c of TAKE_COLORS) {
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
  for (const c of TAKE_COLORS) selected[c] = 0;
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

function createCardHTML(card, index) {
  const costHTML = Object.entries(card.cost)
    .filter(([color, amount]) => amount > 0)
    .map(([color, amount]) => {
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
marketCardsEl.addEventListener("click", (e) => {
  const cardEl = e.target.closest(".card");
  if (!cardEl) return;

  if (state.currentAction === "reserve") {
    const index = Number(cardEl.dataset.index);
    state.selectedReserveIndex = index;
    render();
    return;
  }

  const btn = e.target.closest(".buyCardButton");
  if (!btn) return;

  const index = Number(btn.dataset.index);
  const card = marketCards[index];

  if (!canAffordCard(card)) {
    console.log("Not enough chips");
    return;
  }

  payForCard(card);
  applyCardReward(card);
  marketCards.splice(index, 1);
  state.player1OwnedCards.push(card);
  render();
});

function canAffordCard(card) {
  let wildNeeded = 0;

  for (const color of BONUS_COLORS) {
    const cost = card.cost[color] || 0;
    const bonus = state.player1BonusChip[color] || 0;
    const chips = state.player1[color] || 0;

    const discountedCost = Math.max(0, cost - bonus);
    const missing = Math.max(0, discountedCost - chips);

    wildNeeded += missing;
  }

  return wildNeeded <= state.player1.Wild;
}

function payForCard(card) {
  for (const color of BONUS_COLORS) {
    const cost = card.cost[color] || 0;
    const bonus = state.player1BonusChip[color] || 0;

    const discountedCost = Math.max(0, cost - bonus);

    const useNormalChips = Math.min(state.player1[color], discountedCost);
    state.player1[color] -= useNormalChips;
    state.bank[color] += useNormalChips;

    const stillMissing = discountedCost - useNormalChips;

    if (stillMissing > 0) {
      state.player1.Wild -= stillMissing;
      state.bank.Wild += stillMissing;
    }
  }
}

function applyCardReward(card) {
  state.player1VictoryPoints += card.points;
  state.player1BonusChip[card.color] += 1;
}

function renderOwnedCards() {
  const ownedEl = document.querySelector("#player1OwnedCards");

  ownedEl.innerHTML = state.player1OwnedCards
    .map(card => {
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

function enterReserveMode() {
  state.currentAction = "reserve";
  state.selectedReserveIndex = null;
  render();
}

function confirmReserveCard() {
  if (state.currentAction !== "reserve") return;
  if (state.selectedReserveIndex === null) return;
  if (totalChip(state.player1) >= 10) return;
  if (state.player1ReservedCards.length >= 3) return;

  const card = marketCards[state.selectedReserveIndex];
  if (!card) return;

  state.player1ReservedCards.push(card);
  marketCards.splice(state.selectedReserveIndex, 1);

  if (state.bank.Wild > 0) {
    state.player1.Wild += 1;
    state.bank.Wild -= 1;
  }

  state.selectedReserveIndex = null;
  state.currentAction = "take";

  render();
}

function renderReservedCards() {
  const reservedEl = document.querySelector("#player1ReservedCards");

  reservedEl.innerHTML = state.player1ReservedCards
    .map(card => {
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

function renderMarket() {
  const marketEl = document.querySelector("#marketCards");
  marketEl.innerHTML = marketCards
    .map((card, index) => createCardHTML(card, index))
    .join("");
}

confirmButton.addEventListener("click", confirmTake);
clearButton.addEventListener("click", clearSelection);
reserveModeButton.addEventListener("click", enterReserveMode);
confirmReserveButton.addEventListener("click", confirmReserveCard);

render();
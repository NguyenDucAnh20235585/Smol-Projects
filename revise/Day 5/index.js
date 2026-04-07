const TAKE_COLORS = ["Red", "Green", "Blue", "Black", "White"];
const ALL_COLORS = ["Red", "Green", "Blue", "Black", "White", "Wild"];

const BONUS_COLORS = ["Red", "Green", "Blue", "Black", "White"];

function createPlayer() {
  return {
    chips: Object.fromEntries(ALL_COLORS.map(c => [c, 0])),
    victoryPoints: 0,
    bonusChip: Object.fromEntries(BONUS_COLORS.map(c => [c, 0])),
    ownedCards: [],
    reservedCards: [],
    nobles: []
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

  //black
  {
    id: "black_1",
    tier: 1,
    color: "Black",
    points: 0,
    cost: { Black: 0, White: 1, Red: 1, Blue: 1, Green: 1 }
  },
  {
    id: "black_2",
    tier: 1,
    color: "Black",
    points: 0,
    cost: { Black: 0, White: 0, Red: 1, Blue: 0, Green: 2 }
  },
  {
    id: "black_3",
    tier: 1,
    color: "Black",
    points: 0,
    cost: { Black: 0, White: 2, Red: 0, Blue: 0, Green: 2 }
  },
  {
    id: "black_4",
    tier: 1,
    color: "Black",
    points: 0,
    cost: { Black: 1, White: 0, Red: 3, Blue: 0, Green: 1 }
  },
  {
    id: "black_5",
    tier: 1,
    color: "Black",
    points: 0,
    cost: { Black: 0, White: 0, Red: 0, Blue: 0, Green: 3 }
  },
  {
    id: "black_6",
    tier: 1,
    color: "Black",
    points: 0,
    cost: { Black: 0, White: 1, Red: 1, Blue: 2, Green: 1 }
  },
  {
    id: "black_7",
    tier: 1,
    color: "Black",
    points: 0,
    cost: { Black: 0, White: 2, Red: 1, Blue: 2, Green: 0 }
  },
  {
    id: "black_8",
    tier: 1,
    color: "Black",
    points: 1,
    cost: { Black: 0, White: 0, Red: 0, Blue: 4, Green: 0 }
  },

  {
    id: "black_9",
    tier: 2,
    color: "Black",
    points: 1,
    cost: { Black: 0, White: 3, Red: 0, Blue: 2, Green: 2 }
  },
  {
    id: "black_10",
    tier: 2,
    color: "Black",
    points: 1,
    cost: { Black: 2, White: 3, Red: 0, Blue: 0, Green: 3 }
  },
  {
    id: "black_11",
    tier: 2,
    color: "Black",
    points: 2,
    cost: { Black: 0, White: 0, Red: 2, Blue: 1, Green: 4 }
  },
  {
    id: "black_12",
    tier: 2,
    color: "Black",
    points: 2,
    cost: { Black: 0, White: 5, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "black_13",
    tier: 2,
    color: "Black",
    points: 2,
    cost: { Black: 0, White: 0, Red: 3, Blue: 0, Green: 5 }
  },

  {
    id: "black_14",
    tier: 2,
    color: "Black",
    points: 3,
    cost: { Black: 6, White: 0, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "black_15",
    tier: 3,
    color: "Black",
    points: 3,
    cost: { Black: 0, White: 3, Red: 3, Blue: 3, Green: 5 }
  },
  {
    id: "black_16",
    tier: 3,
    color: "Black",
    points: 4,
    cost: { Black: 0, White: 0, Red: 7, Blue: 0, Green: 0 }
  },
  {
    id: "black_17",
    tier: 3,
    color: "Black",
    points: 4,
    cost: { Black: 3, White: 0, Red: 6, Blue: 0, Green: 3 }
  },
  {
    id: "black_18",
    tier: 3,
    color: "Black",
    points: 5,
    cost: { Black: 3, White: 0, Red: 7, Blue: 0, Green: 0 }
  },
//blue
  {
    id: "blue_1",
    tier: 1,
    color: "Blue",
    points: 0,
    cost: { Black: 2, White: 1, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "blue_2",
    tier: 1,
    color: "Blue",
    points: 0,
    cost: { Black: 1, White: 1, Red: 2, Blue: 0, Green: 1 }
  },
  {
    id: "blue_3",
    tier: 1,
    color: "Blue",
    points: 0,
    cost: { Black: 1, White: 1, Red: 1, Blue: 0, Green: 1 }
  },
  {
    id: "blue_4",
    tier: 1,
    color: "Blue",
    points: 0,
    cost: { Black: 0, White: 0, Red: 1, Blue: 1, Green: 3 }
  },
  {
    id: "blue_5",
    tier: 1,
    color: "Blue",
    points: 0,
    cost: { Black: 3, White: 0, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "blue_6",
    tier: 1,
    color: "Blue",
    points: 0,
    cost: { Black: 0, White: 1, Red: 2, Blue: 0, Green: 2 }
  },
  {
    id: "blue_7",
    tier: 1,
    color: "Blue",
    points: 0,
    cost: { Black: 2, White: 0, Red: 0, Blue: 0, Green: 2 }
  },
  {
    id: "blue_8",
    tier: 1,
    color: "Blue",
    points: 1,
    cost: { Black: 0, White: 0, Red: 4, Blue: 0, Green: 0 }
  },

  {
    id: "blue_9",
    tier: 2,
    color: "Blue",
    points: 1,
    cost: { Black: 0, White: 0, Red: 3, Blue: 2, Green: 2 }
  },
  {
    id: "blue_10",
    tier: 2,
    color: "Blue",
    points: 1,
    cost: { Black: 3, White: 0, Red: 0, Blue: 2, Green: 3 }
  },
  {
    id: "blue_11",
    tier: 2,
    color: "Blue",
    points: 2,
    cost: { Black: 0, White: 5, Red: 0, Blue: 3, Green: 0 }
  },
  {
    id: "blue_12",
    tier: 2,
    color: "Blue",
    points: 2,
    cost: { Black: 0, White: 0, Red: 0, Blue: 5, Green: 0 }
  },
  {
    id: "blue_13",
    tier: 2,
    color: "Blue",
    points: 2,
    cost: { Black: 4, White: 2, Red: 1, Blue: 0, Green: 0 }
  },

  {
    id: "blue_14",
    tier: 2,
    color: "Blue",
    points: 3,
    cost: { Black: 0, White: 0, Red: 0, Blue: 6, Green: 0 }
  },
  {
    id: "blue_15",
    tier: 3,
    color: "Blue",
    points: 3,
    cost: { Black: 5, White: 3, Red: 3, Blue: 0, Green: 3 }
  },
  {
    id: "blue_16",
    tier: 3,
    color: "Blue",
    points: 4,
    cost: { Black: 0, White: 7, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "blue_17",
    tier: 3,
    color: "Blue",
    points: 4,
    cost: { Black: 3, White: 6, Red: 0, Blue: 3, Green: 0 }
  },
  {
    id: "blue_18",
    tier: 3,
    color: "Blue",
    points: 5,
    cost: { Black: 0, White: 7, Red: 0, Blue: 3, Green: 0 }
  },
  //green
  {
    id: "green_1",
    tier: 1,
    color: "Green",
    points: 0,
    cost: { Black: 0, White: 2, Red: 0, Blue: 1, Green: 0 }
  },
  {
    id: "green_2",
    tier: 1,
    color: "Green",
    points: 0,
    cost: { Black: 0, White: 0, Red: 2, Blue: 2, Green: 0 }
  },
  {
    id: "green_3",
    tier: 1,
    color: "Green",
    points: 0,
    cost: { Black: 0, White: 1, Red: 0, Blue: 3, Green: 1 }
  },
  {
    id: "green_4",
    tier: 1,
    color: "Green",
    points: 0,
    cost: { Black: 1, White: 1, Red: 1, Blue: 1, Green: 0 }
  },
  {
    id: "green_5",
    tier: 1,
    color: "Green",
    points: 0,
    cost: { Black: 2, White: 1, Red: 1, Blue: 1, Green: 0 }
  },
  {
    id: "green_6",
    tier: 1,
    color: "Green",
    points: 0,
    cost: { Black: 2, White: 0, Red: 2, Blue: 1, Green: 0 }
  },
  {
    id: "green_7",
    tier: 1,
    color: "Green",
    points: 0,
    cost: { Black: 0, White: 0, Red: 3, Blue: 0, Green: 0 }
  },
  {
    id: "green_8",
    tier: 1,
    color: "Green",
    points: 1,
    cost: { Black: 4, White: 0, Red: 0, Blue: 0, Green: 0 }
  },

  {
    id: "green_9",
    tier: 2,
    color: "Green",
    points: 1,
    cost: { Black: 0, White: 3, Red: 3, Blue: 0, Green: 2 }
  },
  {
    id: "green_10",
    tier: 2,
    color: "Green",
    points: 1,
    cost: { Black: 2, White: 2, Red: 0, Blue: 3, Green: 0 }
  },
  {
    id: "green_11",
    tier: 2,
    color: "Green",
    points: 2,
    cost: { Black: 1, White: 4, Red: 0, Blue: 2, Green: 0 }
  },
  {
    id: "green_12",
    tier: 2,
    color: "Green",
    points: 2,
    cost: { Black: 0, White: 0, Red: 0, Blue: 0, Green: 5 }
  },
  {
    id: "green_13",
    tier: 2,
    color: "Green",
    points: 2,
    cost: { Black: 0, White: 0, Red: 0, Blue: 5, Green: 3 }
  },
  {
    id: "green_14",
    tier: 2,
    color: "Green",
    points: 3,
    cost: { Black: 0, White: 0, Red: 0, Blue: 0, Green: 6 }
  },

  {
    id: "green_15",
    tier: 3,
    color: "Green",
    points: 3,
    cost: { Black: 3, White: 5, Red: 3, Blue: 3, Green: 0 }
  },
  {
    id: "green_16",
    tier: 3,
    color: "Green",
    points: 4,
    cost: { Black: 0, White: 3, Red: 0, Blue: 6, Green: 3 }
  },
  {
    id: "green_17",
    tier: 3,
    color: "Green",
    points: 4,
    cost: { Black: 0, White: 0, Red: 0, Blue: 7, Green: 0 }
  },
  {
    id: "green_18",
    tier: 3,
    color: "Green",
    points: 5,
    cost: { Black: 0, White: 0, Red: 0, Blue: 7, Green: 3 }
  },
  //red
  {
    id: "red_1",
    tier: 1,
    color: "Red",
    points: 0,
    cost: { Black: 0, White: 3, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "red_2",
    tier: 1,
    color: "Red",
    points: 0,
    cost: { Black: 3, White: 1, Red: 1, Blue: 0, Green: 0 }
  },
  {
    id: "red_3",
    tier: 1,
    color: "Red",
    points: 0,
    cost: { Black: 0, White: 0, Red: 0, Blue: 2, Green: 1 }
  },
  {
    id: "red_4",
    tier: 1,
    color: "Red",
    points: 0,
    cost: { Black: 2, White: 2, Red: 0, Blue: 0, Green: 1 }
  },
  {
    id: "red_5",
    tier: 1,
    color: "Red",
    points: 0,
    cost: { Black: 1, White: 2, Red: 0, Blue: 1, Green: 1 }
  },
  {
    id: "red_6",
    tier: 1,
    color: "Red",
    points: 0,
    cost: { Black: 1, White: 1, Red: 0, Blue: 1, Green: 1 }
  },
  {
    id: "red_7",
    tier: 1,
    color: "Red",
    points: 0,
    cost: { Black: 0, White: 2, Red: 2, Blue: 0, Green: 0 }
  },
  {
    id: "red_8",
    tier: 1,
    color: "Red",
    points: 1,
    cost: { Black: 0, White: 4, Red: 0, Blue: 0, Green: 0 }
  },

  {
    id: "red_9",
    tier: 2,
    color: "Red",
    points: 1,
    cost: { Black: 3, White: 0, Red: 2, Blue: 3, Green: 0 }
  },
  {
    id: "red_10",
    tier: 2,
    color: "Red",
    points: 1,
    cost: { Black: 3, White: 2, Red: 2, Blue: 0, Green: 0 }
  },
  {
    id: "red_11",
    tier: 2,
    color: "Red",
    points: 2,
    cost: { Black: 0, White: 1, Red: 0, Blue: 4, Green: 2 }
  },
  {
    id: "red_12",
    tier: 2,
    color: "Red",
    points: 2,
    cost: { Black: 5, White: 3, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "red_13",
    tier: 2,
    color: "Red",
    points: 2,
    cost: { Black: 5, White: 0, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "red_14",
    tier: 2,
    color: "Red",
    points: 3,
    cost: { Black: 0, White: 0, Red: 6, Blue: 0, Green: 0 }
  },

  {
    id: "red_15",
    tier: 3,
    color: "Red",
    points: 3,
    cost: { Black: 3, White: 3, Red: 0, Blue: 5, Green: 3 }
  },
  {
    id: "red_16",
    tier: 3,
    color: "Red",
    points: 4,
    cost: { Black: 0, White: 0, Red: 0, Blue: 0, Green: 7 }
  },
  {
    id: "red_17",
    tier: 3,
    color: "Red",
    points: 4,
    cost: { Black: 0, White: 0, Red: 3, Blue: 3, Green: 6 }
  },
  {
    id: "red_18",
    tier: 3,
    color: "Red",
    points: 5,
    cost: { Black: 0, White: 0, Red: 3, Blue: 0, Green: 7 }
  },
  //white
  {
    id: "white_1",
    tier: 1,
    color: "White",
    points: 0,
    cost: { Black: 1, White: 0, Red: 0, Blue: 2, Green: 2 }
  },
  {
    id: "white_2",
    tier: 1,
    color: "White",
    points: 0,
    cost: { Black: 1, White: 0, Red: 2, Blue: 0, Green: 0 }
  },
  {
    id: "white_3",
    tier: 1,
    color: "White",
    points: 0,
    cost: { Black: 1, White: 0, Red: 1, Blue: 1, Green: 1 }
  },
  {
    id: "white_4",
    tier: 1,
    color: "White",
    points: 0,
    cost: { Black: 0, White: 0, Red: 0, Blue: 3, Green: 0 }
  },
  {
    id: "white_5",
    tier: 1,
    color: "White",
    points: 0,
    cost: { Black: 0, White: 0, Red: 0, Blue: 2, Green: 2 }
  },
  {
    id: "white_6",
    tier: 1,
    color: "White",
    points: 0,
    cost: { Black: 1, White: 0, Red: 1, Blue: 1, Green: 2 }
  },
  {
    id: "white_7",
    tier: 1,
    color: "White",
    points: 0,
    cost: { Black: 1, White: 3, Red: 0, Blue: 1, Green: 0 }
  },
  {
    id: "white_8",
    tier: 1,
    color: "White",
    points: 1,
    cost: { Black: 0, White: 0, Red: 0, Blue: 0, Green: 4 }
  },

  {
    id: "white_9",
    tier: 2,
    color: "White",
    points: 1,
    cost: { Black: 2, White: 0, Red: 2, Blue: 0, Green: 3 }
  },
  {
    id: "white_10",
    tier: 2,
    color: "White",
    points: 1,
    cost: { Black: 0, White: 2, Red: 3, Blue: 3, Green: 0 }
  },
  {
    id: "white_11",
    tier: 2,
    color: "White",
    points: 2,
    cost: { Black: 2, White: 0, Red: 4, Blue: 0, Green: 1 }
  },
  {
    id: "white_12",
    tier: 2,
    color: "White",
    points: 2,
    cost: { Black: 0, White: 0, Red: 5, Blue: 0, Green: 0 }
  },
  {
    id: "white_13",
    tier: 2,
    color: "White",
    points: 2,
    cost: { Black: 3, White: 0, Red: 5, Blue: 0, Green: 0 }
  },
  {
    id: "white_14",
    tier: 2,
    color: "White",
    points: 3,
    cost: { Black: 0, White: 6, Red: 0, Blue: 0, Green: 0 }
  },

  {
    id: "white_15",
    tier: 3,
    color: "White",
    points: 3,
    cost: { Black: 3, White: 0, Red: 5, Blue: 3, Green: 3 }
  },
  {
    id: "white_16",
    tier: 3,
    color: "White",
    points: 4,
    cost: { Black: 7, White: 0, Red: 0, Blue: 0, Green: 0 }
  },
  {
    id: "white_17",
    tier: 3,
    color: "White",
    points: 4,
    cost: { Black: 6, White: 3, Red: 3, Blue: 0, Green: 0 }
  },
  {
    id: "white_18",
    tier: 3,
    color: "White",
    points: 5,
    cost: { Black: 7, White: 3, Red: 0, Blue: 0, Green: 0 }
  }
];

//nobles
const nobles = [
  {
    id: "noble_1",
    points: 3,
    requiredBonuses: {
      White: 3,
      Blue: 3,
      Black: 0,
      Red: 0,
      Green: 3
    }
  },
  {
    id: "noble_2",
    points: 3,
    requiredBonuses: {
      White: 0,
      Blue: 3,
      Black: 0,
      Red: 3,
      Green: 3
    }
  },
  {
    id: "noble_3",
    points: 3,
    requiredBonuses: {
      White: 3,
      Blue: 0,
      Black: 3,
      Red: 3,
      Green: 0
    }
  },
  {
    id: "noble_4",
    points: 3,
    requiredBonuses: {
      White: 3,
      Blue: 3,
      Black: 3,
      Red: 0,
      Green: 0
    }
  },
  {
    id: "noble_5",
    points: 3,
    requiredBonuses: {
      White: 0,
      Blue: 0,
      Black: 3,
      Red: 3,
      Green: 3
    }
  },
  {
    id: "noble_6",
    points: 3,
    requiredBonuses: {
      White: 0,
      Blue: 0,
      Black: 4,
      Red: 4,
      Green: 0
    }
  },
  {
    id: "noble_7",
    points: 3,
    requiredBonuses: {
      White: 4,
      Blue: 0,
      Black: 4,
      Red: 0,
      Green: 0
    }
  },
  {
    id: "noble_8",
    points: 3,
    requiredBonuses: {
      White: 0,
      Blue: 0,
      Black: 0,
      Red: 4,
      Green: 4
    }
  },
  {
    id: "noble_9",
    points: 3,
    requiredBonuses: {
      White: 4,
      Blue: 4,
      Black: 0,
      Red: 0,
      Green: 0
    }
  },
  {
    id: "noble_10",
    points: 3,
    requiredBonuses: {
      White: 0,
      Blue: 4,
      Black: 0,
      Red: 0,
      Green: 4
    }
  }
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

//debug purpose
const debugEndGameButton = document.querySelector("#debugEndGame");

//log
const gameLogEl = document.querySelector("#gameLog");

function setLog(message){
  gameLogEl.textContent = message;
}

function debugSetNearEndGame(){
  const player = getCurrentPlayer();

  player.victoryPoints = 14;

  player.bonusChip.Red = 3;
  player.bonusChip.Green = 3;
  player.bonusChip.Blue = 3;
  player.bonusChip.Black = 0;
  player.bonusChip.White = 0;

  player.chips.Red = 3;
  player.chips.Green = 3;
  player.chips.Blue = 3;
  player.chips.Black = 3;
  player.chips.White = 3;
  player.chips.Wild = 2;

  setLog(`Debug: Player ${state.currentPlayerIndex + 1} is now near end game.`);
  render();
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
    const card = marketCards.find(card => card.id === state.selectedReserveIndex);
    selectedReserveTextEl.textContent = card
      ? `${card.color} | Level ${card.tier} | ${card.points} VP`
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
  renderNobles();
  renderCollectedNobles();
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

function createCardHTML(card, index, tier){
  const costHTML = Object.entries(card.cost)
    .filter(([color, amount]) => amount > 0)
    .map(([color, amount]) =>{
      return `<div class="cost ${color.toLowerCase()}">${color}: ${amount}</div>`;
    })
    .join("");

  return `
    <div class="card" data-id="${card.id}" data-tier="${tier}">
      <div class="card-top">
        <span class="card-points">${card.points}</span>
        <span class="card-bonus ${card.color.toLowerCase()}">${card.color}</span>
      </div>
      <div class="card-middle">
        <div>Level ${card.tier}</div>
      </div>
      <div class="card-costs">
        ${costHTML}
      </div>
      <button class="buyCardButton" data-id="${card.id}" data-tier="${tier}">Buy</button>
    </div>
  `;
}

function renderNobles(){
  const noblesEl = document.querySelector("#noblesArea");
  noblesEl.innerHTML = nobles.slice(0, 5).map(createNobleHTML).join("");
}

function renderCollectedNobles(){
  const player = getCurrentPlayer();
  const collectedNoblesEl = document.querySelector("#player1CollectedNobles");

  if (!collectedNoblesEl) return;

  if (player.nobles.length === 0){
    collectedNoblesEl.innerHTML = `<div class="emptyText">No nobles yet</div>`;
    return;
  }

  collectedNoblesEl.innerHTML = player.nobles
  .map(noble => {
    const reqText = Object.entries(noble.requiredBonuses)
      .filter(([_, amount]) => amount > 0)
      .map(([color, amount]) => `${color}: ${amount}`)
      .join(" | ");

    return `
      <div class="mini-noble">
        <div class="mini-noble-title">${noble.id}</div>
        <div class="mini-noble-points">${noble.points} VP</div>
        <div class="mini-noble-req">${reqText}</div>
      </div>
    `;
  })
  .join("");
}

function createNobleHTML(noble){
  const requirementHTML = Object.entries(noble.requiredBonuses)
    .filter(([color, amount]) => amount > 0)
    .map(([color, amount]) => {
      return `<div class="cost ${color.toLowerCase()}">${color}: ${amount}</div>`;
    })
    .join("");

  return `
    <div class="card noble-card">
      <div class="card-top">
        <span class="card-points">${noble.points}</span>
        <span class="noble-badge">Noble</span>
      </div>
      <div class="card-middle">
        <div class="noble-title">${noble.id}</div>
      </div>
      <div class="card-costs noble-costs">
        ${requirementHTML}
      </div>
    </div>
  `;
}

const marketAreaEl = document.querySelector("#marketArea");
const marketTier3El = document.querySelector("#marketTier3");
const marketTier2El = document.querySelector("#marketTier2");
const marketTier1El = document.querySelector("#marketTier1");
const reservedCardsEl = document.querySelector("#player1ReservedCards");

//important
marketAreaEl.addEventListener("click", (e) =>{
  const cardEl = e.target.closest(".card");
  if (!cardEl) return;

  if (state.currentAction === "reserve"){
  const cardId = cardEl.dataset.id;
  state.selectedReserveIndex = cardId;
  render();
  return;
}

  const btn = e.target.closest(".buyCardButton");
  if (!btn) return;

  const cardId = btn.dataset.id;
  const card = marketCards.find(card => card.id === cardId);

  if (!canAffordCard(card)){
  setLog(`Player ${state.currentPlayerIndex + 1} does not have enough chips to buy this card.`);
  return;
}

  const player = getCurrentPlayer();
  const currentPlayerNumber = state.currentPlayerIndex + 1;
  const nextPlayerNumber = ((state.currentPlayerIndex + 1) % state.players.length) + 1;

  payForCard(card);
  applyCardReward(card);

  const cardIndex = marketCards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return;
  marketCards.splice(cardIndex, 1);

  player.ownedCards.push(card);

  const claimedNoble = claimAvailableNoble(player);

  if (claimedNoble){
    setLog(`Player ${currentPlayerNumber} bought a ${card.color} card (${card.points} VP), claimed ${claimedNoble.id}, and it is now Player ${nextPlayerNumber}'s turn.`);
  } 
  else {
    setLog(`Player ${currentPlayerNumber} bought a ${card.color} card (${card.points} VP). Player ${nextPlayerNumber}'s turn.`);
  }

  endTurn();
});

  reservedCardsEl.addEventListener("click", (e) =>{
  const btn = e.target.closest(".buyReservedCardButton");
  if (!btn) return;

  if (state.currentAction !== "take") return;

  const index = Number(btn.dataset.index);
  const player = getCurrentPlayer();
  const card = player.reservedCards[index];
  if (!card) return;

  if (!canAffordCard(card)){
    setLog(`Player ${state.currentPlayerIndex + 1} does not have enough chips to buy this reserved card.`);
    return;
  }

  payForCard(card);
  applyCardReward(card);

  player.ownedCards.push(card);
  player.reservedCards.splice(index, 1);

  const claimedNoble = claimAvailableNoble(player);

  const currentPlayerNumber = state.currentPlayerIndex + 1;
  const nextPlayerNumber = ((state.currentPlayerIndex + 1) % state.players.length) + 1;

  if (claimedNoble){
    setLog(`Player ${currentPlayerNumber} bought a reserved ${card.color} card (${card.points} VP), claimed ${claimedNoble.id}, and it is now Player ${nextPlayerNumber}'s turn.`);
  } else {
    setLog(`Player ${currentPlayerNumber} bought a reserved ${card.color} card (${card.points} VP). Player ${nextPlayerNumber}'s turn.`);
  }

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

function canClaimNoble(player, noble){
  return BONUS_COLORS.every(color =>
    (player.bonusChip[color] || 0) >= (noble.requiredBonuses[color] || 0)
  );
}

function claimAvailableNoble(player){
  const nobleIndex = nobles.findIndex(noble => canClaimNoble(player, noble));
  if (nobleIndex === -1) return null;

  const noble = nobles[nobleIndex];
  nobles.splice(nobleIndex, 1);
  player.nobles.push(noble);
  player.victoryPoints += noble.points;

  return noble;
}

// reserve card, as well as putting index for easier find
function renderOwnedCards(){
  const player = getCurrentPlayer();
  const ownedEl = document.querySelector("#player1OwnedCards");

  ownedEl.innerHTML = player.ownedCards
    .map((card, index) =>{
      return `
        <div class="card">
          <div class="card-top">
            <span class="card-points">${card.points}</span>
            <span class="card-bonus ${card.color.toLowerCase()}">${card.color}</span>
          </div>
          <div class="card-middle">
            <div>Level ${card.tier}</div>
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

  const card = marketCards.find(card => card.id === state.selectedReserveIndex);
  if (!card) return;

  player.reservedCards.push(card);

  const cardIndex = marketCards.findIndex(card => card.id === state.selectedReserveIndex);
  
  if (cardIndex === -1) return;
  marketCards.splice(cardIndex, 1);

  if (state.bank.Wild > 0 && totalChip(player.chips) < 10){
  player.chips.Wild += 1;
  state.bank.Wild -= 1;
}

  setLog(`Player ${state.currentPlayerIndex + 1} reserved a ${card.color} level ${card.tier} card.`);

  endTurn();
}

function renderReservedCards(){
  const player = getCurrentPlayer();
  const reservedEl = document.querySelector("#player1ReservedCards");

  reservedEl.innerHTML = player.reservedCards
    .map((card, index) =>{
      return `
        <div class="card">
          <div class="card-top">
            <span class="card-points">${card.points}</span>
            <span class="card-bonus ${card.color.toLowerCase()}">${card.color}</span>
          </div>
          <div class="card-middle">
            <div>Level ${card.tier}</div>
          </div>
          <button class="buyReservedCardButton" data-index="${index}">Buy Reserved</button>
        </div>
      `;
    })
    .join("");
}

function renderMarket(){
  const tier3Cards = marketCards.filter(card => card.tier === 3).slice(0, 4);
  const tier2Cards = marketCards.filter(card => card.tier === 2).slice(0, 4);
  const tier1Cards = marketCards.filter(card => card.tier === 1).slice(0, 4);

  marketTier3El.innerHTML = tier3Cards
    .map((card, index) => createCardHTML(card, index, 3))
    .join("");

  marketTier2El.innerHTML = tier2Cards
    .map((card, index) => createCardHTML(card, index, 2))
    .join("");

  marketTier1El.innerHTML = tier1Cards
    .map((card, index) => createCardHTML(card, index, 1))
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

debugEndGameButton.addEventListener("click", debugSetNearEndGame);

setLog("Game started. Player 1's turn.");

render();
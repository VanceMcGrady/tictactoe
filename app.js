const gameDisplay = (() => {
  const squaresArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const gameContainer = document.querySelector(".game-container");
  const playerCardX = document.querySelector("#player-x");
  const playerCardO = document.querySelector("#player-o");

  squaresArray.forEach(
    (item) =>
      (gameContainer.innerHTML += ` <div id="${item}" class="field" data-id="${item}"></div>`)
  );

  return { squaresArray, gameContainer, playerCardX, playerCardO };
})();

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }

  showPlayerSymbol() {
    console.log(this.symbol);
  }
}

const gameController = (() => {
  // state of which player's turn it is. true = x and false = 0
  let whosTurnIsIt = true;

  function changeTurn() {
    gameController.whosTurnIsIt = !gameController.whosTurnIsIt;

    gameDisplay.playerCardX.classList.toggle("turn-highlight");
    gameDisplay.playerCardO.classList.toggle("turn-highlight");
  }

  function returnArrayOfCurrentBoard() {
    const fieldsArray = Array.from(document.querySelectorAll(".field"));

    let currentBoard = fieldsArray.map((item) => {
      return item.innerText;
    });
    return currentBoard;
  }

  function checkForWin() {
    let plays = returnArrayOfCurrentBoard();

    let horizontal1 = [plays[0], plays[1], plays[2]];
    let horizontal2 = [plays[3], plays[4], plays[5]];
    let horizontal3 = [plays[6], plays[7], plays[8]];

    let vertical1 = [plays[0], plays[3], plays[6]];
    let vertical2 = [plays[1], plays[4], plays[7]];
    let vertical3 = [plays[2], plays[5], plays[8]];

    let diagonal1 = [plays[0], plays[4], plays[8]];
    let diagonal2 = [plays[2], plays[4], plays[6]];

    let allPossibleWins = [
      horizontal1,
      horizontal2,
      horizontal3,
      vertical1,
      vertical2,
      vertical3,
      diagonal1,
      diagonal2,
    ];

    let checkGame = allPossibleWins.forEach((trio) => {
      if (trio.every((field) => field === "X")) {
        gameDisplay.gameContainer.innerHTML = `<div class="winner-display"><h1>X Wins!</h1></div>`;
        setTimeout(gameDisplay, 1000);
      }
      if (trio.every((field) => field === "O")) {
        gameDisplay.gameContainer.innerHTML = `<div class="winner-display"><h1>O Wins!</h1></div>`;
      }
    });
  }

  return { whosTurnIsIt, changeTurn, checkForWin };
})();

(function eventListeners() {
  const squares = document.querySelectorAll(".field");
  const checkForWinBtn = document.querySelector(".check-for-win");

  checkForWinBtn.addEventListener("click", gameController.checkForWin);

  squares.forEach((square) =>
    square.addEventListener(
      "click",
      (e) => {
        if (gameController.whosTurnIsIt) {
          e.target.innerText = "X";
        }
        if (!gameController.whosTurnIsIt) {
          e.target.innerText = "O";
        }
        gameController.changeTurn();
      },
      { once: true }
    )
  );
})();

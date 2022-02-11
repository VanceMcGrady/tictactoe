const gameDisplay = (() => {
  const squaresArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const gameContainer = document.querySelector(".game-container");
  const playerCardX = document.querySelector("#player-x");
  const playerCardO = document.querySelector("#player-o");

  function displayBoard() {
    gameContainer.innerHTML = "";
    squaresArray.forEach(
      (item) =>
        (gameContainer.innerHTML += ` <div id="${item}" class="field" data-id="${item}"></div>`)
    );

    (function () {
      const squares = document.querySelectorAll(".field");

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
            gameController.checkForWin();
            gameController.checkForDraw();
            gameController.changeTurn();
          },
          { once: true }
        )
      );
    })();
  }

  displayBoard();

  return {
    squaresArray,
    gameContainer,
    playerCardX,
    playerCardO,
    displayBoard,
  };
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

    if (gameController.whosTurnIsIt === true) {
      gameDisplay.playerCardX.classList.add("turn-highlight");
      gameDisplay.playerCardO.classList.remove("turn-highlight");
    }
    if (gameController.whosTurnIsIt !== true) {
      gameDisplay.playerCardO.classList.add("turn-highlight");
      gameDisplay.playerCardX.classList.remove("turn-highlight");
    }
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

    allPossibleWins.forEach((trio) => {
      // X wins
      if (trio.every((field) => field === "X")) {
        gameDisplay.gameContainer.innerHTML = `<div class="winner-display"><h1>X Wins!</h1></div>`;
        setTimeout(resetGame, 1000);
        return;
      }
      // O wins
      if (trio.every((field) => field === "O")) {
        gameDisplay.gameContainer.innerHTML = `<div class="winner-display"><h1>O Wins!</h1></div>`;
        setTimeout(resetGame, 1000);
        return;
      }
      // Draw
      returnArrayOfCurrentBoard().includes("") ? null : console.log("draw");
    });
  }

  function checkForDraw() {}

  function resetGame() {
    gameDisplay.displayBoard();
    gameController.whosTurnIsIt = false;
    changeTurn();
  }
  return {
    whosTurnIsIt,
    changeTurn,
    checkForWin,
    checkForDraw,
    resetGame,
    returnArrayOfCurrentBoard,
  };
})();

// const eventListeners = (function () {
//   const squares = document.querySelectorAll(".field");

//   squares.forEach((square) =>
//     square.addEventListener(
//       "click",
//       (e) => {
//         if (gameController.whosTurnIsIt) {
//           e.target.innerText = "X";
//         }
//         if (!gameController.whosTurnIsIt) {
//           e.target.innerText = "O";
//         }
//         gameController.checkForWin();
//         gameController.changeTurn();
//       },
//       { once: true }
//     )
//   );
// })();

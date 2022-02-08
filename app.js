const gameDisplay = (() => {
  const squaresArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const gameContainer = document.querySelector(".game-container");
  const playerCardX = document.querySelector("#player-x");
  const playerCardO = document.querySelector("#player-o");

  squaresArray.forEach(
    (item) =>
      (gameContainer.innerHTML += ` <div id="${item}" class="field">${item}</div>`)
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
  let whosTurnIsIt = true;

  function changeTurn() {
    gameController.whosTurnIsIt = !gameController.whosTurnIsIt;

    gameDisplay.playerCardX.classList.toggle("turn-highlight");
    gameDisplay.playerCardO.classList.toggle("turn-highlight");
  }
  return { whosTurnIsIt, changeTurn };
})();

(function eventListeners() {
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
        gameController.changeTurn();
      },
      { once: true }
    )
  );
})();

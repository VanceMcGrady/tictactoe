(function gameDisplay() {
  const squaresArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const gameContainer = document.querySelector(".game-container");

  squaresArray.forEach(
    (item) =>
      (gameContainer.innerHTML += ` <div id="${item}" class="field"></div>`)
  );
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
  const changeTurn = () => {
    if (gameController.whosTurnIsIt === "x") {
      gameController.whosTurnIsIt = "o";
    }
    if (gameController.whosTurnIsIt === "o") {
      gameController.whosTurnIsIt = "x";
    }
  };
  return { whosTurnIsIt: "x" };
})();

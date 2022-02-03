const gameDisplay = (() => {
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
  let whosTurnIsIt = true;
  function changeTurn() {
    gameController.whosTurnIsIt = !gameController.whosTurnIsIt;
  }
  return { whosTurnIsIt, changeTurn };
})();

(function eventListeners() {
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("field")) {
      if (gameController.whosTurnIsIt) {
        e.target.innerText = "X";
      }
      if (!gameController.whosTurnIsIt) {
        e.target.innerText = "O";
      }
      gameController.changeTurn();
    }
  });
})();

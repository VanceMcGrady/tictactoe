(function gameDisplay() {
  const squaresArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const gameContainer = document.querySelector(".game-container");

  squaresArray.forEach(
    (item) =>
      (gameContainer.innerHTML += ` <div id="${item}" class="field">${item}</div>`)
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

(function gameController() {})(console.log("IIFE"));

import Hangman from "./hangman.js";
import getPuzzle from "./requests.js";

let newGame;
startGame();

async function startGame() {
  const puzzle = await getPuzzle(2);
  console.log(puzzle);
  newGame = new Hangman(puzzle, 5);
  renderHTML();
}

function renderHTML() {
  const html = `<h1>${newGame.puzzle}</h1>\n<p>Guesses Left: ${
    newGame.noOfGuessesAllowed
  }</p>`;
  // puzzle is a getter method here
  document
    .querySelector(".challenge-box")
    .insertAdjacentHTML("afterbegin", html);
}

function refreshPage() {
  window.location.reload();
}

document.querySelector("#reset").addEventListener("click", refreshPage);

window.addEventListener("keydown", evt => {
  const getASCII = evt.keyCode;
  // a-z : 65 - 90
  // A-Z : 65 - 90 (keycodes as per browser)
  if (getASCII >= 65 && getASCII <= 90) {
    newGame.makeGuess(evt.key);
    const challengeBoxSelection = ".challenge-box";
    document.querySelector(challengeBoxSelection).innerHTML = "";

    let heading = document.createElement("h1");
    let guessCount = document.createElement("p");

    heading.textContent = newGame.puzzle; // getter method: puzzle
    guessCount.textContent = `Guesses Left: ${newGame.noOfGuessesAllowed}`;

    document.querySelector(challengeBoxSelection).appendChild(heading);
    document.querySelector(challengeBoxSelection).appendChild(guessCount);
    console.log(newGame.status);
    let message = document.createElement("p");
    message.textContent = newGame.message; // getter method: message
    document.querySelector(challengeBoxSelection).appendChild(message);
  }
});

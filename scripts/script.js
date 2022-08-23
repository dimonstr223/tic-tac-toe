"use strict";

const gameboard = document.getElementById("gameboard");
console.log(gameboard);
const boxes = Array.from(document.querySelectorAll(".game__gameboard-box"));
const playText = document.getElementById("playText");
const restartBtn = document.getElementById("restartBtn");

const playerO = "O";
const playerX = "X";
let currentPlayer = playerX;
const spaces = [];

const winningCombos = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [8, 5, 2],
  [8, 7, 6],
  [2, 4, 6],
  [1, 4, 7],
  [3, 4, 5],
];

// drawing borders to all boxes and starting game by event handler
const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";

    if (index < 3) {
      styleString = "border-bottom: 2px solid var(--pink);";
    }
    if (index % 3 === 0) {
      styleString += "border-right: 2px solid var(--pink);";
    }
    if (index % 3 === 2) {
      styleString += "border-left: 2px solid var(--pink);";
    }
    if (index > 5) {
      styleString += "border-top: 2px solid var(--pink);";
    }

    box.style = styleString;

    box.addEventListener("click", clickedBox);
  });
};

const clickedBox = (e) => {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    // ending the game and styling winning boxes
    if (playerHasWon()) {
      playText.innerHTML = `${currentPlayer} has won!`;

      let winningBoxes = playerHasWon();

      winningBoxes.map((box) => {
        boxes[box].style.backgroundColor = "var(--winning-blocks)";
      });

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
    }

    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  }
};

// searching winning combinations on the game board
const playerHasWon = () => {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
};

// restarting the game
const restart = () => {
  playText.innerText = `Let's play!`;
  currentPlayer = playerX;
  spaces.length = 0;
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "auto";
    box.style.backgroundColor = "#43305e";
  });
  gameboard.classList.toggle("game__gameboard--restart");
};

restartBtn.addEventListener("click", restart);

drawBoard();

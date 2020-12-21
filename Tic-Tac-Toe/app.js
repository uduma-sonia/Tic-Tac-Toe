const x_class = "x";
const circle_class = "circle";
const winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winningMsgTextContainer = document.querySelector(".winMsg");
const winningMsgText = document.querySelector("[data-win-msg-text]");
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartBtn");
const O_player = document.querySelector(".Oplayer");
const X_player = document.querySelector(".Xplayer");
let circleTurn;
startGame();

restartButton.addEventListener("click", startGame);

//FUNCTION TO CLICK THE BOXES ONCE
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(circle_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHoverClass();
  winningMsgTextContainer.classList.remove("show");
  O_player.value = " ";
  X_player.value = " ";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;

  //PLACEMARKS IN BOXES
  placeMark(cell, currentClass);

  //CHECK FOR WIN
  if (checkwin(currentClass)) {
    endgame(false);
  }
  //CHECK FOR DRAW
  else if (isDraw()) {
    endgame(true);
  }
  //SWITCH PLAYER TURNS
  else {
    switchTurns();
    setHoverClass();
  }
}

function endgame(draw) {
  if (draw) {
    winningMsgText.innerText = "DRAW!";
  } else {
    winningMsgText.innerText = `${
      circleTurn ? O_player.value : X_player.value
    } Wins!`;
  }
  winningMsgTextContainer.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  circleTurn = !circleTurn;
}

function setHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if (circleTurn) {
    board.classList.add(circle_class);
  } else {
    board.classList.add(x_class);
  }
}

function checkwin(currentClass) {
  return winning_combination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

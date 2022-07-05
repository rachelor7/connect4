var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
// keep track of how many pucks on bottom
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function () {
  setGame();
};

const setGame = () => {
  board = [];
  currColumns = Array.from({ length: 7 }).fill(5);

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // JS
      row.push("");

      // HTML
      // <div id="0-0" class="tile"></div>
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
};

const setPiece = (e) => {
  if (gameOver) return;

  let coords = e.target.id.split("-");
  let c = parseInt(coords[1]);
  let r = currColumns[c];

  // column is filled
  if (r < 0) return;

  board[r][c] = currPlayer;
  currColumns[c] -= 1;

  // current tile clicked
  tile = document.getElementById(r.toString() + "-" + c.toString());

  // change color in that tile
  if (currPlayer === playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerRed;
  }

  checkWinner();
};

const checkWinner = () => {
  // check horizontally (sliding window)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== "") {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c + 1] === board[r][c + 2] &&
          board[r][c + 2] === board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // check vertically
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] !== "") {
        if (
          board[r][c] === board[r + 1][c] &&
          board[r + 1][c] === board[r + 2][c] &&
          board[r + 2][c] === board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // check anti-diagonally
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== "") {
        if (
          board[r][c] === board[r + 1][c + 1] &&
          board[r + 1][c + 1] === board[r + 2][c + 2] &&
          board[r + 2][c + 2] === board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // check diagonally
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== "") {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r - 1][c + 1] === board[r - 2][c + 2] &&
          board[r - 2][c + 2] === board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
};

const setWinner = (r, c) => {
  let winner = document.getElementById("winner");
  if (board[r][c] === playerRed) {
    winner.innerText = "Red Wins";
  } else {
    winner.innerText = "Yellow Wins";
  }
  gameOver = true;
};

var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;

window.onload = function () {
  setGame();
};

const setGame = () => {
  board = [];

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
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  board[r][c] = currPlayer;

  // current tile clicked
  tile = e.target;

  // change color in that tile
  if (currPlayer === playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerRed;
  }
};

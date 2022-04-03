var socket = io();

const side = 25;
const X = side * 25;
const Y = side * 25;
let wether = 0;

function setup() {
  createCanvas(X, Y);
  background("#fff");
}

function drawMatrix(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (wether == 0) {
        if (matrix[y][x] == 1) {
          fill("green");
        } else if (matrix[y][x] == 2) {
          fill("#ffff00");
        } else if (matrix[y][x] == 3) {
          fill("red");
        } else if (matrix[y][x] == 4) {
          fill("blue");
        } else if (matrix[y][x] == 5) {
          fill("black");
        } else {
          fill("grey");
        }
      } else if (wether == 1) {
        if (matrix[y][x] == 1) {
          fill("#d9a732");
        } else if (matrix[y][x] == 2) {
          fill("yellow");
        } else if (matrix[y][x] == 3) {
          fill("#9e2902");
        } else if (matrix[y][x] == 4) {
          fill("blue");
        } else if (matrix[y][x] == 5) {
          fill("black");
        } else {
          fill("grey");
        }
      } else if (wether == 2) {
        if (matrix[y][x] == 1) {
          fill("#b8984f");
        } else if (matrix[y][x] == 2) {
          fill("#fff5c2");
        } else if (matrix[y][x] == 3) {
          fill("#9e2902");
        } else if (matrix[y][x] == 4) {
          fill("blue");
        } else if (matrix[y][x] == 5) {
          fill("black");
        } else {
          fill("grey");
        }
      } else if (wether == 3) {
        if (matrix[y][x] == 1) {
          fill("white");
        } else if (matrix[y][x] == 2) {
          fill("#bcebe7");
        } else if (matrix[y][x] == 3) {
          fill("#542e1e");
        } else if (matrix[y][x] == 4) {
          fill("blue");
        } else if (matrix[y][x] == 5) {
          fill("black");
        } else {
          fill("grey");
        }
      }
      rect(x * side, y * side, side, side);
    }
  }
}

setInterval(function () {
  socket.on("send matrix", drawMatrix);
}, 1000);

function spring() {
  wether = 0;
}

function summer() {
  wether = 1;
}

function fall() {
  wether = 2;
}

function winter() {
  wether = 3;
}

function reset() {
  socket.emit("reset");
}

function keyPressed() {
  if (key == "%") {
    wether = 0;
  } else if (key == "&") {
    wether = 1;
  } else if (key == "'") {
    wether = 2;
  } else if (key == "(") {
    wether = 3;
  }
}

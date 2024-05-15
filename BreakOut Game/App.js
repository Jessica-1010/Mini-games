// source: https://www.youtube.com/watch?v=ec8vSKJuZTk 1:35:40

const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
let timerId;
const ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;

const startPosition = [230, 10];
let currentPosistion = startPosition;

const ballInitialPosition = [270, 30];
let currentBallPosition = ballInitialPosition;

const boardWidth = 570;
const boardHeight = 300;

// create each block. where each 4 points are.
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// create all blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// Generate all blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlocks();

// add User
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// draw the User
function drawUser() {
  user.style.left = currentPosistion[0] + "px";
  user.style.bottom = currentPosistion[1] + "px";
}

// move User
function moveUser(event) {
  switch (event.key) {
    case "ArrowLeft":
      if (currentPosistion[0] > 0) {
        currentPosistion[0] = currentPosistion[0] - 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosistion[0] < boardWidth - blockWidth) {
        currentPosistion[0] = currentPosistion[0] + 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

// Add ball
const ball = document.createElement("div");
ball.classList.add("ball");
ballPoint();
grid.appendChild(ball);

// position the ball
function ballPoint() {
  ball.style.left = ballInitialPosition[0] + "px";
  ball.style.bottom = ballInitialPosition[1] + "px";
}

// move the ball
function startGame() {
  function movingBall() {
    ballInitialPosition[0] = ballInitialPosition[0] + xDirection;
    ballInitialPosition[1] = ballInitialPosition[1] + yDirection;
    ballPoint();
    checkForCollision();
  }
  timerId = setInterval(movingBall, 30);
}

// handle collision
function checkForCollision() {
  // check for block collision. if the ball is between the block bottomleft & bottom right xAxis
  for (let i = 0; i < blocks.length; i++) {
    if (
      currentBallPosition[0] > blocks[i].bottomLeft[0] &&
      currentBallPosition[0] < blocks[i].bottomRight[0] &&
      currentBallPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      currentBallPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
    }

    // check for won
    if (blocks.length == 0) {
      alert("You won!");
      clearInterval(timerId);
    }
  }
  // check for User collision
  if (
    currentBallPosition[0] > currentPosistion[0] &&
    currentBallPosition[0] < currentPosistion[0] + blockWidth &&
    currentBallPosition[1] > currentPosistion[1] &&
    currentBallPosition[1] < currentPosistion[1] + blockHeight
  ) {
    changeDirection();
  }
  // check for wall
  if (
    currentBallPosition[0] >= boardWidth - ballDiameter ||
    currentBallPosition[1] >= boardHeight - ballDiameter ||
    currentBallPosition[0] <= 0
  ) {
    changeDirection();
  }
  // check for GameOver
  if (currentBallPosition[1] <= 0) {
    clearInterval(timerId);
    console.log("Game Over!");
  }
}
// change direction
function changeDirection() {
  if (xDirection === 2 && yDirection == 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

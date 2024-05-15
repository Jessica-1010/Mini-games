const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

let timerId;
let currentPosition = 76;
const widthSpan = 9;

// add & moving the frog
document.addEventListener("keyup", moveFrog);

function moveFrog(event) {
  squares[currentPosition].classList.remove("frog");

  switch (event.key) {
    case "ArrowRight":
      if (currentPosition % widthSpan < widthSpan - 1)
        currentPosition = currentPosition + 1;
      break;
    case "ArrowLeft":
      if (currentPosition % widthSpan !== 0) {
        currentPosition = currentPosition - 1;
      }
      break;
    case "ArrowDown":
      if (currentPosition + widthSpan < widthSpan * widthSpan)
        currentPosition = currentPosition + widthSpan;
      break;
    case "ArrowUp":
      if (currentPosition - widthSpan >= 0)
        currentPosition = currentPosition - widthSpan;
      break;
  }
  squares[currentPosition].classList.add("frog");
}

// add moving cars and logs
function autoMoveLogs() {
  logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carsLeft.forEach((carleft) => moveCarLeft(carleft));
  carsRight.forEach((carRight) => moveCarRight(carRight));
  lostGame();
}

function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
  }
}

function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
      break;
  }
}

function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;
  }
}

// Lose the game
function lostGame() {
  if (
    squares[currentPosition].classList.contains("c1") ||
    squares[currentPosition].classList.contains("l4", "l5")
  ) {
    resultDisplay.textContent = "You Lose!";
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
  }
}
function win() {
  if (squares[currentPosition].classList.contains("ending-block")) {
    resultDisplay.textContent = "You Won!";
    clearInterval(timerId);
  }
}
timerId = setInterval(autoMoveLogs, 1000);

let score = document.querySelector("#score");
const timeLeft = document.querySelector("#time");
const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");

let result = 0;
let targetPosition;
let currentTime = 60;
let timerId;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomIndexSquare = squares[Math.floor(Math.random() * 9)];
  randomIndexSquare.classList.add("mole");
  targetPosition = randomIndexSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === targetPosition) {
      result++;
      score.innerHTML = result;
      targetPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 1000);
}

function countDown() {
  currentTime--;
  timeLeft.innerHTML = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("Game Over!");
  }
}
let countDownTimerId = setInterval(countDown, 1000);

function pause() {
  clearInterval(countDownTimerId);
  clearInterval(timerId);
}

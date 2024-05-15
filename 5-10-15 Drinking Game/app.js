// source: https://www.youtube.com/watch?v=ec8vSKJuZTk 2:42

const callOutNumberDisplay = document.getElementById("call-number");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("result");
const PossibleChoices = document.querySelectorAll("button");

let numberArray = [0, 5, 10, 15, 20];
let callOutNumber;
let userChoice;
let computerChoice;
let result;

function randomCallOutNumber() {
  let randomIndex = Math.floor(Math.random() * numberArray.length);
  callOutNumber = numberArray[randomIndex];
  callOutNumberDisplay.innerHTML = callOutNumber;
}
setInterval(() => {
  randomCallOutNumber();
}, 1000);

PossibleChoices.forEach((possibleChoice) => {
  possibleChoice.addEventListener("click", (event) => {
    userChoice = event.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    generateResult();
    randomCallOutNumber();
  });
});

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * PossibleChoices.length + 1);
  if (randomNumber === 1) {
    computerChoice = "0";
  }
  if (randomNumber === 2) {
    computerChoice = "5";
  }
  if (randomNumber === 3) {
    computerChoice = "10";
  }

  computerChoiceDisplay.innerHTML = computerChoice;
}

function generateResult() {
  result = Number(userChoice) + Number(computerChoice);
  if (result === callOutNumber) {
    result = "You Won";
  }
  resultDisplay.innerHTML = result;
}


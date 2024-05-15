// Source: https://www.youtube.com/watch?v=ec8vSKJuZTk 19:15
// Can use WebStorm as another IDE!

//  Creating 12 cards:
const cardArray = [
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  { name: "fries", img: "images/fries.png" },
  { name: "hotdog", img: "images/hotdog.png" },
  { name: "ice-cream", img: "images/ice-cream.png" },
  { name: "milkshake", img: "images/milkshake.png" },
  { name: "pizza", img: "images/pizza.png" },
  { name: "cheeseburger", img: "images/cheeseburger.png" },
  { name: "fries", img: "images/fries.png" },
  { name: "hotdog", img: "images/hotdog.png" },
  { name: "ice-cream", img: "images/ice-cream.png" },
  { name: "milkshake", img: "images/milkshake.png" },
  { name: "pizza", img: "images/pizza.png" },
];

// creating a random order in the array:
cardArray.sort(() => 0.5 - Math.random());

// creating a grid
const gridDisplay = document.querySelector("#grid");
const scoreDisplay = document.querySelector("#score");

function createBoard() {
  for (i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}
createBoard();

// to flip the card. (.this method allows us to interact with whatever element we clicked!)

let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];

function checkMatch() {
  // getting all img in the div
  const cards = document.querySelectorAll("img");

  // used cardChosenIds because cardChosen[name] isn't unique.
  if (cardChosen[0] === cardChosen[1]) {
    cards[cardChosenIds[0]].setAttribute("src", "images/white.png");
    cards[cardChosenIds[1]].setAttribute("src", "images/white.png");
    cards[cardChosenIds[0]].removeEventListener("click", flipCard);
    cards[cardChosenIds[1]].removeEventListener("click", flipCard);
    cardsWon.push(cardChosen);
    console.log(cardsWon.length);
  } else {
    cards[cardChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardChosenIds[1]].setAttribute("src", "images/blank.png");
  }
  let score = cardsWon.length;
  scoreDisplay.innerHTML = score;

  cardChosen = [];
  cardChosenIds = [];
  if (cardsWon.length === cardArray.length / 2) {
    scoreDisplay.innerHTML = "You found them All!";
    clearInterval(timer);
  }
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardChosen.push(cardArray[cardId].name);
  cardChosenIds.push(cardId);

  this.setAttribute("src", cardArray[cardId].img);
  if (cardChosen.length === 2) {
    // check if mathch using match() after 1 sec
    setTimeout(checkMatch, 500);
  }
}

// set Timer
let timer;
let timerDisplay = document.getElementById("timer");

function time() {
  let sec = 0;
  timer = setInterval(() => {
    timerDisplay.innerHTML = "00:" + sec;
    sec++;
  }, 1000);
}
time();

function pause() {
  clearInterval(timer);
  timer = "";
}

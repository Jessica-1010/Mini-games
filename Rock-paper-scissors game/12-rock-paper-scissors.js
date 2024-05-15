/*can remove it after replace with JSON code.
  const score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  */
  
  // getting value out of local storage.
  let score = JSON.parse(localStorage.getItem('score:'));

  if (score === null) {   
    score = {
      wins: 0,
      losses: 0,
      ties:0,
    }
  };
  /* or use the shortcut. default operater.
  let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties:0,
  };   */
  
  updateScoreElement();

  // creating a varible to keep track if we are playing
  
  let isAutoPlaying = false; 
  // leave intervalID undefined to start.

  let intervalID;

  
  function autoPlay (){
    if (! isAutoPlaying){
        intervalID = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      },1000);
      isAutoPlaying = true;
      // changed variable to true because AutoPlaying is now playing
      } else {
      // need to Stop the interval by creating a variable to store all the IDs generate from each interval.  Need to store it outside of this function scope in order to get all the IDs from each interval.
      clearInterval(intervalID);
      isAutoPlaying = false;
      }
  }

  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock');
    });

  document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('paper');
    });

  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('scissors');
    });

      // event as a param when key is press, addevenlisterner will save the keypress into the event then run the function.
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper')
    } else if (event.key === 's') {
      playGame('scissors')
    }
  });
  
  function playGame (playerMove){
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock') {
      if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You Lose.';
    } else if (computerMove === 'scissors') {
      result = 'You Win.';
    }  

   } else if (playerMove === 'scissors'){
    if (computerMove === 'rock') {
      result = 'You Lose.';
    } else if (computerMove === 'paper') {
      result = 'You Win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

   } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
   result = 'You Win.';
  } else if (computerMove === 'paper') {
   result = 'Tie.';
  } else if (computerMove === 'scissors') {
   result = 'You Lose.';
  }
   }   

   if (result === 'You Win.'){
    score.wins += 1;
   } else if (result === 'You Lose.'){
    score.losses += 1;
   } else if (result === 'Tie.'){
    score.ties += 1;
   }

  //  build-in local storage. string only. so 'score' object  needs to covert to string using JSON.
  localStorage.setItem('score:', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
  .innerHTML = `${result}`;

  document.querySelector('.js-move')
  .innerHTML = `You 
  <img src="./images/${playerMove}-emoji.png" class="move-icon">
  <img src="./images/${computerMove}-emoji.png" class="move-icon">
  computer`;  
    
  }

  function updateScoreElement() {
    document.querySelector('.js-score')  
    .innerHTML = `Wins: ${score.wins}.  Losses: ${score.losses}. Ties: ${score.ties}.`;
  }

  function pickComputerMove (){
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3){
      computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3){
      computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1){
      computerMove = 'scissors';
    }

    return computerMove;
  }

    

   
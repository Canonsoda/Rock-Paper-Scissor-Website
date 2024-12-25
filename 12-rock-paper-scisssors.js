let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScoreElement();

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () =>{}
function autoPlay(){
      if(!isAutoPlaying)
      {
      intervalId=setInterval(() =>{
        const playerMove=pickComputerMove();
        playGame(playerMove);
      },1000);
      isAutoPlaying=true;
       }
       else{
    clearInterval(intervalId);
    isAutoPlaying=false;
    }
  }


function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }
  return computerMove;
}

document.body.addEventListener('keydown' ,(event)=>{
  if(event.key ==='r'){
    playGame('Rock');
  }
  else if(event.key ==='p'){
    playGame('Paper');
  }
  else if(event.key==='s'){
    playGame('Scissors');
  }
})

document.querySelector('.js-rock-button')
.addEventListener('click',()=>{playGame('Rock')});

document.querySelector('.js-paper-button')
.addEventListener('click',()=>{playGame('Paper')});

document.querySelector('.js-scissor-button')
.addEventListener('click',()=>{playGame('Scissors')});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lost";
    } else if (computerMove === "Paper") {
      result = "You Won";
    } else {
      result = "Tie";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You Lost";
    } else {
      result = "You Won";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Won";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else {
      result = "You Lost";
    }
  }
  if (result === "You Won") {
    score.wins++;
  } else if (result === "You Lost") {
    score.losses++;
  } else if (result == "Tie") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" class="emoji" />
<img src="images/${computerMove}-emoji.png" class="emoji" /> Computer; `;

  document.querySelector(".js-result").innerHTML = `${result}`;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}

const squares = document.querySelectorAll(".square");
const moles = document.querySelector("mole");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const startButton = document.getElementById("start-button");

let result = 0;
let hitPosition;
let currentTime = 10;
let countDownTimerId = setInterval(countDown, 1000);
let timerId = null;

//Creates mole
function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}

//Moves mole
function moveMole() {
  timerId = setInterval(randomSquare, 1000);
}

//Counts score
squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      scoreDisplay.innerHTML = result;
      hitPosition = null;
    }
  });
});

//Count down timer
function countDown() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("Game Over! Your final score is: " + result);
  }
}

//start game
startButton.addEventListener("click", (e) => {
  moveMole();
  countDown();
});

const timeDisplay = document.querySelector("#time-display");
const resultDisplay = document.querySelector("#result-display");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
const gridWidth = 9;

let currentIndex = 76;
let timerId = 0;
let outcomeTimerId = 0;
let currentTime = 20;

//move frogger
function moveFrog(e) {
  squares[currentIndex].classList.remove("frog");

  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % gridWidth !== 0) currentIndex--;
      break;
    case "ArrowRight":
      if (currentIndex % gridWidth !== 8) currentIndex++;
      break;
    case "ArrowUp":
      if (currentIndex - gridWidth >= 0) currentIndex -= gridWidth;
      break;
    case "ArrowDown":
      if (currentIndex + gridWidth < gridWidth * gridWidth)
        currentIndex += gridWidth;
      break;
  }

  squares[currentIndex].classList.add("frog");
  console.log(currentIndex);
}

document.addEventListener("keydown", moveFrog);

//move Elements & update timer
function autoMoveElements() {
  currentTime--;
  timeDisplay.textContent = currentTime;
  logsLeft.forEach((LogLeft) => moveLogLeft(LogLeft));
  logsRight.forEach((LogRight) => moveLogRight(LogRight));
  carsLeft.forEach((CarLeft) => moveCarLeft(CarLeft));
  carsRight.forEach((CarRight) => moveCarRight(CarRight));
  loseGame();
  winGame();
  checkTime();
}

function checkOutcomes() {
  loseGame();
  winGame();
  checkTime();
}

// left logs movement
function moveLogLeft(LogLeft) {
  switch (true) {
    case LogLeft.classList.contains("l1"):
      LogLeft.classList.remove("l1");
      LogLeft.classList.add("l2");
      break;
    case LogLeft.classList.contains("l2"):
      LogLeft.classList.remove("l2");
      LogLeft.classList.add("l3");
      break;
    case LogLeft.classList.contains("l3"):
      LogLeft.classList.remove("l3");
      LogLeft.classList.add("l4");
      break;
    case LogLeft.classList.contains("l4"):
      LogLeft.classList.remove("l4");
      LogLeft.classList.add("l5");
      break;
    case LogLeft.classList.contains("l5"):
      LogLeft.classList.remove("l5");
      LogLeft.classList.add("l1");
      break;
  }
}
// right logs movement
function moveLogRight(LogRight) {
  switch (true) {
    case LogRight.classList.contains("l1"):
      LogRight.classList.remove("l1");
      LogRight.classList.add("l5");
      break;
    case LogRight.classList.contains("l2"):
      LogRight.classList.remove("l2");
      LogRight.classList.add("l1");
      break;
    case LogRight.classList.contains("l3"):
      LogRight.classList.remove("l3");
      LogRight.classList.add("l2");
      break;
    case LogRight.classList.contains("l4"):
      LogRight.classList.remove("l4");
      LogRight.classList.add("l3");
      break;
    case LogRight.classList.contains("l5"):
      LogRight.classList.remove("l5");
      LogRight.classList.add("l4");
      break;
  }
}

// left logs movement
function moveCarLeft(CarLeft) {
  switch (true) {
    case CarLeft.classList.contains("c1"):
      CarLeft.classList.remove("c1");
      CarLeft.classList.add("c2");
      break;
    case CarLeft.classList.contains("c2"):
      CarLeft.classList.remove("c2");
      CarLeft.classList.add("c3");
      break;
    case CarLeft.classList.contains("c3"):
      CarLeft.classList.remove("c3");
      CarLeft.classList.add("c1");
      break;
  }
}
// right logs movement
function moveCarRight(CarRight) {
  switch (true) {
    case CarRight.classList.contains("c1"):
      CarRight.classList.remove("c1");
      CarRight.classList.add("c3");
      break;
    case CarRight.classList.contains("c2"):
      CarRight.classList.remove("c2");
      CarRight.classList.add("c1");
      break;
    case CarRight.classList.contains("c3"):
      CarRight.classList.remove("c3");
      CarRight.classList.add("c2");
      break;
  }
}

//check for lossing
function loseGame() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5")
  ) {
    resultDisplay.textContent = "You Lose!";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keydown", moveFrog);
  }
}

//check for winning
function winGame() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = "You Win!";
    clearInterval(timerId);
    document.removeEventListener("keydown", moveFrog);
  }
}

//check for time left
function checkTime() {
  if (
    currentTime <= 0 &&
    !squares[currentIndex].classList.contains("ending-block")
  ) {
    resultDisplay.textContent = "You Lose!";
    clearInterval(timerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keydown", moveFrog);
  }
}

startPauseButton.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    timerId = null;
    outcomeTimerId = null;
    document.removeEventListener("keydown", moveFrog);
  } else {
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutcomes, 50);
    document.addEventListener("keydown", moveFrog);
  }
});

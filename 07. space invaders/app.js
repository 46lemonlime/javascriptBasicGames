const grid = document.querySelector(".grid");
const resultsDisplay = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
let width = 15;
let currentShooterIndex = 202;
let invadersDirection = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let score = 0;

for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}

draw();

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

squares[currentShooterIndex].classList.add("shooter");

// Move the shooter
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

//move the invaders
function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();

  //move down when finish right
  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      invadersDirection = -1;
      goingRight = false;
    }
  }
  //move down when finish left
  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      invadersDirection = 1;
      goingRight = true;
    }
  }

  // check for game over
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += invadersDirection;
  }
  draw();

  //check for collision invader-shooter
  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    resultsDisplay.innerHTML = "GAME OVER";
    clearInterval(invadersId);
  }

  //check for collision invader-floor
  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length) {
      resultsDisplay.innerHTML = "GAME OVER";
      clearInterval(invadersId);
    }
  }
  //check for win
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = "YOU WIN";
    clearInterval(invadersId);
  }
}
invadersId = setInterval(moveInvaders, 500);

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add("laser");

    // collision laser-invader
    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.add("boom");

      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        300
      );
      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      score++;
      scoreDisplay.innerHTML = score;
    }
  }
  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", shoot);

document.addEventListener("DOMContentLoaded", () => {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.querySelector("#alert");
  let isJumping = false;
  let gravity = 0.9;
  let isGameOver = false;

  // controle function

  function control(e) {
    if (e.keyCode === 70) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }

  document.addEventListener("keyup", control);

  let positions = 0;
  function jump() {
    let count = 0;
    const timerId = setInterval(() => {
      // down
      if (count === 15) {
        clearInterval(timerId);
        console.log("down");
        let timerDown = setInterval(() => {
          if (count === 0) {
            clearInterval(timerDown);
            isJumping = false;
          }
          positions -= 5;
          count--;
          positions = positions * gravity;
          dino.style.bottom = positions + "px";
        }, 20);
      }

      // up
      console.log("up");
      count++;
      clearInterval("timerDown");
      positions += 30;
      positions *= gravity;
      dino.style.bottom = positions + "px";
    }, 20);
  }

  function generateObstacles() {
    let randomTime = Math.random() * 4000;
    let obstaclePositions = 1000;
    const obstacles = document.createElement("div");
    if (!isGameOver) obstacles.classList.add("obstacles");
    grid.appendChild(obstacles);
    obstacles.style.left = obstaclePositions + "px";

    let timerId = setInterval(() => {
      if (obstaclePositions > 0 && obstaclePositions < 60 && positions < 60) {
        clearInterval(timerId);
        alert.innerHTML = "Game Over";
        isGameOver = true;

        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
      }

      obstaclePositions -= 05;
      obstacles.style.left = obstaclePositions + "px";
    }, 20);
    if (!isGameOver) setTimeout(generateObstacles, randomTime);
  }

  generateObstacles();
});

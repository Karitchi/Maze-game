"use strict";
function game() {
  let currentPosition = [0, 0];
  document.addEventListener("keydown", move);

  function move(e) {
    let key = e.key;


    switch (key) {
      case "ArrowUp":

        if (document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.borderTop === "none") {
          document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.backgroundColor = "white";
          currentPosition[1]--;
          document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.backgroundColor = "red";
        }
        break;

      case "ArrowRight":
        if (document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.borderRight === "none") {
          document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.backgroundColor = "white";
          currentPosition[0]++;
          document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.backgroundColor = "red";
        }
        break;

      case "ArrowDown":
        if (document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.borderBottom === "none") {
          document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.backgroundColor = "white";
          currentPosition[1]++;
          document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.backgroundColor = "red";
        }
        break;

      case "ArrowLeft":
        if (document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.borderLeft === "none") {
          document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.backgroundColor = "white";
          currentPosition[0]--;
          document.getElementById(`x${currentPosition[0]}y${currentPosition[1]}`).style.backgroundColor = "red";
        }
        break;
    }
  }
}

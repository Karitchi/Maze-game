"use strict";

function init(form) {
  let
    x = form.cols.value,
    y = form.rows.value,
    randomDirection = 0,
    cells = [],
    stack = [],
    currentCellId,
    lastCellId;

  createHTMLTable();
  function createHTMLTable() {

    document.getElementById("mainGrid").innerHTML =
      `<table id="tableGrid">
      <tbody id="tbodyGrid"></tbody>
      </table>`;

    let table = document.getElementById("tbodyGrid");
    let buildTable = "";

    for (let i = 0; i < y; i++) {
      buildTable += `<tr id="R${i}">`;
      for (let j = 0; j < x; j++) {
        buildTable +=
          `<td id="x${j}y${i}"></td>`;
      }
      buildTable += `</tr>`;
    }
    table.innerHTML = buildTable;
  }

  createCells(x, y);
  function createCells(width, height) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        cells.push([x, y]);
      }
    }
  }

  initializeFirstPosition();
  function initializeFirstPosition() {
    stack.push([...cells[0]]);
    cells[0].push(true);
  }

  do {
    let neighbors = [];

    searchNeighbors();
    function searchNeighbors() {
      for (const element of cells) {
        // up
        if (
          element[1] === stack[stack.length - 1][1] - 1 &&
          element[0] === stack[stack.length - 1][0] &&
          !element[2]
        ) {
          neighbors.push(0);
        }
        // right
        else if (
          element[0] === stack[stack.length - 1][0] + 1 &&
          element[1] === stack[stack.length - 1][1] &&
          !element[2]
        ) {
          neighbors.push(1);
        }
        // down
        else if (
          element[1] === stack[stack.length - 1][1] + 1 &&
          element[0] === stack[stack.length - 1][0] &&
          !element[2]
        ) {
          neighbors.push(2);
        }
        // left
        else if (
          element[0] === stack[stack.length - 1][0] - 1 &&
          element[1] === stack[stack.length - 1][1] &&
          !element[2]
        ) {
          neighbors.push(3);
        }
      }
    }

    generatesRandomDirection();
    function generatesRandomDirection() {
      neighbors.length > 0 ?
        randomDirection = Math.floor(Math.random() * neighbors.length) :
        randomDirection = -1;
    }

    moveCharacter();
    function moveCharacter() {
      switch (neighbors[randomDirection]) {
        case 0:
          placeNextPositionInStack(1, 0, 0);
          renderMaze(0);
          break;

        case 1:
          placeNextPositionInStack(0, 1, 1);
          renderMaze(1);
          break;

        case 2:
          placeNextPositionInStack(1, 1, 2);
          renderMaze(2);
          break;

        case 3:
          placeNextPositionInStack(0, 0, 3);
          renderMaze(3);
          break;

        default:
          placeNextPositionInStack(null, null, null);
          renderMaze(-1);
      }
    }

    function placeNextPositionInStack(axis, operation, direction) {
      if (direction !== null) {
        let nextPosition;

        // Store a copy of the current cell in next position
        nextPosition = [...stack[stack.length - 1]];

        // Increase or decrease x/y
        operation ?
          nextPosition[axis]++ :
          nextPosition[axis]--;

        // Push the new position in the stack
        stack.push([...nextPosition]);

        currentCellId = document.getElementById(`x${stack[stack.length - 1][0]}y${stack[stack.length - 1][1]}`);
        lastCellId = document.getElementById(`x${stack[stack.length - 2][0]}y${stack[stack.length - 2][1]}`);

        // Search the current cell and mark it as visited
        for (const element of cells) {
          if (element[0] === stack[stack.length - 1][0] && element[1] === stack[stack.length - 1][1]) {
            element.push(true);
            break;
          }
        }
      } else {
        currentCellId = document.getElementById(`x${stack[stack.length - 2][0]}y${stack[stack.length - 2][1]}`);
        lastCellId = document.getElementById(`x${stack[stack.length - 1][0]}y${stack[stack.length - 1][1]}`);
        stack.pop();
      }
    }

    function renderMaze(direction) {
      switch (direction) {
        case 0:
          currentCellId.style.borderBottom = "none";
          lastCellId.style.borderTop = "none";
          lastCellId.style.backgroundColor = "white";
          currentCellId.style.backgroundColor = "red";
          break;

        case 1:
          currentCellId.style.borderLeft = "none";
          lastCellId.style.borderRight = "none";
          lastCellId.style.backgroundColor = "white";
          currentCellId.style.backgroundColor = "red";
          break;
        case 2:

          currentCellId.style.borderTop = "none";
          lastCellId.style.borderBottom = "none";
          lastCellId.style.backgroundColor = "white";
          currentCellId.style.backgroundColor = "red";
          break;

        case 3:
          currentCellId.style.borderRight = "none";
          lastCellId.style.borderLeft = "none";
          lastCellId.style.backgroundColor = "white";
          currentCellId.style.backgroundColor = "red";
          break;

        default:
          lastCellId.style.backgroundColor = "white";
          currentCellId.style.backgroundColor = "red";
      }
    }
  } while (stack.length !== 1);

  // Place end point
  document.getElementById(`x${x - 1}y${y - 1}`).style.backgroundColor = "green";

  return false;
}












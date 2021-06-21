"use strict";


function makeGrid(form) {
  document.getElementById("mainGrid").innerHTML =
    `<table id="tableGrid">
        <tbody id="tbodyGrid"></tbody>
      </table>`;

  let table = document.getElementById("tbodyGrid");
  let x = form.cols.value;
  let y = form.rows.value;
  let buildTable = "";

  for (let i = 0; i < y; i++) {
    buildTable += `<tr id="R${i}">`;
    for (let j = 0; j < x; j++) {
      buildTable +=
        `<td id="${j}${i}"></td>`;
    }
    buildTable += `</tr>`;
  }
  table.innerHTML = buildTable;

  makeCells(x, y);

  return false;
}



function makeCells(width, height) {
  let randomDirection = 0;
  let visitedCells = 0;
  let cells = [];
  let stack = [];
  let neighbors = [];
  let nextPosition = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells.push([x, y]);
    }
  }
  console.log(cells);

  stack.push([...cells[0]]);
  cells[0].push(true);
  visitedCells++;



  while (visitedCells < cells.length) {
    neighbors = [];

    // la détection des bons voisins ne fonctionns pas
    for (const element of cells) {
      // north
      if (
        element[1] === stack[stack.length - 1][1] - 1 &&
        element[0] === stack[stack.length - 1][0] &&
        !element[2]
      ) {
        neighbors.push(0);
      }
      // South
      if (
        element[1] === stack[stack.length - 1][1] + 1 &&
        element[0] === stack[stack.length - 1][0] &&
        !element[2]
      ) {
        neighbors.push(2);
      }
      // east
      if (
        element[0] === stack[stack.length - 1][0] + 1 &&
        element[1] === stack[stack.length - 1][1] &&
        !element[2]
      ) {
        neighbors.push(1);
      }
      // west
      if (
        element[0] === stack[stack.length - 1][0] - 1 &&
        element[1] === stack[stack.length - 1][1] &&
        !element[2]
      ) {
        neighbors.push(3);
      }
    }

    neighbors.length > 0 ?
      randomDirection = Math.floor(Math.random() * neighbors.length) :
      randomDirection = -1;


    // nextPosition++ ne fonctionne pas 
    switch (neighbors[randomDirection]) {
      case 0:
        nextPosition[0] = [...stack[stack.length - 1]];
        nextPosition[0][1]--;
        stack.push([...nextPosition[0]]);
        visitedCells++;

        for (const element of cells) {
          if (element[0] === stack[stack.length - 1][0] && element[1] === stack[stack.length - 1][1]) {
            element.push(true);
            break;
          }
        }

        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.borderBottom = "none";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.borderTop = "none";

        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.backgroundColor = "red";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.backgroundColor = "white";

        break;
      case 1:
        nextPosition[0] = [...stack[stack.length - 1]];
        nextPosition[0][0]++;
        stack.push([...nextPosition[0]]);
        visitedCells++;

        for (const element of cells) {
          if (element[0] === stack[stack.length - 1][0] && element[1] === stack[stack.length - 1][1]) {
            element.push(true);
            break;
          }
        }

        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.borderLeft = "none";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.borderRight = "none";

        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.backgroundColor = "red";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.backgroundColor = "white";

        break;
      case 2:
        nextPosition[0] = [...stack[stack.length - 1]];
        nextPosition[0][1]++;
        stack.push([...nextPosition[0]]);
        visitedCells++;

        for (const element of cells) {
          if (element[0] === stack[stack.length - 1][0] && element[1] === stack[stack.length - 1][1]) {
            element.push(true);
            break;
          }
        }

        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.borderTop = "none";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.borderBottom = "none";

        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.backgroundColor = "red";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.backgroundColor = "white";

        break;
      case 3:
        nextPosition[0] = [...stack[stack.length - 1]];
        nextPosition[0][0]--;
        stack.push([...nextPosition[0]]);
        visitedCells++;

        for (const element of cells) {
          if (element[0] === stack[stack.length - 1][0] && element[1] === stack[stack.length - 1][1]) {
            element.push(true);
            break;
          }
        }

        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.borderRight = "none";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.borderLeft = "none";

        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.backgroundColor = "red";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.backgroundColor = "white";

        break;

      default:
        document.getElementById(`${stack[stack.length - 1][0]}${stack[stack.length - 1][1]}`)
          .style.backgroundColor = "white";

        document.getElementById(`${stack[stack.length - 2][0]}${stack[stack.length - 2][1]}`)
          .style.backgroundColor = "red";

        stack.pop();
    }
  }
}
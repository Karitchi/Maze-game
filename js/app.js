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
  let character;


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



function makeCells(x, y) {
  let randomDirection = 0;
  let visitedCells = 0;
  let cells = [];
  let positions = [];
  let possiblePath = [];
  let nextPosition = [];

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      cells.push([j, i, true]);
    }
  }

  cells[0][2] = false;
  positions.push(cells[0]);
  visitedCells++;

  document.getElementById(
    `${positions[positions.length - 1][0]}${positions[positions.length - 1][1]}`
  );
  // ${positions[positions.length - 1][0]}
  // ${positions[positions.length - 1][1]}

  console.log(positions);
  console.log(visitedCells);

  while (visitedCells < cells.length) {
    possiblePath = [];
    document.getElementById(
      `${positions[positions.length - 1][0]}${positions[positions.length - 1][1]}`
    ).style.backgroundColor = "red";

    // Vérifie si il-y-à une cellule au dessus
    if (positions[positions.length - 1][1] > 0) {
      // Cherche la cellule du dessus
      for (const element of cells) {
        // element[1] = y des cells positions[positions.length - 1][1] = le y de la position actuelle
        if (
          element[0] === positions[positions.length - 1][0] &&
          element[1] === positions[positions.length - 1][1] - 1 &&
          element[2]
        ) {
          possiblePath.push(0);
          break;
        }
      }
    }

    // Vérifie si il-y-à une cellule en dessous
    if (positions[positions.length - 1][1] < y - 1) {
      // Cherche la cellule du desous
      for (const element of cells) {
        // element[1] = y des cells positions[positions.length - 1][1] = le y de la position actuelle
        if (
          element[0] === positions[positions.length - 1][0] &&
          element[1] === positions[positions.length - 1][1] + 1 &&
          element[2]) {
          possiblePath.push(2);
          break;
        }
      }
    }

    // Vérifie si il-y-à une cellule à droite
    if (positions[positions.length - 1][0] < x - 1) {
      // Cherche la cellule de droite
      for (const element of cells) {
        // element[1] = y des cells positions[positions.length - 1][1] = le y de la position actuelle
        if (
          element[0] === positions[positions.length - 1][0] + 1 &&
          element[1] === positions[positions.length - 1][1] &&
          element[2]) {
          possiblePath.push(1);
          break;
        }
      }
    }

    // Vérifie si il-y-à une cellule à gauche
    if (positions[positions.length - 1][0] > 0) {
      // Cherche la cellule de gauche
      for (const element of cells) {
        // element[1] = y des cells positions[positions.length - 1][1] = le y de la position actuelle
        if (
          element[0] === positions[positions.length - 1][0] - 1 &&
          element[1] === positions[positions.length - 1][1] &&
          element[2]) {
          possiblePath.push(4);
          break;
        }
      }
    }

    // Génère un nombre aléatoire selon le nombre de chemin possible
    randomDirection = Math.floor(Math.random() * possiblePath.length);

    // Ajoute la nouvelle position dans positions
    switch (possiblePath[randomDirection]) {
      case 0:
        nextPosition = positions[positions.length - 1].slice();
        nextPosition[1]--;
        positions.push(nextPosition);
        visitedCells++;
        break;
      case 1:
        nextPosition = positions[positions.length - 1].slice();
        nextPosition[0]++;
        positions.push(nextPosition);
        visitedCells++;
        break;
      case 2:
        nextPosition = positions[positions.length - 1].slice();
        nextPosition[1]++;
        positions.push(nextPosition);
        visitedCells++;
        break;

      default:
        nextPosition = positions[positions.length - 1].slice();
        nextPosition[0]--;
        positions.push(nextPosition);
        visitedCells++;
    }
  }
  console.log(positions);
}

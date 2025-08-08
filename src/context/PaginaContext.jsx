// paginaCounter.js
let paginaCounter = 0;

export function getNextPaginaNumber() {
  paginaCounter++;
  return paginaCounter;
}

export function resetPaginaCounter() {
  paginaCounter = 0;
}

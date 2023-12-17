import { readInput } from "../read-template";

const input = readInput(`${__dirname}/input.txt`);

const matrix = input.map((line) => line.split(""));

let sum = 0;

const isSymbol = (element: string) => {
  if (element && !Number(element) && element !== "." && element !== "0") {
    return true;
  }

  return false;
};

const isPartNumber = (
  matrix: string[][],
  coordinatesList: Array<{ row: number; col: number }>
) => {
  return coordinatesList.some(({ row, col }) => {
    return (
      isSymbol(matrix[row + 1]?.[col]) ||
      isSymbol(matrix[row - 1]?.[col]) ||
      isSymbol(matrix[row]?.[col + 1]) ||
      isSymbol(matrix[row]?.[col - 1]) ||
      isSymbol(matrix[row + 1]?.[col + 1]) ||
      isSymbol(matrix[row + 1]?.[col - 1]) ||
      isSymbol(matrix[row - 1]?.[col - 1]) ||
      isSymbol(matrix[row - 1]?.[col + 1])
    );
  });
};

matrix.forEach((row, rowNumber) => {
  let currentNumberCoordinates: Array<{ row: number; col: number }> = [];
  let numberAsString = "";
  row.forEach((element, colNumber) => {
    if (Number(element) || element === "0") {
      currentNumberCoordinates.push({ row: rowNumber, col: colNumber });
      numberAsString += element;

      if (colNumber !== row.length - 1) {
        return;
      }
    }

    if (currentNumberCoordinates.length) {
      if (isPartNumber(matrix, currentNumberCoordinates)) {
        sum += Number(numberAsString);
      }
    }
    currentNumberCoordinates = [];
    numberAsString = "";
  });
});

console.log(sum);

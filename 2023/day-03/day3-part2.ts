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

const adjacentCoordinates = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

const starPartNumbers: Record<string, number[]> = {};

const isPartNumber = (
  matrix: string[][],
  coordinatesList: Array<{ row: number; col: number }>,
  numberAsString: string
) => {
  return coordinatesList.some(({ row, col }) => {
    return adjacentCoordinates.some(([aRow, aCol]) => {
      const element = matrix[row + aRow]?.[col + aCol];
      const is = isSymbol(element);
      if (is && element === "*") {
        if (starPartNumbers[`r${row + aRow}c${col + aCol}`]) {
          starPartNumbers[`r${row + aRow}c${col + aCol}`].push(
            Number(numberAsString)
          );
        } else {
          starPartNumbers[`r${row + aRow}c${col + aCol}`] = [
            Number(numberAsString),
          ];
        }
      }
      return is;
    });
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
      if (isPartNumber(matrix, currentNumberCoordinates, numberAsString)) {
        //
      }
    }
    currentNumberCoordinates = [];
    numberAsString = "";
  });
});

Object.values(starPartNumbers).forEach((numbers: number[]) => {
  if (numbers.length !== 2) {
    return;
  }
  const product = numbers.reduce((prev, curr) => prev * curr, 1);
  sum += product;
});

console.log(sum);

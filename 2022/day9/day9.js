const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");

const inputStream = fs.createReadStream(filePath);

const types = {
  HEAD: "HEAD",
  TAIL: "TAIL",
};

const visitedCoordinates = ["0/0"];
const moves = {
  U: -1,
  R: 1,
  D: 1,
  L: -1,
};

const part1Length = 2;
const part2Length = 10;

const knots = new Array(part2Length).fill("0/0");

const getCurrentCoordinates = (type, index = 0) => {
  if (type === types.HEAD) {
    return knots[0].split("/").map((coordinate) => Number(coordinate));
  }
  return knots[index].split("/").map((coordinate) => Number(coordinate));
};

const getDefaultNewCoordinates = (row, column, direction) => {
  switch (direction) {
    case "U":
    case "D":
      return [row + moves[direction], column];
    case "R":
    case "L":
      return [row, column + moves[direction]];
    default:
      return [row, column];
  }
};

const getNewHeadCoordinates = (row, column, direction) => {
  return getDefaultNewCoordinates(row, column, direction);
};

const getNewTailCoordinates = (direction, index) => {
  const [currentRow, currentColumn] = getCurrentCoordinates(types.TAIL, index);
  const [currentHeadRow, currentHeadColumn] = getCurrentCoordinates(
    types.TAIL,
    index - 1
  );

  const rowDiff = Math.abs(currentRow - currentHeadRow);
  const columnDiff = Math.abs(currentColumn - currentHeadColumn);

  if (rowDiff < 2 && columnDiff < 2) {
    return [currentRow, currentColumn];
  }

  if (
    (rowDiff === 2 && columnDiff === 1) ||
    (columnDiff === 2 && rowDiff === 1)
  ) {
    return [
      rowDiff === 1 ? currentHeadRow : (currentHeadRow + currentRow) / 2,
      columnDiff === 1
        ? currentHeadColumn
        : (currentHeadColumn + currentColumn) / 2,
    ];
  }

  if (rowDiff === 2 && columnDiff === 2) {
    return [
      (currentHeadRow + currentRow) / 2,
      (currentHeadColumn + currentColumn) / 2,
    ];
  }
  return [
    rowDiff === 0 ? currentHeadRow : (currentHeadRow + currentRow) / 2,
    columnDiff === 0
      ? currentHeadColumn
      : (currentHeadColumn + currentColumn) / 2,
  ];
};

const changeCoordinates = (row, column, type, index) => {
  if (type === types.HEAD) {
    knots[0] = `${row}/${column}`;
    return;
  }

  knots[index] = `${row}/${column}`;
};

const visitCoordinates = () => {
  if (!visitedCoordinates.includes(knots.at(-1))) {
    visitedCoordinates.push(knots.at(-1));
  }
};

const moveHead = (direction, stepCount) => {
  for (let i = 0; i < stepCount; i++) {
    let [currentRow, currentColumn] = getCurrentCoordinates(types.HEAD);
    const [newRow, newColumn] = getNewHeadCoordinates(
      currentRow,
      currentColumn,
      direction
    );
    changeCoordinates(newRow, newColumn, types.HEAD, 0);
    for (let j = 1; j < part2Length; j++) {
      const [newTailRow, newTailColumn] = getNewTailCoordinates(direction, j);
      changeCoordinates(newTailRow, newTailColumn, types.TAIL, j);

      if (j === part2Length - 1) {
        visitCoordinates();
      }
    }
  }
};

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

lineReader.on("line", function (line) {
  const [direction, stepCount] = line.split(" ");
  moveHead(direction, Number(stepCount));
});

lineReader.on("close", () => {
  console.log(visitedCoordinates.length);
});

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");

const inputStream = fs.createReadStream(filePath);

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

// part 1
const grid = [];
let index = 0;
let totalVisibleTrees = 0;

const isAnEdge = (rowIndex, colIndex) => {
  if (rowIndex === 0 || rowIndex === grid.length - 1) {
    return true;
  }

  return colIndex === 0 || colIndex === grid[rowIndex].length - 1;
};

const isVisible = (rowIndex, colIndex) => {
  let leftResult = true;
  let rightResult = true;
  let topResult = true;
  let bottomResult = true;

  const treeLength = grid[rowIndex][colIndex];

  //check from left
  for (let i = 0; i < colIndex; i++) {
    const currentTreeLength = grid[rowIndex][i];

    if (currentTreeLength >= treeLength) {
      leftResult = false;
    }
  }

  //check from right
  for (let i = grid[rowIndex].length - 1; i > colIndex; i--) {
    const currentTreeLength = grid[rowIndex][i];

    if (currentTreeLength >= treeLength) {
      rightResult = false;
    }
  }

  //check from top
  for (let i = 0; i < rowIndex; i++) {
    const currentTreeLength = grid[i][colIndex];

    if (currentTreeLength >= treeLength) {
      topResult = false;
    }
  }

  //check from bottom
  for (let i = grid.length - 1; i > rowIndex; i--) {
    const currentTreeLength = grid[i][colIndex];

    if (currentTreeLength >= treeLength) {
      bottomResult = false;
    }
  }

  return leftResult || topResult || rightResult || bottomResult;
};

lineReader.on("line", function (line) {
  const lineNumbers = line.split("").map((number) => Number(number));
  grid[index] = lineNumbers;
  index++;
});

lineReader.on("close", () => {
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (isAnEdge(rowIndex, colIndex)) {
        totalVisibleTrees++;
        return;
      }

      if (isVisible(rowIndex, colIndex)) {
        totalVisibleTrees++;
      }
    });
  });

  console.log(totalVisibleTrees);
});

//part 2

const gridPart2 = [];
let indexPart2 = 0;
let totals = [];

const calculateScenicScore = (rowIndex, colIndex) => {
  let leftResult = true;
  let rightResult = true;
  let topResult = true;
  let bottomResult = true;

  let leftTotal = 0;
  let rightTotal = 0;
  let topTotal = 0;
  let bottomTotal = 0;

  const treeLength = gridPart2[rowIndex][colIndex];

  //check from left
  for (let i = colIndex - 1; i >= 0; i--) {
    const currentTreeLength = gridPart2[rowIndex][i];

    if (leftResult) {
      leftTotal++;
    }
    if (currentTreeLength >= treeLength) {
      leftResult = false;
    }
  }

  //check from right
  for (let i = colIndex + 1; i < gridPart2[rowIndex].length; i++) {
    const currentTreeLength = gridPart2[rowIndex][i];

    if (rightResult) {
      rightTotal++;
    }

    if (currentTreeLength >= treeLength) {
      rightResult = false;
    }
  }

  //check from top
  for (let i = rowIndex - 1; i >= 0; i--) {
    const currentTreeLength = gridPart2[i][colIndex];

    if (topResult) {
      topTotal++;
    }

    if (currentTreeLength >= treeLength) {
      topResult = false;
    }
  }

  //check from bottom
  for (let i = rowIndex + 1; i < gridPart2.length; i++) {
    const currentTreeLength = gridPart2[i][colIndex];

    if (bottomResult) {
      bottomTotal++;
    }

    if (currentTreeLength >= treeLength) {
      bottomResult = false;
    }
  }

  if (rowIndex === 3 && colIndex === 2) {
    console.log(rightTotal, bottomTotal, topTotal);
  }

  totals.push(leftTotal * rightTotal * topTotal * bottomTotal);
};

lineReader.on("line", function (line) {
  const lineNumbers = line.split("").map((number) => Number(number));
  gridPart2[indexPart2] = lineNumbers;
  indexPart2++;
});

lineReader.on("close", () => {
  gridPart2.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (isAnEdge(rowIndex, colIndex)) {
        return;
      }

      calculateScenicScore(rowIndex, colIndex);
    });
  });

  console.log(Math.max(...totals));
});

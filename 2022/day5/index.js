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

const stacks = [];
const moves = [];

function containsUppercase(str) {
  return /[A-Z]/.test(str);
}

lineReader.on("line", function (line) {
  for (let i = 1, j = 1; i < line.length; i += 4, j++) {
    if (line === "") {
      break;
    }
    if (containsUppercase(line.charAt(i))) {
      if (Array.isArray(stacks[j])) {
        stacks[j].unshift(line.charAt(i));
      } else {
        stacks[j] = [line.charAt(i)];
      }
    }
  }

  if (line.startsWith("move")) {
    const numbers = line.split(" ").filter((part) => !isNaN(part));
    moves.push(numbers);
  }
});

const doTheMoves = () => {
  moves.forEach((move) => {
    const quantity = move[0];
    const fromWhere = move[1];
    const toWhere = move[2];

    const removedElements = stacks[fromWhere].splice(
      stacks[fromWhere].length - quantity,
      quantity
    );

    stacks[toWhere] = [...stacks[toWhere], ...removedElements.reverse()];
  });
};

lineReader.on("close", () => {
  doTheMoves();
  let finalString = "";
  stacks.forEach((stack) => (finalString += stack[stack.length - 1]));
  console.log(finalString);
});

// PART 2

const stacksPart2 = [];
const movesPart2 = [];

function containsUppercase(str) {
  return /[A-Z]/.test(str);
}

lineReader.on("line", function (line) {
  for (let i = 1, j = 1; i < line.length; i += 4, j++) {
    if (line === "") {
      break;
    }
    if (containsUppercase(line.charAt(i))) {
      if (Array.isArray(stacksPart2[j])) {
        stacksPart2[j].unshift(line.charAt(i));
      } else {
        stacksPart2[j] = [line.charAt(i)];
      }
    }
  }

  if (line.startsWith("move")) {
    const numbers = line.split(" ").filter((part) => !isNaN(part));
    movesPart2.push(numbers);
  }
});

const doTheMovesPart2 = () => {
  movesPart2.forEach((move) => {
    const quantity = move[0];
    const fromWhere = move[1];
    const toWhere = move[2];

    const removedElements = stacksPart2[fromWhere].splice(
      stacksPart2[fromWhere].length - quantity,
      quantity
    );

    stacksPart2[toWhere] = [...stacksPart2[toWhere], ...removedElements];
  });
};

lineReader.on("close", () => {
  doTheMovesPart2();
  let finalString = "";
  stacksPart2.forEach((stack) => (finalString += stack[stack.length - 1]));
  console.log(finalString);
});

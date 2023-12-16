const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");

const inputStream = fs.createReadStream(filePath);

let totalScore = 0;

const selectionScores = {
  X: 1,
  Y: 2,
  Z: 3,
};

const pairScores = {
  AX: 3,
  AY: 6,
  AZ: 0,
  BX: 0,
  BY: 3,
  BZ: 6,
  CX: 6,
  CY: 0,
  CZ: 3,
};

const whatShouldBePlayedPairs = {
  AX: "Z",
  AY: "X",
  AZ: "Y",
  BX: "X",
  BY: "Y",
  BZ: "Z",
  CX: "Y",
  CY: "Z",
  CZ: "X",
};

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

//PART1

// lineReader.on("line", function (line) {
//   const codes = line.split(" ");
//   const selectionScore = selectionScores[codes[1]];
//   const outcomeScore = pairScores[`${codes[0]}${codes[1]}`];
//   totalScore += selectionScore + outcomeScore;
// });

// lineReader.on("close", () => {
//   console.log(totalScore);
// });

//PART2

lineReader.on("line", function (line) {
  const codes = line.split(" ");
  const whatToPlay = whatShouldBePlayedPairs[`${codes[0]}${codes[1]}`];
  const selectionScore = selectionScores[whatToPlay];
  const outcomeScore = pairScores[`${codes[0]}${whatToPlay}`];
  totalScore += selectionScore + outcomeScore;
});

lineReader.on("close", () => {
  console.log(totalScore);
});

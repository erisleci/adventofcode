const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");

const inputStream = fs.createReadStream(filePath);

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

//part 1

let count = 0;

const pairFullyContainsTheOther = (firstPair, secondPair) => {
  return firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1];
};

lineReader.on("line", function (line) {
  const pairs = line.split(",");
  const firstPair = pairs[0].split("-").map((number) => Number(number));
  const secondPair = pairs[1].split("-").map((number) => Number(number));

  if (
    pairFullyContainsTheOther(firstPair, secondPair) ||
    pairFullyContainsTheOther(secondPair, firstPair)
  ) {
    count++;
  }
});

lineReader.on("close", () => {
  console.log(count);
});

//part 2

let overlapCount = 0;

function inRange(x, min, max) {
  return x >= min && x <= max;
}

lineReader.on("line", function (line) {
  const pairs = line.split(",");
  const firstPair = pairs[0].split("-").map((number) => Number(number));
  const secondPair = pairs[1].split("-").map((number) => Number(number));

  if (
    inRange(firstPair[0], secondPair[0], secondPair[1]) ||
    inRange(firstPair[1], secondPair[0], secondPair[1]) ||
    inRange(secondPair[0], firstPair[0], firstPair[1]) ||
    inRange(secondPair[1], firstPair[0], firstPair[1])
  ) {
    overlapCount++;
  }
});

lineReader.on("close", () => {
  console.log(overlapCount);
});

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "calories.txt");

const inputStream = fs.createReadStream(filePath);

let maxCaloriesCarried = 0;
let currentCarry = 0;
let allElvesCarry = [];

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

lineReader.on("line", function (line) {
  if (line === "") {
    allElvesCarry.push(currentCarry);
    if (currentCarry > maxCaloriesCarried) {
      maxCaloriesCarried = currentCarry;
    }
    currentCarry = 0;
  }

  if (Number(line)) {
    currentCarry += Number(line);
  }
});

lineReader.on("close", () => {
  const topThree = allElvesCarry.sort((a, b) => a - b).slice(-3);
  console.log(
    topThree.reduce((currentSum, currentItem) => currentSum + currentItem, 0)
  );
  console.log(maxCaloriesCarried);
});

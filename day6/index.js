const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");

const inputStream = fs.createReadStream(filePath);

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

lineReader.on("line", function (line) {
  //part 1

  for (let i = 0; i < line.length - 3; i++) {
    const lineArray = line.split("");
    const fourCharacters = lineArray.slice(i, i + 4);
    const set = new Set(fourCharacters);
    if (set.size === 4) {
      console.log(i + 4);
      break;
    }
  }

  // part 2

  for (let i = 0; i < line.length - 13; i++) {
    const lineArray = line.split("");
    const fourCharacters = lineArray.slice(i, i + 14);
    const set = new Set(fourCharacters);
    if (set.size === 14) {
      console.log(i + 14);
      break;
    }
  }
});

lineReader.on("close", () => {});

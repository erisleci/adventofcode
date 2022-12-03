const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");

const inputStream = fs.createReadStream(filePath);

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

//PART 1
let total = 0;

const getCharPriority = (char) => {
  const subtractor = char.charCodeAt(0) < 97 ? 38 : 96; // 65 is the code for 'A', 97 for 'a'

  return char.charCodeAt(0) - subtractor;
};

lineReader.on("line", function (line) {
  const half = line.length / 2;
  const firstCompartment = line.slice(0, half);
  const secondCompartment = line.slice(half, line.length);

  if (firstCompartment.length !== secondCompartment.length) {
    return;
  }

  let commonCharacter = "";

  for (let i = 0; i < firstCompartment.length; i++) {
    const characterAtIndex = firstCompartment.charAt(i);

    if (secondCompartment.includes(characterAtIndex)) {
      commonCharacter = characterAtIndex;
    }
  }
  total += getCharPriority(commonCharacter);
});

lineReader.on("close", () => {
  console.log(total);
});

//PART 2

const lines = [];

lineReader.on("line", function (line) {
  lines.push(line);
});

let totalPart2 = 0;

lineReader.on("close", () => {
  for (let i = 0; i <= lines.length - 3; i += 3) {
    const group = lines.slice(i, i + 3);
    let commonGroupItem = "";

    for (let j = 0; j < group[0].length; j++) {
      const groupItemChar = group[0].charAt(j);

      if (
        group[1].includes(groupItemChar) &&
        group[2].includes(groupItemChar)
      ) {
        commonGroupItem = groupItemChar;
      }
    }

    if (commonGroupItem) {
      totalPart2 += getCharPriority(commonGroupItem);
    }
  }

  console.log(totalPart2);
});

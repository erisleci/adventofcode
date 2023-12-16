const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");
const inputStream = fs.createReadStream(filePath);

const instructions = [];
let movSum = 1;
const sums = [];
let movIndex = 0;
let sprite = "";

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

lineReader.on("line", function (line) {
  instructions.push(line);

  if (line.startsWith("addx")) {
    instructions.push(line);
    return;
  }
});

// part 1
// lineReader.on("close", () => {
//   for (let i = 0; i < instructions.length; i++) {
//     const cycleNumber = i + 1;
//     const instruction = instructions[i];

//     if ((cycleNumber - 20) % 40 === 0) {
//       sums.push(movSum * cycleNumber);
//     }

//     if (instruction === "noop") {
//       movIndex = 0;
//       continue;
//     }

//     movIndex++;

//     if (movIndex === 2) {
//       movSum += Number(instruction.split(" ")[1]);
//       movIndex = 0;
//     }
//   }

//   console.log(sums.reduce((a, b) => a + b));
// });

// part 2
lineReader.on("close", () => {
  for (let i = 0; i < instructions.length; i++) {
    const cycleNumber = i + 1;
    const instruction = instructions[i];

    const spritePosition = movSum - 1;

    if (i % 40 >= spritePosition && i % 40 <= spritePosition + 2) {
      sprite += "#";
    } else {
      sprite += ".";
    }

    if (cycleNumber % 40 === 0) {
      sprite += "\n";
    }

    if (instruction === "noop") {
      movIndex = 0;
      continue;
    }

    movIndex++;

    if (movIndex === 2) {
      movSum += Number(instruction.split(" ")[1]);
      movIndex = 0;
    }
  }

  //part 1
  //console.log(sums.reduce((a, b) => a + b));

  //part 2
  console.log(sprite);
});

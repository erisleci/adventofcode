const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");

const inputStream = fs.createReadStream(filePath);

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

// change part number here:
const PART_NUMBER = 2;

const partParameters = {
  1: {
    roundCount: 20,
    dividedBy: 3,
  },
  2: {
    roundCount: 10000,
    dividedBy: 1,
  },
};

let readIndex = 0;
const monkeys = [];

const getOperationResult = (oldValue, operand, operator) => {
  const oldValueNumber = Number(oldValue);
  const newOperand = operand === "old" ? oldValueNumber : Number(operand);
  switch (operator) {
    case "*":
      return oldValueNumber * newOperand;
    case "+":
      return oldValueNumber + newOperand;
    default:
      return oldValueNumber;
  }
};

lineReader.on("line", function (line) {
  const newLine = line.trim();

  if (newLine === "") {
    readIndex++;
    return;
  }

  if (newLine.startsWith("Monkey")) {
    monkeys[readIndex] = { count: 0 };
    return;
  }

  if (newLine.includes("Starting items:")) {
    const itemsStringParts = newLine.split("Starting items: ");
    const items = itemsStringParts[1].split(", ").map((item) => Number(item));
    monkeys[readIndex].items = items;
    return;
  }

  if (newLine.includes("Operation:")) {
    const operationParts = newLine.split("Operation: new = ")[1].split(" ");
    const operation = {
      operator: operationParts[1],
      number: operationParts[2],
    };
    monkeys[readIndex].operation = operation;
    return;
  }

  if (newLine.includes("Test")) {
    monkeys[readIndex].test = Number(newLine.split(" ").at(-1));
    return;
  }
  const targetParts = newLine.split(" ");

  if (typeof monkeys[readIndex].target !== "object") {
    monkeys[readIndex].target = {};
  }

  monkeys[readIndex].target = {
    ...monkeys[readIndex].target,
    [targetParts[1].replace(":", "")]: Number(targetParts.at(-1)),
  };
});

lineReader.on("close", () => {
  // Wasn't able to figure out the second part on my own. Got the below solution to multiple modulos from here: https://www.youtube.com/watch?v=F4MCuPZDKog
  let mod = 1;
  monkeys.forEach((monkey) => {
    mod *= monkey.test;
  });

  for (let i = 0; i < partParameters[PART_NUMBER].roundCount; i++) {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        const operationResult = getOperationResult(
          item % mod,
          monkey.operation.number,
          monkey.operation.operator
        );

        const newWorryLevel =
          PART_NUMBER === 2 ? operationResult : Math.floor(operationResult / 3);
        monkey.count++;
        if (newWorryLevel % monkey.test === 0) {
          monkeys[monkey.target.true].items.push(newWorryLevel);
        } else {
          monkeys[monkey.target.false].items.push(newWorryLevel);
        }
      });
      monkey.items = [];
    });
  }

  const monkeysItemCount = monkeys.map((monkey) => monkey.count);
  console.log(
    monkeysItemCount
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((a, b) => a * b)
  );
});

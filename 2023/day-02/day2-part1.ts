import { readInput } from "../read-template";

// Path: 2023/day-01/index.ts

const input = readInput(`${__dirname}/input.txt`);

const CONFIG = {
  red: 12,
  blue: 14,
  green: 13,
};

let sum = 0;

const getNumberOfBallsPerSet = (set: string) => {
  const ballsArray = set.split(", ");
  let red = 0;
  let green = 0;
  let blue = 0;

  ballsArray.forEach((balls) => {
    const [number, color] = balls.split(" ");
    if (color === "red") {
      red = Number(number);
    }

    if (color === "green") {
      green = Number(number);
    }

    if (color === "blue") {
      blue = Number(number);
    }
  });

  return { red, green, blue };
};

input.forEach((game) => {
  const parts = game.split(":");
  const gameId = Number(parts[0]?.split(" ")?.[1]) as number;
  const sets = parts?.[1]?.split(";").map((set) => set.trim());
  const isGamePossible = sets.every((set) => {
    const { red, green, blue } = getNumberOfBallsPerSet(set);
    return red <= CONFIG.red && green <= CONFIG.green && blue <= CONFIG.blue;
  });

  if (isGamePossible) {
    sum += gameId;
  }
});

console.log(sum);

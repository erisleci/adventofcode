import { readInput } from "../read-template";

const input = readInput(`${__dirname}/input.txt`);

let sum = 0;

input.forEach((card) => {
  const [player, winning] = card
    .split(": ")?.[1]
    ?.split(" | ")
    .map((set) => set.split(" ").filter(Boolean));

  let cardPoints = 0;

  player.forEach((number) => {
    if (winning.includes(number)) {
      cardPoints = cardPoints ? cardPoints * 2 : 1;
    }
  });

  sum += cardPoints;
});

console.log(sum);

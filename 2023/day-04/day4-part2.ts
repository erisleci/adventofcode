import { readInput } from "../read-template";

const input = readInput(`${__dirname}/input.txt`);

let sum = 0;

let instances: Record<
  string,
  {
    winningNumbers: number;
    copies: number;
  }
> = {};

input.forEach((card, cardIndex) => {
  const [player, winning] = card
    .split(": ")?.[1]
    ?.split(" | ")
    .map((set) => set.split(" ").filter(Boolean));

  instances[cardIndex] = {
    copies: 1,
    winningNumbers: 0,
  };

  player.forEach((number, index) => {
    if (winning.includes(number)) {
      instances[cardIndex].winningNumbers++;
    }
  });

  if (cardIndex === 0) {
    sum += 1;
    return;
  }

  for (let i = 0; i < cardIndex; i++) {
    let checkingCard = instances[i];
    if (cardIndex <= checkingCard.winningNumbers + i) {
      instances[cardIndex].copies += checkingCard.copies;
    }
  }
  sum += instances[cardIndex].copies;
});

console.log(sum);

import { readInput } from "../read-template";

const input = readInput(`${__dirname}/input.txt`);

let sum = 0;
input.forEach((line) => {
  let first;
  let last;
  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    if (!Number(char)) {
      continue;
    }

    if (!first) {
      first = Number(char);
    }

    last = Number(char);
  }

  sum += Number(`${first}${last}`);
});

console.log(sum);

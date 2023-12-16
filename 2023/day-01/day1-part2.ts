import { readInput } from "../read-template";

const input = readInput(`${__dirname}/input.txt`);

const DIGITS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let sum = 0;
input.forEach((line) => {
  let first;
  let last;
  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    if (!Number(char)) {
      let digitLetters = char;

      for (let j = i + 1; j < line.length; ) {
        const newChar = line.charAt(j);

        if (Number(newChar)) {
          break;
        }

        digitLetters += newChar;

        if (DIGITS[digitLetters]) {
          if (!first) {
            first = DIGITS[digitLetters];
          }

          last = DIGITS[digitLetters];
          i = j;
          break;
        }
        j++;
      }
      continue;
    }

    if (!first) {
      first = Number(char);
    }

    last = Number(char);
  }

  sum += Number(`${first}${last}`);
});

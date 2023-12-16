// Create a function 'readInput' from input.txt in the same folder and returns an array of strings (one per line)
// If the file does not exist, return an empty array

import { readFileSync } from "fs";
export function readInput(filePath: string): string[] {
  try {
    const data = readFileSync(filePath, "utf8");
    return data.split("\n");
  } catch (err) {
    return [];
  }
}

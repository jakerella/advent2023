// Day 04, Part 1 Prompt:
// (Syntax Error) For each line in day04_test.txt, assume the line starts with an identification of a card number in the format "Card 210:" or "Card   1:" where we only care about the numeric value. The rest of the line identifies two groups of numbers, separated by a pipe character. The first group is the "winning" numebrs, the second group is the player's numbers. For each card, count the player's numbers that exist in the winning number group and add them up. Then, add up each card's count to get a final count and print that number.
// (Wrong) For each line in day04_test.txt, assume the line starts with an identification of a card number in the format "Card 210:" or "Card   1:" where we only care about the numeric value. The next portion of the line is a group of space-separated numbers, then a pipe character, then another group of space-separated numbers. The first group of numbers is the "winning" numebrs, the second group is the player's numbers. For each card, count the player's numbers that exist in the winning number group and add them up. Then, add up each card's count to get a final count and print that number.
// (Wrong) For each line in day04_test.txt, assume the line starts with an identification of a card number in the format "Card 210:" or "Card   1:" where we only care about the numeric value. The next portion of the line is a group of space-separated numbers in a grid, then a pipe character, then another group of space-separated numbers. There may be one or two spaces between numbers in these groups. The first group of numbers is the "winning" numebrs, the second group is the player's numbers. For each card, count the player's numbers that exist in the winning number group and add them up. Then, add up each card's count to get a final count and print that number.

const fs = require('fs');

// Read the file
const fileContent = fs.readFileSync('day04_test.txt', 'utf-8');

// Split the file content into lines
const lines = fileContent.split('\n');

// Initialize the final count
let finalCount = 0;

// Iterate over each line
for (const line of lines) {
  // Extract the card number
  const cardNumber = line.match(/Card\s+(\d+):/)[1];

  // Extract the winning numbers and player's numbers
  const [, winningNumbers, playerNumbers] = line.match(/(\d+\s*)+\|\s*(\d+\s*)+$/);

  // Split the winning numbers and player's numbers into arrays
  const winningNumbersArray = winningNumbers.trim().split(/\s+/);
  const playerNumbersArray = playerNumbers.trim().split(/\s+/);

  // Count the player's numbers that exist in the winning number group
  let count = 0;
  for (const number of playerNumbersArray) {
    if (winningNumbersArray.includes(number)) {
      count++;
    }
  }

  // Add the count to the final count
  finalCount += count;
}

// Print the final count
console.log(finalCount);

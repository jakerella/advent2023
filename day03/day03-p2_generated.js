// Day 03, Part 2 Prompt:
// (Fail) Take the data in day03_test.txt and find all of the numbers (which may contain 1 or more digits). For each number that you find, determine if there is an asterisk adjacent to the number either vertically, horizontally, or diagonally. For all asterisks where there are exactly two numbers adjacent, multiply those two numbers together, then sum up all of those multuplication products and print the sum.


const fs = require('fs');

// Read the contents of the file
const fileContent = fs.readFileSync('day03_test.txt', 'utf-8');

// Regular expression to match numbers
const numberRegex = /\d+/g;

// Extract all the numbers from the file
const numbers = fileContent.match(numberRegex);

// Function to check if there is an asterisk adjacent to a number
function hasAsteriskAdjacent(number, row, col, grid) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      newRow >= 0 && newRow < grid.length &&
      newCol >= 0 && newCol < grid[newRow].length &&
      grid[newRow][newCol] === '*'
    ) {
      return true;
    }
  }

  return false;
}

// Initialize the sum
let sum = 0;

// Convert the file content to a grid
const grid = fileContent.split('\n').map(row => row.split(''));

// Iterate over each number
for (let i = 0; i < numbers.length; i++) {
  const number = parseInt(numbers[i]);

  // Iterate over each cell in the grid
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // Check if the current cell contains the number
      if (parseInt(grid[row][col]) === number) {
        // Check if there is an asterisk adjacent to the number
        if (hasAsteriskAdjacent(number, row, col, grid)) {
          // Multiply the adjacent numbers together
          const adjacentNumbers = [];

          for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (
              newRow >= 0 && newRow < grid.length &&
              newCol >= 0 && newCol < grid[newRow].length &&
              !isNaN(parseInt(grid[newRow][newCol]))
            ) {
              adjacentNumbers.push(parseInt(grid[newRow][newCol]));
            }
          }

          if (adjacentNumbers.length === 2) {
            sum += adjacentNumbers[0] * adjacentNumbers[1];
          }
        }
      }
    }
  }
}

// Print the sum
console.log(sum);

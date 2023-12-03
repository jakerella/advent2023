// Day03, Part 1 Prompt:
// (Fail) Take the data in day03_test.txt and assume it is a grid where "." is a blank space. Find all of the numbers that are adjacent either vertically, horizontally, or diagonally to at least 1 symbol that is not a digit or "." and calculate the sum of those numbers.
// (Fail) Take the data in day03_test.txt and find all of the numbers, which can be 1 or more digits long, that are adjacent either vertically, horizontally, or diagonally to at least 1 symbol that is not a digit or "." and calculate the sum of those numbers.
// (Fail) Take the data in day03_test.txt and find all of the numbers (which may contain 1 or more digits). For each number that you find, determine if there is a symbol that is not a digit or period adjacent to the number either vertically, horizontally, or diagonally. For all numbers where there is an adjacent symbol, calculate their sum and print it out.
// Note that on this last attempt it gets really close, but the calculation of an adjacent position "within the data boundaries" may be off?

const fs = require('fs');

// Read the data from day03_test.txt
const data = fs.readFileSync('day03_test.txt', 'utf8');

// Regular expression to match numbers
const numberRegex = /\d+/g;

// Regular expression to match symbols that are not digits or periods
const symbolRegex = /[^0-9.]/;

// Array to store the numbers with adjacent symbols
const numbersWithAdjacentSymbols = [];

// Iterate over each number in the data
let match;
while ((match = numberRegex.exec(data)) !== null) {
    const number = parseInt(match[0]);

    // Check if there is an adjacent symbol
    let hasAdjacentSymbol = false;

    // Iterate over each adjacent position
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) {
                continue; // Skip the current position
            }

            const adjacentX = match.index % data.indexOf('\n') + dx;
            const adjacentY = Math.floor(match.index / data.indexOf('\n')) + dy;

            // Check if the adjacent position is within the data boundaries
            if (
                adjacentX >= 0 &&
                adjacentX < data.indexOf('\n') &&
                adjacentY >= 0 &&
                adjacentY < Math.floor(data.length / data.indexOf('\n'))
            ) {
                const adjacentSymbol = data[adjacentY * data.indexOf('\n') + adjacentX];

                // Check if the adjacent symbol is not a digit or period
                if (symbolRegex.test(adjacentSymbol)) {
                    hasAdjacentSymbol = true;
                    break;
                }
            }
        }

        if (hasAdjacentSymbol) {
            break;
        }
    }

    // If there is an adjacent symbol, add the number to the array
    if (hasAdjacentSymbol) {
        numbersWithAdjacentSymbols.push(number);
    }
}

// Calculate the sum of the numbers with adjacent symbols
const sum = numbersWithAdjacentSymbols.reduce((acc, curr) => acc + curr, 0);

// Print the sum
console.log(sum);





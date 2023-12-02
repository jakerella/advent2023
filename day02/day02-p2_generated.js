// Day 02, Part 2 prompt
// For each line in day02_test.txt, parse the line to identify all number 
// and color combinations, then within each line find the maximum value for 
// each unique color and multiply those maximum values together. For each 
// lines maximum color values, multiple the values together to get the line's 
// "power" value and print it. At the end, sum up all power values for each 
// line and print that value

const fs = require('fs');

// Read the file
const fileContent = fs.readFileSync('day02_test.txt', 'utf-8');

// Split the file content into lines
const lines = fileContent.split('\n');

// Initialize the sum of power values
let sumOfPowerValues = 0;

// Iterate over each line
for (let line of lines) {
  // Initialize an object to store the maximum values for each color
  const maxValues = {};

  // Parse the line to identify number and color combinations
  const combinations = line.match(/\d+\s\w+/g);

  // Iterate over each combination
  for (let combination of combinations) {
    // Extract the number and color from the combination
    const [number, color] = combination.split(' ');

    // Update the maximum value for the color if necessary
    if (!maxValues[color] || number > maxValues[color]) {
      maxValues[color] = Number(number);
    }
  }

  // Calculate the line's power value by multiplying the maximum color values
  const powerValue = Object.values(maxValues).reduce((acc, value) => acc * value, 1);

  // Print the line's power value
  console.log(powerValue);

  // Add the line's power value to the sum
  sumOfPowerValues += powerValue;
}

// Print the sum of power values for all lines
console.log(sumOfPowerValues);

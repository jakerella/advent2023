// Prompts for Day 06, Part 1:
// (wrong, didn't use input file) The two lines in day06_test.txt represent three races where the length of each race in seconds is represented on the first line as space-separated numbers and the best distance for each race is represented on the second line as space-separated numbers. Assume that at the beginning of each race (that is, at zero seconds) our velocity is zero. For each second that we wait after the start of the race, one unit of velocity is added. For each race, calculate how many different ways we can beat the best distance by waiting various numbers of seconds at the beginning. Take the count of the number of ways for each race, multiply them together, and print that result.
// (wrong, but did read file) Read the day06_test.txt as input to represent three races where the length of each race in seconds is represented on the first line as space-separated numbers and the best distance for each race is represented on the second line as space-separated numbers. Assume that at the beginning of each race (that is, at zero seconds) our velocity is zero. For each second that we wait after the start of the race, one unit of velocity is added. For each race, calculate how many different ways we can beat the best distance by waiting various numbers of seconds at the beginning. Take the count of the number of ways for each race, multiply them together, and print that result.
// (wrong) Read the day06_test.txt as input. The first line has a label and then has the time limits for three races where the length of each race in seconds is represented as space-separated numbers. The second line has a label and then the best distance for each race represented as space-separated numbers. Assume that at the beginning of each race (that is, at zero seconds) our velocity is zero. For each second that we wait after the start of the race, one unit of velocity is added. For each race, calculate how many different ways we can beat the best distance by waiting various numbers of seconds at the beginning. Take the count of the number of ways for each race, multiply them together, and print that result.
// (wrong) Read the day06_test.txt as input. The first line is labelled "Time:" and then has the time limits for three races where the length of each race in seconds is represented as space-separated numbers. The second line is labelled "Distance:" and then the best distance for each race represented as space-separated numbers. Assume that at the beginning of each race (that is, at zero seconds) our velocity is zero. For each second that we wait after the start of the race, one unit of velocity is added. For each race, calculate how many different ways we can beat the best distance by waiting various numbers of seconds at the beginning. Take the count of the number of ways for each race, multiply them together, and print that result.


const fs = require('fs');

// Read the contents of the file
const fileContents = fs.readFileSync('day06_test.txt', 'utf-8');

// Parse the time limits and best distances
const lines = fileContents.split('\n');
const timeLimits = lines[0].split(' ').map(Number);
const bestDistances = lines[1].split(' ').map(Number);

// Calculate the number of ways to beat the best distance for each race
let totalWays = 1;
for (let i = 0; i < timeLimits.length; i++) {
  const timeLimit = timeLimits[i];
  const bestDistance = bestDistances[i];

  let ways = 0;
  for (let j = 0; j <= timeLimit; j++) {
    const distance = j * (j + 1) / 2;
    if (distance > bestDistance) {
      ways++;
    }
  }

  totalWays *= ways;
}

// Print the final result
console.log(totalWays);

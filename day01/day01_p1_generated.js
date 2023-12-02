// Prompt for part 1:
// for each line in day01_test.txt, find the first numerical digit 
// and the last numerical digit, combining these two digits to form 
// a single number, then add all of those numbers together and print the sum

const fs = require('fs');
const readline = require('readline');

// changed this line to point to the real input file and remove absolute path
const filePath = 'day01_input.txt';

let sum = 0;

const readInterface = readline.createInterface({
  input: fs.createReadStream(filePath),
  output: process.stdout,
  console: false
});

readInterface.on('line', function(line) {
  const firstDigit = line.match(/\d/);
  const lastDigit = line.match(/\d(?=\D*$)/);
  
  if (firstDigit && lastDigit) {
    const number = parseInt(firstDigit[0] + lastDigit[0]);
    sum += number;
  }
});

readInterface.on('close', function() {
  // added "Part 1"
  console.log('Part 1 Sum:', sum);
});


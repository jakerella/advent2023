// Day 1, Part 2 Prompt - NOT CORRECT
// for each line in day01_test2.txt, find the first numerical digit 
// or the first spelled out number such as "one" or "two", then find 
// the last numerical digit or the last spelled out number. Convert 
// these two things into numerical format and combine the two digits 
// to form a single number two-digit number. Finally, add all of the 
// two-digit numbers together and print the sum

const fs = require('fs');

const filePath = '/home/jordan/projects/advent2023/day01_test2.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split('\n');
  let sum = 0;

  for (const line of lines) {
    const firstDigitMatch = line.match(/\d+|one|two|three|four|five|six|seven|eight|nine/gi);
    const lastDigitMatch = line.match(/\d+|one|two|three|four|five|six|seven|eight|nine/gi);

    if (firstDigitMatch && lastDigitMatch) {
      const firstDigit = convertToNumber(firstDigitMatch[0]);
      const lastDigit = convertToNumber(lastDigitMatch[lastDigitMatch.length - 1]);
      const twoDigitNumber = combineDigits(firstDigit, lastDigit);
      sum += twoDigitNumber;
    }
  }

  console.log('Sum:', sum);
});

function convertToNumber(value) {
  const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };

  if (isNaN(value)) {
    return numberMap[value.toLowerCase()];
  }

  return parseInt(value);
}

function combineDigits(firstDigit, lastDigit) {
  return parseInt(`${firstDigit}${lastDigit}`);
}

// Day 02, Part 2 prompt
// For each line in day02_test.txt, identify the Game number and store it as 
// an ID for that line. Then within each line, identify the maximum value for 
// each unique color (red, green, and blue) appearing within the line in the 
// format such as "5 blue". If the maximum red value for the line is less than 
// 13 and maximum green value is less than 14 and the maximum blue value is 
// less than 15, then consider that line valid. Sum up the ID's for each valid 
// line and print that value

const fs = require('fs');

// Read the file
const fileContent = fs.readFileSync('day02_test.txt', 'utf-8');

// Split the file content into lines
const lines = fileContent.split('\n');

// Initialize the sum of valid IDs
let sumOfValidIDs = 0;

// Iterate over each line
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Extract the ID from the line
    const id = line.match(/Game (\d+)/)[1];

    // Extract the color values from the line
    const colors = line.match(/(\d+) (red|green|blue)/g);

    // Initialize the maximum color values
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    // Iterate over each color value
    for (let j = 0; j < colors.length; j++) {
        const color = colors[j].split(' ');
        const value = parseInt(color[0]);
        const colorName = color[1];

        // Update the maximum color values
        if (colorName === 'red' && value > maxRed) {
            maxRed = value;
        } else if (colorName === 'green' && value > maxGreen) {
            maxGreen = value;
        } else if (colorName === 'blue' && value > maxBlue) {
            maxBlue = value;
        }
    }

    // Check if the line is valid
    if (maxRed < 13 && maxGreen < 14 && maxBlue < 15) {
        // Add the ID to the sum of valid IDs
        sumOfValidIDs += parseInt(id);
    }
}

// Print the sum of valid IDs
console.log(sumOfValidIDs);




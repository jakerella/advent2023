// Prompt for Day 07, Part 1
// (not even close) Read day07_test.txt as input. Each line has two components: 5 characters where each represents a playing card value (ignoring suit), and then a numeric value representing the bid for that hand of cards. Calculate the strength of each hand using this order: 5 of a kind, 4 of a kind, full house, 3 of a kind, 2 pair, 1 pair, and high card value. Sort the card hands in order of strength; if there is a tie, use the first card in the hand to break the tie where the higher value card wins. If the first card in the two tied hands match, move onto the second card in each hand. Once the hands are sorted, calculate each hand's winnings by multiplying each hand's bid value by its position in the order, starting at 1 for the lowest hand. Add up all of the winnings and print that value.

const fs = require('fs');

// Read the contents of the file
const fileContents = fs.readFileSync('day07_test.txt', 'utf-8');

// Split the contents into lines
const lines = fileContents.split('\n');

// Define the order of hand strengths
const handStrengths = ['5 of a kind', '4 of a kind', 'full house', '3 of a kind', '2 pair', '1 pair', 'high card value'];

// Calculate the strength of each hand
const hands = lines.map(line => {
  const [cards, bid] = line.split(' ');
  const strength = handStrengths.findIndex(hand => cards.includes(hand));
  return { cards, bid, strength };
});

// Sort the hands based on their strength
hands.sort((a, b) => a.strength - b.strength);

// Calculate each hand's winnings
const totalWinnings = hands.reduce((sum, hand, index) => {
  const position = index + 1;
  const winnings = hand.bid * position;
  return sum + winnings;
}, 0);

// Print the total winnings
console.log(totalWinnings);

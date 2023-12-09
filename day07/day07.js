const fs = require('fs')

const lines = fs.readFileSync('day07_input.txt').toString().split('\n')
const cardTypes = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const cardTypesJokers = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
let jokers = false

;(() => {
    jokers = false
    const winnings = determineWinnings()
    console.log(`Part 1: ${winnings}`)
})()

;(() => {
    jokers = true
    const winnings = determineWinnings()
    console.log(`Part 2: ${winnings}`)  // 247900129 too high
})()


function determineWinnings() {
    const hands = lines.map(line => {
        const [cards, bid] = line.split(' ')
        return {
            cards: cards.split(''),
            bid: Number(bid)
        }
    })
    hands.sort(compareHands)
    // console.log(hands)
    return hands.reduce((total, hand, i) => {
        return total + (hand.bid * (i+1))
    }, 0)
}


function compareHands(a, b) {
    const aStrength = jokers ? determineStrengthJokers(a.cards) : determineStrength(a.cards)
    const bStrength = jokers ? determineStrengthJokers(b.cards) : determineStrength(b.cards)
    const cardTypesToUse = jokers ? cardTypesJokers : cardTypes
    
    if (aStrength === bStrength) {
        for (let i=0; i<5; ++i) {
            const aType = cardTypesToUse.indexOf(a.cards[i])
            const bType = cardTypesToUse.indexOf(b.cards[i])
            if (aType < bType) {
                return 1
            } else if (bType < aType) {
                return -1
            }
        }
        return 0
    } else {
        return aStrength - bStrength
    }
}

function determineStrengthJokers(hand) {
    const cardCounts = {}
    hand.forEach(card => {
        if (!cardCounts[card]) { cardCounts[card] = 0 }
        cardCounts[card]++
    })
    const cards = Object.keys(cardCounts)
    if (cards.length === 1) {
        return 6

    } else if (cards.length === 2) {
        if (cardCounts[cards[0]] === 4 || cardCounts[cards[0]] === 1) {
            return (cards[0] === 'J' || cards[1] === 'J') ? 6 : 5
        } else {
            return (cards[0] === 'J' || cards[1] === 'J') ? 6 : 4
        }

    } else if (cards.length === 3) {
        if (cardCounts[cards[0]] === 3 || 
            cardCounts[cards[1]] === 3 ||
            cardCounts[cards[2]] === 3) {
            return (cards[0] === 'J' || cards[1] === 'J' || cards[2] === 'J') ? 5 : 3
        } else {
            for (let i=0; i<3; ++i) {
                if (cards[i] === 'J') {
                    return cardCounts[cards[i]] === 2 ? 5 : 4
                }
            }
            return 2
        }
    } else if (cards.length === 4) {
        for (let i=0; i<4; ++i) {
            if (cards[i] === 'J') { return 3 }
        }
        return 1
    } else if (cards.length === 5) {
        for (let i=0; i<5; ++i) {
            if (cards[i] === 'J') { return 1 }
        }
        return 0
    }
}

function determineStrength(hand) {
    const cardCounts = {}
    hand.forEach(card => {
        if (!cardCounts[card]) { cardCounts[card] = 0 }
        cardCounts[card]++
    })
    const cards = Object.keys(cardCounts)
    if (cards.length === 1) {
        return 6
    } else if (cards.length === 2) {
        if (cardCounts[cards[0]] === 4 || cardCounts[cards[0]] === 1) { return 5 }
        return 4
    } else if (cards.length === 3) {
        if (cardCounts[cards[0]] === 3 || 
            cardCounts[cards[1]] === 3 ||
            cardCounts[cards[2]] === 3) {
            return 3
        }
        return 2
    } else if (cards.length === 4) {
        return 1
    } else if (cards.length === 5) {
        return 0
    }
}

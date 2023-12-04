const fs = require('fs')

const lines = fs.readFileSync('day04_input.txt').toString().split('\n')

;(() => {
    let sum = 0
    lines.forEach(line => {
        let points = 0
        const card = line.split(/(?:\: | \| )/)
        const winning = card[1].split(' ').map(Number)
        card[2].split(' ').filter(e => e).map(Number).forEach(num => {
            if (winning.includes(num)) {
                // console.log(`Found winner for ${card[0]}: ${num}`)
                points = (points) ? points * 2 : 1
            }
        })
        // console.log(`Points: ${points}`)
        sum += points
    })

    console.log(`Part 1: ${sum}`)
})()


;(() => {
    const cards = {}
    lines.forEach(line => {
        const card = line.split(/(?:\: | \| )/)
        const cardNum = Number(card[0].split(/\s+/)[1])
        cards[cardNum] = { wins: 0, copies: 1 }
        
        const winning = card[1].split(' ').map(Number)
        cards[cardNum].wins = card[2].split(' ').filter(e => e).map(Number)
            .reduce((wins, num) => {
                return (winning.includes(num)) ? wins + 1 : wins
            }, 0)
    })
    Object.keys(cards).forEach(cardNum => {
        for (let c=0; c<cards[cardNum].copies; ++c) {
            for (let i=0; i<cards[cardNum].wins; ++i) {
                cards[Number(cardNum) + i + 1].copies++
            }
        }
    })
    const cardCount = Object.keys(cards).reduce((count, cardNum) => {
        return count + cards[cardNum].copies
    }, 0)

    console.log(`Part 2: ${cardCount}`)
})()

const fs = require('fs')

const lines = fs.readFileSync('day01_input.txt').toString().split('\n')

function part1() {
    let sum = 0
    lines.forEach(line => {
        const d1 = line.match(/\d/)
        const d2 = line.split('').reverse().join('').match(/\d/)
        sum += Number(d1[0]+d2[0])
    })
    console.log(`Part 1: ${sum}`)  // 55834
}

part1()

function part2() {
    const numberMapping = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 }
    let sum = 0
    lines.forEach(line => {
        
        let d1 = line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/)
        let d2 = line.split('').reverse().join('').match(/(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/)
        if (d1 && !Number(d1[1])) {
            d1 = numberMapping[d1[1]]
        } else {
            d1 = d1[1]
        }
        if (d2 && !Number(d2[1])) {
            d2 = numberMapping[d2[1].split('').reverse().join('')]
        } else {
            d2 = d2[1]
        }
        sum += Number(('' + d1 + d2))
    })
    console.log(`Part 2: ${sum}`)  // 53221
}

part2()

const fs = require('fs')

const lines = fs.readFileSync('day03_input.txt').toString().split('\n')

;(() => {
    const numRegex = /[0-9]+/g
    let sum = 0
    lines.forEach((line, i) => {
        while ((num = numRegex.exec(line)) != null) {
            if (checkNum(i, num)) {
                sum += Number(num[0])
            }
        }
    })
    console.log(`Part 1: ${sum}`)
})()

function checkNum(i, num) {
    const symbolRegex = /[^0-9\.]/g
    for (let y=(i-1); y<(i+2); ++y) {
        for (let x=(num.index-1); x<(num.index+num[0].length+1); ++x) {
            if (lines[y] && lines[y][x] && symbolRegex.test(lines[y][x])) {
                // console.log(`${num[0]} found at [${i}, ${num.index}] with a ${lines[y][x]} at [${y}, ${x}]`)
                return true
            }
        }
    }
    return false
}


;(() => {
    const numRegex = /[0-9]+/g
    let sum = 0
    const gears = {}
    lines.forEach((line, i) => {
        while ((num = numRegex.exec(line)) != null) {
            const pos = checkGears(i, num)
            if (pos) {
                if (!gears[pos]) { gears[pos] = [] }
                gears[pos].push(num[0])
            }
        }
    })
    Object.keys(gears).forEach((gear) => {
        if (gears[gear].length === 2) {
            // console.log(`gear ${gear} has ratio ${gears[gear][0] * gears[gear][1]}`)
            sum += (gears[gear][0] * gears[gear][1])
        }
    })
    console.log(`Part 2: ${sum}`)
})()

function checkGears(i, num) {
    const symbolRegex = /\*/g
    for (let y=(i-1); y<(i+2); ++y) {
        for (let x=(num.index-1); x<(num.index+num[0].length+1); ++x) {
            if (lines[y] && lines[y][x] && symbolRegex.test(lines[y][x])) {
                // console.log(`${num[0]} found at [${i}, ${num.index}] with a ${lines[y][x]} at [${y}, ${x}]`)
                return `${y}-${x}`
            }
        }
    }
    return null
}

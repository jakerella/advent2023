const { log } = require('console');
const fs = require('fs')

const lines = fs.readFileSync('day02_input.txt').toString().split('\n')

;(() => {
    let validGames = 0
    const limits = { red: 12, green: 13, blue: 14 }
    lines.forEach((line, i) => {
        let valid = 1
        const pulls = line.match(/\d+ (red|green|blue)/g)
        pulls.forEach(pull => {
            const [count, color] = pull.split(' ')
            if (limits[color] < Number(count)) {
                valid = 0
            }
        })
        if (valid) validGames += (i+1)
    })
    console.log(`Part 1: ${validGames}`)
})()


;(() => {
    let sum = 0
    lines.forEach((line, i) => {
        const max = { red: 0, green: 0, blue: 0 }
        const pulls = line.match(/\d+ (red|green|blue)/g)
        pulls.forEach(pull => {
            const [count, color] = pull.split(' ')
            if (max[color] < Number(count)) {
                max[color] = Number(count)
            }
        })
        let power = 1
        Object.keys(max).forEach(color => { power *= max[color] })
        // console.log(`power: ${power}`)
        sum += power
    })
    console.log(`Part 2: ${sum}`)
})()

const fs = require('fs')

const lines = fs.readFileSync('day06_input.txt').toString().split('\n')

;(() => {
    const times = lines[0].split(/\s+/).slice(1).map(Number)
    const distances = lines[1].split(/\s+/).slice(1).map(Number)

    let prod = 1
    times.forEach((t, i) => {
        let v = 0
        let wins = 0
        for (let s = 1; s < t; ++s) {
            v++
            if (((t - s) * v) > distances[i]) {
                wins++
            } else {
                if (wins > 0) { break }
            }
        }
        // console.log(`ways to win race ${i + 1}: ${wins}`)
        prod *= wins
    })

    console.log(`Part 1: ${prod}`)
})()

;(() => {
    const time = Number(lines[0].split(':')[1].replaceAll(' ', ''))
    const distance = Number(lines[1].split(':')[1].replaceAll(' ', ''))

    let v = 0
    let wins = 0
    for (let s = 1; s < time; ++s) {
        v++
        if (((time - s) * v) > distance) {
            wins++
        } else {
            if (wins > 0) { break }
        }
    }

    console.log(`Part 2: ${wins}`)
})()

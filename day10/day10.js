const fs = require('fs')

const lines = fs.readFileSync('day10_input.txt').toString().split('\n')
const pipeLocations = {}

;(() => {
    let pos = [0,-1]
    for (let i = 0; i < lines.length; i++) {
        pos[0] = i
        pos[1] = lines[i].indexOf('S')
        if (pos[1] !== -1) { break }
    }
    const start = [...pos]


    // STARTING VALUES
    let steps = 0
    let pipe = 'L'
    let dir = 'D'
    // ---------------


    pipeLocations[pos.join('-')] = dir // for part 2

    while (steps < 10000000) {
        if (pipe === 'J' && dir === 'R') { pos[0]--; dir = 'U' }
        if (pipe === 'J' && dir === 'D') { pos[1]--; dir = 'L' }
        if (pipe === 'F' && dir === 'U') { pos[1]++; dir = 'R' }
        if (pipe === 'F' && dir === 'L') { pos[0]++; dir = 'D' }
        if (pipe === '7' && dir === 'R') { pos[0]++; dir = 'D' }
        if (pipe === '7' && dir === 'U') { pos[1]--; dir = 'L' }
        if (pipe === 'L' && dir === 'L') { pos[0]--; dir = 'U' }
        if (pipe === 'L' && dir === 'D') { pos[1]++; dir = 'R' }
        if (pipe === '|' && dir === 'U') { pos[0]--; dir = 'U' }
        if (pipe === '|' && dir === 'D') { pos[0]++; dir = 'D' }
        if (pipe === '-' && dir === 'L') { pos[1]--; dir = 'L' }
        if (pipe === '-' && dir === 'R') { pos[1]++; dir = 'R' }
        pipe = lines[pos[0]][pos[1]]
        steps++
        // console.log('moved to', pos, pipe, dir)

        if (pos[0] === start[0] && pos[1] === start[1]) {
            console.log(`Back at the beginning after ${steps} steps`)
            break
        }
        pipeLocations[pos.join('-')] = dir // for part 2
    }

    console.log(`Part 1: ${steps / 2}`)
})()

;(() => {
    let containedSpaces = 0
    for (let i = 0; i < lines.length; ++i) {
        for (let j = 0; j < lines[i].length; ++j) {
            if (!pipeLocations[`${i}-${j}`]) {
                let verts = 0
                for (let x = 0; x<j; ++x) {
                    if (/(\||L|J)/.test(lines[i][x])) { verts++ }
                }
                if (verts % 2) {
                    containedSpaces++
                }
            }
        }
    }

    console.log(`Part 2: ${containedSpaces}`)  // 2893 too high
})()

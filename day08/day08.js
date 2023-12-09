const fs = require('fs')

const lines = fs.readFileSync('day08_input.txt').toString().split('\n')
const navigation = lines[0].split('')
const nodes = {}
lines.slice(2).forEach(line => {
    const [_, loc, L, R] = line.match(/^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)$/)
    nodes[loc] = { L, R }
})
// console.log(nodes)

;(() => {
    let loc = 'AAA'
    let i = 0
    let steps = 0
    while (loc !== 'ZZZ') {
        loc = nodes[loc][navigation[i]]
        steps++
        i = (++i >= navigation.length) ? 0 : i
    }

    console.log(`Part 1: ${steps}`)
})()


;(() => {
    let curr = Object.keys(nodes).filter(loc => /..A/.test(loc))
    
    let i = 0
    let steps = 0
    const loops = {}
    while (curr.length) {
        for (let j = 0; j < curr.length; ++j) {
            curr[j] = nodes[curr[j]][navigation[i]]
        }
        steps++
        i = (++i >= navigation.length) ? 0 : i
        // console.log('curr nodes:', curr, 'heading:', navigation[i])
        for (let j = 0; j < curr.length; ++j) {
            if (/..Z/.test(curr[j])) {
                loops[curr[j]] = steps
                curr.splice(j, 1)
            }
        }
    }
    // console.log(loops)
    
    let lcmSteps = Math.min(...Object.values(loops))
    Object.values(loops).forEach(n => {
        lcmSteps = lcm(lcmSteps, n)
    })

    console.log(`Part 2: ${lcmSteps}`)
})()

function gcd(a, b) { return !b ? a : gcd(b, a % b) }

function lcm(a, b) { return (a * b) / gcd(a, b) }

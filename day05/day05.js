const fs = require('fs')

const lines = fs.readFileSync('day05_input.txt').toString().split('\n')
const maps = {}
let currMap = []
lines.slice(2).forEach(line => {
    if (line && /[a-z]/.test(line[0])) {
        currMap = line.split(' map')[0].split('-').filter(l => l !== 'to')
        maps[currMap[0]] = { to: currMap[1], ranges: [] }
    } else if (line && /[0-9]/.test(line[0])) {
        const nums = line.split(' ').map(Number)
        maps[currMap[0]].ranges.push({ source: nums[1], dest: nums[0], len: nums[2] })
    }
})
// Object.keys(maps).forEach(key => {
//     console.log(key, JSON.stringify(maps[key]))
// })


;(() => {
    const seeds = lines[0].split(': ')[1].split(' ').map(Number)
    const locations = findLocations(seeds)
    console.log(`Part 1: ${locations[0]}`)
})()


;(() => {
    const ranges = lines[0].split(': ')[1].split(' ').map(Number)
    const seeds = []
    for (let i=0; i<ranges.length; i+=2) {
        const range = []
        for (let j=ranges[i]; j<(ranges[i]+ranges[i+1]); ++j) {
            range.push(j)
        }
        seeds.push(...range)
    }
    const locations = findLocations(seeds)
    console.log(`Part 2: ${locations[0]}`)
})()


function findLocations(seeds) {
    let locations = []
    seeds.forEach(seed => {
        let cat = 'seed'
        let value = seed
        while (cat !== 'location') {
            let match = value
            maps[cat].ranges.forEach(range => {
                if (range.source <= value && value < (range.source + range.len)) {
                    match = range.dest + (value - range.source)
                }
            })
            // console.log(`${cat} ${value} -> ${maps[cat].to} ${match}`)

            cat = maps[cat].to
            value = match
            if (cat === 'location') {
                locations.push(match)
                break
            }
        }
    })
    locations.sort((a,b) => a-b)
    // console.log(locations)
    return locations
}
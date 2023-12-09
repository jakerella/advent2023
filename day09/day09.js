const fs = require('fs')

const lines = fs.readFileSync('day09_input.txt').toString().split('\n')
let histories = lines.map(line => {
    return line.split(' ').map(Number)
})

;(() => {
    const nextValues = getNextValues(histories)
    // console.log(nextValues)

    console.log(`Part 1: ${nextValues.reduce((p, c) => p + c, 0)}`)
})()

;(() => {
    histories = histories.map(h => h.reverse())
    const nextValues = getNextValues(histories)
    // console.log(nextValues)

    console.log(`Part 2: ${nextValues.reduce((p, c) => p + c, 0)}`)
})()


function getNextValues(histories) {
    const nextValues = []
    histories.forEach(history => {
        let nextStep = history
        let lastSteps = [nextStep[nextStep.length-1]]
        
        while (!nextStep.every(n => n === 0)) {
            nextStep = getNextStep(nextStep)
            // console.log(nextStep)
            lastSteps.push(nextStep[nextStep.length-1])
        }
        // console.log(lastSteps.reverse())
        
        const nextSteps = [0]
        lastSteps.reverse().forEach((val, i) => {
            if (i > 0) {
                // console.log(`adding ${val} and ${nextSteps[i-1]}`)
                nextSteps.push(val + nextSteps[i-1])
            }
        })
        nextValues.push(nextSteps.pop())
    })
    return nextValues
}

function getNextStep(series) {
    const nextStep = []
    for (let i = 0; i < series.length-1; ++i) {
        nextStep.push(series[i+1] - series[i])
    }
    return nextStep
}

const fs = require('fs')

let input = fs.readFileSync('./test-input.txt', 'UTF-8')

let inputArr = input.split('\n').map(text => text.trim())

let guardTimings = {}

let currentGuardId = 0
let fallAsleepTime = 0
let wakeUpTime = 0
let minList = []

const range = (start, end) => new Array(end - start)
.fill(undefined).map((_, i) => i + start)

const sortedDates = inputArr
  .sort((a, b) => {
    let dateStrA = a.match(/\[(.*?)\]/)
    let dateA = new Date(dateStrA[1])
    let dateStrB = b.match(/\[(.*?)\]/)
    let dateB = new Date(dateStrB[1])
    return dateA - dateB
  })

sortedDates.forEach(item => {
    let guardId = item.match(/ #([0-9]+) /) ? item.match(/ #([0-9]+) /)[1] : 0
    if (guardId !== 0) {
      currentGuardId = guardId
    }

    if (!guardTimings[guardId] && guardId !== 0) {
      guardTimings[guardId] = 0
    }

    if (item.match(/(falls asleep)/)) {
      let hrMin = item.match(/ (.*?)\]/)[1].split(':')
      let hr = hrMin[0]
      let min = hrMin[1]
      fallAsleepTime = parseInt(min)
    } else if (item.match(/(wakes up)/)) {
      let hrMin2 = item.match(/ (.*?)\]/)[1].split(':')
      let hr2 = hrMin2[0]
      let min2 = hrMin2[1]
      wakeUpTime = parseInt(min2)
      guardTimings[currentGuardId] += (wakeUpTime - fallAsleepTime)
      minList.push([currentGuardId, fallAsleepTime, wakeUpTime])
    }
  })

let mostAsleepGuard = Object.keys(guardTimings).reduce((oldVal, newVal) => {
  return guardTimings[newVal] > guardTimings[oldVal] ? newVal : oldVal
})

console.log(minList)

let mostGuardAsleepTimes = minList.filter(item => item[0] === mostAsleepGuard)

let timeArr = mostGuardAsleepTimes.map((item) => {
  let newItem = item.slice(1)
  return range(newItem[0], newItem[1])
}).join().split(',')

let countArr = timeArr.reduce((oldVal, newVal) => {
  if (!oldVal[newVal]) {
    oldVal[newVal] = 0
  }
  oldVal[newVal]++
  return oldVal
}, {})

let min = 0
let keyMin = -1

Object.entries(countArr).forEach(([key, value]) => {
  if (value > min) {
    min = value
    keyMin = key
  }
})


console.log(keyMin)

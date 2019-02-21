
const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')

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

console.log(minList)

let count = minList.reduce((oldVal, newVal) => {
  if (!oldVal[newVal[0]]) {
    oldVal[newVal[0]] = []
  }
  oldVal[newVal[0]].push(newVal.slice(1))
  return oldVal
}, {})

let timeArr = Object.entries(count).map(([key, arr]) => {
  let splitArr = arr.map(item => {
    return range(item[0], item[1])
  }).join().split(',')

  // console.log(splitArr)
  let newKey = splitArr.reduce((oldVal, newVal) => {
    if (!oldVal[newVal]) {
      oldVal[newVal] = 0
    }
    oldVal[newVal]++
    return oldVal
  }, {})
  // console.log(key)
  let newObj = {}
  newObj[key] = newKey
  return newObj
  // return range(newItem[0], newItem[1])
})

// console.log(timeArr)

let min = 0
let keyMin = -1
let keyGuardId = -1
let hello = timeArr.map(item => {
  let min = 0
  let keyMin = -1

  let currKey = Object.keys(item)[0]
  let valuesArr = Object.values(item)[0]

  Object.entries(valuesArr).forEach(([minute, count]) => {
    if (count > min) {
      min = count
      keyMin = minute
    }
  })

  let newCountObj = {}
  newCountObj[currKey] = [min, keyMin]
  return newCountObj
})

let finalKey = -1
let finalMinute = 0
let finalCount = 0
hello.forEach(item => {
  let key = Object.keys(item)
  let value = Object.values(item)

  if (value[0][0] > finalCount) {
    finalCount = value[0][0]
    finalKey =  key[0]
    finalMinute =  value[0][1]
  }
})

console.log(finalKey, finalMinute)


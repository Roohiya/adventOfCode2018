const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')

let inputArr = input.split('\n').map(num => parseInt(num.trim()))

let currentSum = 0
let sumArr = [currentSum]
let i = 0
let checkFreqRepeated = false

while(!checkFreqRepeated) {
  if (i === inputArr.length - 1) {
    i = 0
  }
  currentSum += inputArr[i]
  checkFreqRepeated = sumArr.includes(currentSum)
  sumArr.push(currentSum)
  i++
}

console.log("current sum is", currentSum)

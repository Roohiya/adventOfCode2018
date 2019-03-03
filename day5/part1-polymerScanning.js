const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')

let inputArr = input.trim().split('')

const reduced = inputArr.reduce((oldVal, item) => {
  let getCode = item.charCodeAt(0)
  let getPreviousItem = oldVal[oldVal.length - 1]
  let getPreviousCode
  if (getPreviousItem) {
    getPreviousCode = getPreviousItem.charCodeAt(0)
  }
  if (Math.abs(getPreviousCode - getCode) === 32) {
    return oldVal.slice(0, -1)
  }

  return oldVal + item
}, '')

console.log(reduced.length)

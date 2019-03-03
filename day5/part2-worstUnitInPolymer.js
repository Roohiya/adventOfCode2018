const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')

let inputArr = input.trim().split('')

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

let result = {}

let finalResult = alphabet.map(letter => {
  let lowerCaseCode = letter.charCodeAt(0)
  let upperCaseCode = lowerCaseCode - 32

  let inputArrFilter = inputArr.reduce((oldVal, item) => {
    if (item.charCodeAt(0) === lowerCaseCode || item.charCodeAt(0) === upperCaseCode) {
      return oldVal
    }

    return oldVal + item
  }, '')

  const reduced = inputArrFilter.split('').reduce((oldVal, item) => {
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

  return reduced.length
})

const shortestPloymer = finalResult.reduce((oldVal, value) => {
  if (value < oldVal) {
    return value
  }

  return oldVal
}, Infinity)

console.log(shortestPloymer)

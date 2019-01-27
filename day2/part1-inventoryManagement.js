const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')

let inputArr = input.split('\n').map(text => text.trim())

let splitStrArr = []

let mainCount = []

inputArr.forEach(item => {
    splitStrArr = item.split('')
    let charCount = {}
    splitStrArr.map(char => {
        if (!charCount[char]) {
            charCount[char] = 0
        }
        charCount[char]++
    })
    mainCount.push(charCount)
})

let twosThrees = { '2': 0, '3': 0 }

mainCount.map(item => {
    let itemWith2 = 0
    let itemWith3 = 0
    for (letter in item) {
        if (item[letter] === 2 && itemWith2 === 0) {
            twosThrees['2']++
            itemWith2++
        } else if (item[letter] === 3 && itemWith3 === 0) {
            twosThrees['3']++
            itemWith3++
        }
    }
})

console.log(twosThrees['2'] * twosThrees['3'])
const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')

let inputArr = input.split('\n').map(text => text.trim())

let size = inputArr.length

let checkArr = []

let check

let checkWord = (word1, word2, size) => {
  let k = 0
  let check = {'same': 0, 'diff': 0}
  let diffIndex = -1

  while (k < size) {
    if (word1[k] === word2[k]){
      check['same']++
    } else {
      check['diff']++
      diffIndex = k
    }
    k++
  }
  if (check['same'] === size - 1 && check['diff'] === 1) {
    return {word1, word2, diffIndex}
  }

  return false
}

for(let i = 0; i < size; i++) {
    for(let j = i + 1; j < inputArr.length; j++) {
      check = checkWord(inputArr[i], inputArr[j], size)
      if (check) {
        checkArr.push(check)
      }
    }
  console.log(checkArr)
}



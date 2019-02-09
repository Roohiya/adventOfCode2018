const fs = require('fs')

let input = fs.readFileSync('./test-input.txt', 'UTF-8')

let inputArr = input.split('\n').map(text => text.trim())

let check = []

for(let i = 0; i < inputArr.length; i++) {
  let splitArr = inputArr[i].split(' ')
  let id = splitArr[0].slice(1)
  let coord = splitArr[2].slice(0, -1).split(',')
  let width = parseInt(splitArr[3].split('x')[0])
  let length = parseInt(splitArr[3].split('x')[1])
  let coordinateX = parseInt(coord[0])
  let coordinateY = parseInt(coord[1])

  for (let x = coordinateX; x < (coordinateX + width); x++) {
    for (let y = coordinateY; y < (coordinateY + length); y++) {
      if (!check[`${x},${y}`]) {
        check[`${x},${y}`] = 0
      }
      check[`${x},${y}`]++
    }
  }
}

let overlapSum = Object.values(check).filter(item => {
 return item > 1
}).length

console.log(check)

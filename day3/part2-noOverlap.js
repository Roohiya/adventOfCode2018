const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')

let idList = {}

let overlapIds = {}

let inputArr = input
  .split('\n')
  .map(text => text.trim())
  .map(text => text.match(/#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/))
  .map(splStr => {
    let id = parseInt(splStr[1])
    idList[id] = 0
    return {
      id,
      coordinateX: parseInt(splStr[2]),
      coordinateY: parseInt(splStr[3]),
      width: parseInt(splStr[4]),
      length: parseInt(splStr[5]),
    }
  }).forEach(item => {
    for (let x = item.coordinateX; x < (item.coordinateX + item.width); x++) {
      for (let y = item.coordinateY; y < (item.coordinateY + item.length); y++) {
        let key = `${x},${y}`
        if (!overlapIds[key]) {
          overlapIds[key] = item.id
        } else {
          let id = overlapIds[key]
          idList[id] = 1
          idList[item.id] = 1
        }
      }
    }
  })


for (id in idList) {
  if (idList[id] === 0) {
    console.log(id)
  }
}

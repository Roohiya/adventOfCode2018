var fs = require('fs')

var dataInput = fs.readFileSync('input.txt', 'UTF-8')

var splitArr = dataInput.split('\n')

let totalSum = splitArr.reduce((oldValue, item) => {
    return oldValue + parseInt(item)
}, 0)

console.log(totalSum)
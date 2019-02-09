'use strict'

var utility = utility || {}

utility.array = {}

utility.array.copy = function(array) {
  return [].slice.call(array)
}

utility.array.randomIndex = function(array) {
  if (Array.isArray(array)) {
    return Math.floor(Math.random() * array.length)
  }
}

utility.array.randomValue = function(array) {
  if (Array.isArray(array)) {
    return array[this.randomIndex(array)]
  }
}

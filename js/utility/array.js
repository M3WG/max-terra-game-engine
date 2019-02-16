'use strict'

var utility = utility || {}

utility.array = {}

utility.array.copy = array => {
  return [].slice.call(array)
}

utility.array.randomIndex = array => {
  if (Array.isArray(array)) {
    return Math.floor(Math.random() * array.length)
  }
}

utility.array.randomValue = array => {
  if (Array.isArray(array)) {
    return array[this.randomIndex(array)]
  }
}

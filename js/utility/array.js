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
  const randomIndex = utility.array.randomIndex

  if (Array.isArray(array)) {
    const index = randomIndex(array)
    return array[index]
  }
}

utility.array.reverse = array => {
  const copy = utility.array.copy

  return copy(array).reverse()
}

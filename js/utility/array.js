'use strict'

var utility = utility || {}

utility.array = {}

utility.array.copy = array => Array.isArray(array) ? [].slice.call(array) : []

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

utility.array.shuffle = array => {
  array = utility.array.copy(array)

  for (let i = array.length - 1; i > 0; i--) {
    // Fun fact: Semi-colon prevents "Uncaught ReferenceError: j is not defined"
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

'use strict'

/**
 * Pure utility functions for manipulating arrays.
 *
 * @namespace m3.utility.array
 */
m3.utility.array = {}

/**
 * Returns a shallow copy of the provided array.
 */
m3.utility.array.copy = (array) => Array.isArray(array) ? [].slice.call(array) : []

/**
 * Returns a random index within the provided array.
 */
m3.utility.array.randomIndex = (array) => {
  if (Array.isArray(array)) {
    return Math.floor(Math.random() * array.length)
  }
}

/**
 * Returns a random value within the provided array.
 */
m3.utility.array.randomValue = (array) => {
  if (Array.isArray(array)) {
    const index = m3.utility.array.randomIndex(array)
    return array[index]
  }
}

/**
 * Returns a reversed copy of the provided array.
 */
m3.utility.array.reverse = (array) => m3.utility.array.copy(array).reverse()

/**
 * Returns a shuffled copy of the provided array.
 */
m3.utility.array.shuffle = (array) => {
  array = m3.utility.array.copy(array)

  for (let i = array.length - 1; i > 0; i--) {
    // Fun fact: Semi-colon prevents "Uncaught ReferenceError: j is not defined"
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

/**
 * Returns a copy of the provided array with only unique values.
 */
m3.utility.array.unique = (array) => [...Set(array)]

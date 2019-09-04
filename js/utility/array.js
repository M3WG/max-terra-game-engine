'use strict'

/**
 * Utility functions for manipulating arrays without side effects.
 * @namespace utility.array
 */
utility.array = {}

/**
 * Returns a shallow copy of the provided array.
 */
utility.array.copy = (array) => Array.isArray(array) ? [].slice.call(array) : []

/**
 * Returns a random index within the provided array.
 */
utility.array.randomIndex = (array) => {
  if (Array.isArray(array)) {
    return Math.floor(Math.random() * array.length)
  }
}

/**
 * Returns a random value within the provided array.
 */
utility.array.randomValue = (array) => {
  if (Array.isArray(array)) {
    const index = utility.array.randomIndex(array)
    return array[index]
  }
}

/**
 * Returns a reversed copy of the provided array.
 */
utility.array.reverse = (array) => utility.array.copy(array).reverse()

/**
 * Returns a shuffled copy of the provided array.
 */
utility.array.shuffle = (array) => {
  array = utility.array.copy(array)

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
utility.array.unique = (array) => [...Set(array)]

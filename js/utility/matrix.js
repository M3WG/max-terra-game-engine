'use strict'

/**
 * Utility functions for working with 2D matrices without side effects.
 *
 * @namespace utility.matrix
 */
utility.matrix = {}

/**
 * Mirrors the provided matrix across the line `y = x`.
 */
utility.matrix.flip = (matrix) => (
  matrix[0].map((_, index) => (
    matrix.map(row => row[index])
  ))
)

/**
 * Rotates the provided matrix 90 degrees clockwise.
 */
utility.matrix.rotate90 = utility.fn.pipe(utility.array.reverse, utility.matrix.flip)

/**
 * Rotates the provided matrix 180 degrees.
 */
utility.matrix.rotate180 = (matrix) => utility.array.reverse(matrix.map(utility.array.reverse))

/**
 * Rotates the provided matrix 270 degrees clockwise.
 */
utility.matrix.rotate270 = utility.fn.pipe(utility.matrix.flip, utility.array.reverse)

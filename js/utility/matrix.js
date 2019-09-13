'use strict'

/**
 * Pure utility functions for manipulating 2D matrices.
 *
 * @namespace utility.matrix
 */
utility.matrix = {}

/**
 * A two-dimensional matrix.
 *
 * @typedef Matrix2D
 * @see utility.matrix
 * @type {mixed[][]}
 */

/**
 * Mirrors the provided matrix across the line `y = x`.
 *
 * @param {Matrix2D} matrix
 * @return {Matrix2D} - Shallow copy
 */
utility.matrix.flip = (matrix) => (
  matrix[0].map((_, index) => (
    matrix.map(row => row[index])
  ))
)

/**
 * Rotates the provided matrix 90 degrees clockwise.
 *
 * @function
 * @param {Matrix2D} matrix
 * @return {Matrix2D} - Shallow copy
 */
utility.matrix.rotate90 = utility.fn.pipe(utility.array.reverse, utility.matrix.flip)
; // XXX: JSDoc requires semi-colon

/**
 * Rotates the provided matrix 180 degrees.
 *
 * @param {Matrix2D} matrix
 * @return {Matrix2D} - Shallow copy
 */
utility.matrix.rotate180 = (matrix) => utility.array.reverse(matrix.map(utility.array.reverse))
; // XXX: JSDoc requires semi-colon

/**
 * Rotates the provided matrix 270 degrees clockwise.
 *
 * @function
 * @param {Matrix2D} matrix
 * @return {Matrix2D} - Shallow copy
 */
utility.matrix.rotate270 = utility.fn.pipe(utility.matrix.flip, utility.array.reverse)

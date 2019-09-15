'use strict'

/**
 * Pure utility functions for manipulating 2D matrices.
 *
 * @namespace m3.utility.matrix
 */
m3.utility.matrix = {}

/**
 * A two-dimensional matrix.
 *
 * @typedef Matrix2D
 * @see m3.utility.matrix
 * @type {mixed[][]}
 */

/**
 * Mirrors the provided matrix across the line `y = x`.
 *
 * @param {Matrix2D} matrix
 * @return {Matrix2D} - Shallow copy
 */
m3.utility.matrix.flip = (matrix) => (
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
m3.utility.matrix.rotate90 = m3.utility.fn.pipe(m3.utility.array.reverse, m3.utility.matrix.flip)
; // XXX: JSDoc requires semi-colon

/**
 * Rotates the provided matrix 180 degrees.
 *
 * @param {Matrix2D} matrix
 * @return {Matrix2D} - Shallow copy
 */
m3.utility.matrix.rotate180 = (matrix) => m3.utility.array.reverse(matrix.map(m3.utility.array.reverse))
; // XXX: JSDoc requires semi-colon

/**
 * Rotates the provided matrix 270 degrees clockwise.
 *
 * @function
 * @param {Matrix2D} matrix
 * @return {Matrix2D} - Shallow copy
 */
m3.utility.matrix.rotate270 = m3.utility.fn.pipe(m3.utility.matrix.flip, m3.utility.array.reverse)

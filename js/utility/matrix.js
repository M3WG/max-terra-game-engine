'use strict'

var utility = utility || {}

utility.matrix = {}

utility.matrix.flip = matrix => (
  matrix[0].map((_, index) => (
    matrix.map(row => row[index])
  ))
)

utility.matrix.rotate90 = utility.fn.pipe(utility.array.reverse, utility.matrix.flip)
utility.matrix.rotate180 = matrix => utility.array.reverse(matrix.map(utility.array.reverse))
utility.matrix.rotate270 = utility.fn.pipe(utility.matrix.flip, utility.array.reverse)

'use strict'

utility.matrix = {}

utility.matrix.flip = matrix => {
  return matrix[0].map((_, index) => (
    matrix.map(row => row[index])
  ))
}

utility.matrix.rotate90 = matrix => {
  const flip = utility.matrix.flip,
    reverse = utility.array.reverse

  return flip(
    reverse(matrix)
  )
}

utility.matrix.rotate180 = matrix => {
  const reverse = utility.array.reverse

  return reverse(
    matrix.map(row => reverse(row))
  )
}

utility.matrix.rotate270 = matrix => {
  const flip = utility.matrix.flip,
    reverse = utility.array.reverse

  return reverse(
    flip(matrix)
  )
}

'use strict'

m3.utility.match = {}

// TODO: Define definition struct
// SEE: example/tic-tac-toe
m3.utility.match.shape = (cell, {definition = [], mirror = false, rotate = false}, filter) => {
  const radius = definition.reduce((max, {dx, dy}) => {
    return Math.max(max, Math.abs(dx), Math.abs(dy))
  }, 0)

  const diameter = radius * 2 + 1,
    slice = cell.getMap().createSlice(cell.getX() - radius, cell.getY() - radius, diameter, diameter),
    {x: cx, y: cy} = slice.getCellCoordinates(cell)

  if (typeof filter != 'function') {
    /*
     * XXX: Identity function. Will return first extant shape.
     * Try m3.utility.match.shape(cell, shapes, (x) => x.getTile().getId() == cell.getTile().getId())
     */
    filter = (x) => x
  }

  const permutations = [
    definition,
  ]

  for (let i = 1, length = definition.length; i < length; i++) {
    const {dx, dy} = definition[i]
    const translate = (cell) => ({dx: cell.dx - dx, dy: cell.dy - dy})

    permutations.push(
      definition.map(translate)
    )
  }

  const gatherPermutation = cells => cells.map(({dx, dy}) => slice.getCell(cx + dx, cy + dy))
  const testPermutation = cells => cells.reduce((result, {dx, dy}) => result && filter(slice.getCell(cx + dx, cy + dy)), true)

  let rotations = rotate ? 4 : 0
  do {
    let mirrors = mirror ? 2 : 0
    do {
      for (const permutation of permutations) {
        if (testPermutation(permutation)) {
          return gatherPermutation(permutation)
        }
      }
      if (mirrors > 0) {
        slice.flip()
      }
    } while (mirrors-->1)

    if (rotations > 0) {
      slice.rotate()
    }
  } while (rotations-->1)
}

m3.utility.match.shapes = (cell, shapes, filter) => {
  for (const shape of shapes) {
    const result = m3.utility.match.shape(cell, shape, filter)

    if (result) {
      return result
    }
  }
}

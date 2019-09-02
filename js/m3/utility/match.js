'use strict'

m3.utility.match = {}

// TODO: Define definition struct
// SEE: example/tic-tac-toe
m3.utility.match.shape = (cell, {definition = [], mirror = false, rotate = false}, filter) => {
  const cx = cell.getX(),
    cy = cell.getY(),
    map = cell.getMap()

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

  if (mirror) {
    permutations.slice().forEach((permutation) => {
      permutations.push(
        permutation.map(({dx, dy}) => ({dx: -dx, dy: dy})),
        permutation.map(({dx, dy}) => ({dx: dx, dy: -dy}))
      )
    })
  }

  if (rotate) {
    permutations.slice().forEach((permutation) => {
      permutations.push(
        permutation.map(({dx, dy}) => ({dx: -dy, dy: dx})),
        permutation.map(({dx, dy}) => ({dx: dy, dy: dx})),
        permutation.map(({dx, dy}) => ({dx: dy, dy: -dx}))
      )
    })
  }

  const gather = cells => cells.map(({dx, dy}) => map.getCell(cx + dx, cy + dy))
  const test = cells => cells.reduce((result, {dx, dy}) => result && filter(map.getCell(cx + dx, cy + dy)), true)

  for (const permutation of permutations) {
    if (test(permutation)) {
      return gather(permutation)
    }
  }
}

m3.utility.match.shapes = (cell, shapes, filter) => {
  for (const shape of shapes) {
    const result = m3.utility.match.shape(cell, shape, filter)

    if (result) {
      return result
    }
  }
}

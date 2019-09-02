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
    const [dx, dy] = definition[i]
    const translate = ([x, y]) => [x - dx, y - dy]

    permutations.push(
      definition.map(translate)
    )
  }

  if (mirror) {
    permutations.slice().forEach((permutation) => {
      permutations.push(
        permutation.map(([x, y]) => [-x, y]),
        permutation.map(([x, y]) => [x, -y])
      )
    })
  }

  if (rotate) {
    permutations.slice().forEach((permutation) => {
      permutations.push(
        permutation.map(([x, y]) => [-y, x]),
        permutation.map(([x, y]) => [y, x]),
        permutation.map(([x, y]) => [y, -x])
      )
    })
  }

  const gather = cells => cells.map(([x, y]) => map.getCell(cx + x, cy + y))
  const test = cells => cells.reduce((result, [x, y]) => result && filter(map.getCell(cx + x, cy + y)), true)

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

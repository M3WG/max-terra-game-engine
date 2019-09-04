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
     * Additional parameters are filled from the definition, i.e. [x, y, ...args]
     */
    filter = utility.fn.identity()
  }

  const permutations = [
    definition,
  ]

  for (let i = 1, length = definition.length; i < length; i++) {
    const [dx, dy] = definition[i]
    const translate = ([x, y, ...args]) => [x - dx, y - dy, ...args]

    permutations.push(
      definition.map(translate)
    )
  }

  if (mirror) {
    permutations.slice().forEach((permutation) => {
      permutations.push(
        permutation.map(([x, y, ...args]) => [-x, y, ...args]),
        permutation.map(([x, y, ...args]) => [x, -y, ...args])
      )
    })
  }

  if (rotate) {
    permutations.slice().forEach((permutation) => {
      permutations.push(
        permutation.map(([x, y, ...args]) => [-y, x, ...args]),
        permutation.map(([x, y, ...args]) => [y, x, ...args]),
        permutation.map(([x, y, ...args]) => [y, -x, ...args])
      )
    })
  }

  const test = (cells) => {
    for (let [x, y, ...args] of cells) {
      const cell = map.getCell(cx + x, cy + y)

      if (!filter(cell, ...args)) {
        return false
      }
    }

    return true
  }

  const gather = (cells) => cells.map(([x, y]) => map.getCell(cx + x, cy + y))

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

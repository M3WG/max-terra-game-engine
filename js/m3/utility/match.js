'use strict'

/**
 * Utility functions for matching cells.
 *
 * @namespace m3.utility.match
 */
m3.utility.match = {}

/**
 * Tests whether a target cell belongs to a shape and returns its constituent cells, if any.
 *
 * @param {m3.model.cell.prototype} cell
 * @param {object} shape
 * @param {mixed[]} shape.definition - Array of cells that belong to the shape
 * @param {number} shape.definition[][0] - Δx from `cell`
 * @param {number} shape.definition[][1] - Δy from `cell`
 * @param {...mixed} shape.definition[][...] - Additional arguments to pass to `filter` ()
 * @param {boolean} [shape.mirror=false] - Whether the shape mirrors horizontally and vertically
 * @param {boolean} [shape.rotate=false] - Whether the shape has 90°, 180°, and 270° rotations
 * @param {function} filter - Returns whether the tested cell belongs to the shape
 * @return {m3.model.cell.prototype[]|undefined}
 */
m3.utility.match.shape = (cell, {definition = [], mirror = false, rotate = false}, filter) => {
  const cx = cell.getX(),
    cy = cell.getY(),
    map = cell.getMap()

  if (typeof filter != 'function') {
    /*
     * XXX: Identity function. Will return first extant shape.
     */
    filter = m3.utility.fn.identity()
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

/**
 * Returns the first matching shape that `cell` belongs to.
 *
 * @param {m3.model.cell.prototype} cell
 * @param {mixed[]} shapes
 * @param {function} filter
 * @see m3.utility.match.shape
 */
m3.utility.match.shapes = (cell, shapes, filter) => {
  for (const shape of shapes) {
    const result = m3.utility.match.shape(cell, shape, filter)

    if (result) {
      return result
    }
  }
}

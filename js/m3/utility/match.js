'use strict'

m3.utility.match = (action) => {
  const center = action.cell,
    cx = 3,
    cy = 3,
    slice = center.map.createSlice(center.getX() - 3, center.getY() - 3, 7, 7)

  const is = (dx, dy, id) => {
    const cell = slice.getCell(cx + dx, cy + dy)

    if (!cell || cell.claim) {
      return false
    }

    return cell.tile.getId() == id
  }

  const evaluateTest = x => x.reduce((result, {dx, dy, tile}) => result && is(dx, dy, tile), true)
  const gatherTestCells = x => x.map(({dx, dy}) => slice.getCell(cx + dx, cy + dy))

  for (const claimType of m3.model.claimType.getAll()) {
    const shape = claimType.getShape()

    if (shape.rotate) {
      for (let rotations = 0; rotations < 4; rotations++) {
        if (shape.mirror) {
          for (let mirrors = 0; mirrors < 2; mirrors++) {
            for (const test of shape.test) {
              if (evaluateTest(test)) {
                return m3.model.claim.create({
                  cell: gatherTestCells(test),
                  type: claimType,
                })
              }
            }
            slice.flip()
          }
        } else {
          for (const test of shape.test) {
            if (evaluateTest(test)) {
              return m3.model.claim.create({
                cell: gatherTestCells(test),
                type: claimType,
              })
            }
          }
        }
        slice.rotate()
      }
    } else if (shape.mirror) {
      for (let mirrors = 0; mirrors < 2; mirrors++) {
        for (const test of shape.test) {
          if (evaluateTest(test)) {
            return m3.model.claim.create({
              cell: gatherTestCells(test),
              type: claimType,
            })
          }
        }
        slice.flip()
      }
    } else {
      for (const test of shape.test) {
        if (evaluateTest(test)) {
          return m3.model.claim.create({
            cell: gatherTestCells(test),
            type: claimType,
          })
        }
      }
    }
  }
}

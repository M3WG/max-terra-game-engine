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

    let rotations = shape.rotate ? 4 : 0
    do {
      let mirrors = shape.mirror ? 2 : 0
      do {
        for (const test of shape.test) {
          if (evaluateTest(test)) {
            return m3.model.claim.create({
              cell: gatherTestCells(test),
              type: claimType,
            })
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
}

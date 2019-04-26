'use strict'

m3.utility.match = (action) => {
  const actionTileId = action.tile.getId(),
    center = action.cell,
    slice = center.map.createSlice(center.getX() - 3, center.getY() - 3, 7, 7)

  const {x: cx, y: cy} = slice.getCellCoordinates(center)

  const is = (x, y, id) => {
    const cell = slice.getCell(x, y)

    if (!cell || cell.claim) {
      return false
    }

    return cell.tile.getId() == actionTileId
  }

  const gatherPermutation = cells => cells.map(({dx, dy}) => slice.getCell(cx + dx, cy + dy))
  const testPermutation = cells => cells.reduce((result, {dx, dy}) => result && is(cx + dx, cy + dy), true)

  // XXX: Simplest way to retrieve
  // TODO: Create easier way to derive claim type from tile id
  // TODO: Prevent water and special tiles from matching
  const claimType = ((id) => {
    const claimTypes = m3.model.claimType.getAll()

    for (const claimType of claimTypes) {
      if (claimType.getId() == id) {
        return claimType
      }
    }
  })(actionTileId);

  for (const shape of m3.config.shapes) {
    let rotations = shape.rotate ? 4 : 0
    do {
      let mirrors = shape.mirror ? 2 : 0
      do {
        for (const permutation of shape.permutation) {
          if (testPermutation(permutation)) {
            return {
              cell: gatherPermutation(permutation),
              type: claimType,
            }
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

'use strict'

m3.utility.match = {}

// TODO: Define shapes struct
// SEE: https://github.com/M3WG/m3-prototype/blob/3af76bb23434fb8feb5ae151e665c4e10eb0526c/js/m3/config/shapes.js
m3.utility.match.shape = (cell, shapes, filter) => {
  // XXX: Slice has hardcoded dimensions (7x7)
  // TODO: Make this configurable or automaticaLly derived from shapes
  const slice = center.map.createSlice(cell.getX() - 3, cell.getY() - 3, 7, 7),
    {x: cx, y: cy} = slice.getCellCoordinates(cell)

  if (typeof filter != 'function') {
    /*
     * XXX: Identity function. Will return first extant shape.
     * Try m3.utility.match.shape(cell, shapes, (x) => x.tile.getId() == cell.tile.getId())
     */
    filter = (x) => x
  }

  // TODO: buildPermutations() for DX so shapes only need one defined permutation (e.g. top-left)
  const gatherPermutation = cells => cells.map(({dx, dy}) => slice.getCell(cx + dx, cy + dy))
  const testPermutation = cells => cells.reduce((result, {dx, dy}) => result && filter(slice.getCell(cx + dx, cy + dy)), true)

  for (const shape of shapes) {
    let rotations = shape.rotate ? 4 : 0
    do {
      let mirrors = shape.mirror ? 2 : 0
      do {
        for (const permutation of shape.permutation) {
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
}

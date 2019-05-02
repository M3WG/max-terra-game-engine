'use strict'

m3.utility.action = {}

m3.utility.action.validate = (options) => {
  const cell = options.cell,
    cellTile = cell.tile,
    tile = options.tile

  if (!m3.model.cell.prototype.isPrototypeOf(cell)) {
    throw new Error('Please provide a cell')
  }

  if (!m3.model.tile.prototype.isPrototypeOf(tile)) {
    throw new Error('Please provide a tile')
  }

  if (cell.claim) {
    throw new Error('Cell is claimed')
  }

  if (cellTile.getId() == 2) {
    throw new Error('Cell contains water')
  }

  if (cellTile.getId() == tile.getId()) {
    throw new Error('Cell cannot be changed to itself')
  }

  return true
}

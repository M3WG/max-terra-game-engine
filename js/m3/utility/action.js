'use strict'

m3.utility.action = {}

m3.utility.action.validate = (options) => {
  const cell = options.cell

  if (!m3.model.cell.prototype.isPrototypeOf(cell)) {
    throw new Error('Please provide a cell')
  }

  if (cell.claim) {
    throw new Error('Cell is already claimed')
  }

  if (cell.tile.getId() == 2) {
    throw new Error('Cell contains water')
  }

  return true
}

'use strict'

m3.utility.match = (action) => {
  const actionTile = action.tile

  if (!actionTile.isMatchable()) {
    return
  }

  // XXX: Special case for single magic tile to tower
  // TODO: Make configurable the number of cells needed for match
  if (actionTile.getId() == 7) {
    return {
      cell: [action.cell],
      type: m3.model.claimType.get(6),
    }
  }

  const cells = m3.utility.adjacency.getSimilarCellsGreedy(action.cell, actionTile, (cell) => !cell.claim)

  if (cells.length > 3) {
    return {
      cell: cells,
      type: actionTile.getClaimType(),
    }
  }
}

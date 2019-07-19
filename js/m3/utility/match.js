'use strict'

m3.utility.match = (action, player) => {
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

  const canMatch = (cell) => !cell.claim || cell.claim && cell.claim.player == player
  const cells = m3.utility.adjacency.getSimilarCellsGreedy(action.cell, canMatch)

  if (cells.length > 3) {
    return {
      cell: cells,
      type: actionTile.getClaimType(),
    }
  }
}

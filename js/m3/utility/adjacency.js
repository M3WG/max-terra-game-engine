'use strict'

/**
 * Utility functions for selecting cells adjacent to a {@link m3.model.cell.prototype} instance.
 *
 * @namespace m3.utility.adjacency
 */
m3.utility.adjacency = {}

/**
 * Returns an array of cells adjacent to the specified cell.
 */
m3.utility.adjacency.getCells = (cell) => {
  const map = cell.getMap(),
    x = cell.getX(),
    y = cell.getY()

  return [
    cell,
    map.getCell(x + 1, y),
    map.getCell(x - 1, y),
    map.getCell(x, y + 1),
    map.getCell(x, y - 1),
  ].filter((cell) => m3.model.cell.is(cell))
}

/**
 * Returns an array of cells that are adjacent and similar to the specified cell.
 * Similarity requires they have the same tile.
 *
 * @param {m3.model.cell.prototype} cell
 * @todo Consider the meaning of similarity, whether we need an injectable filter function.
 */
m3.utility.adjacency.getSimilarCells = (cell) => m3.utility.adjacency.getCells(cell).filter((test) => test.getTile() == cell.getTile())

/**
 * Returns an array of all contiguous cells that are similar to the specified cell.
 * Imagine the magic wand tool from your favorite image editor.
 * In this case a single cell is considered contiguous.
 *
 * @param {m3.model.cell.prototype} cell
 * @param {function} filter
 */
m3.utility.adjacency.getSimilarCellsGreedy = (cell, filter) => {
  if (typeof filter != 'function') {
    filter = utility.fn.identity()
  }

  const select = m3.utility.adjacency.getSimilarCells

  const cells = select(cell).filter(filter),
    tested = []

  let more
  do {
    more = false

    cells.forEach((cell) => {
      if (tested.includes(cell)) {
        return
      }

      select(cell).forEach((cell) => {
        if (filter(cell) && !cells.includes(cell)) {
          cells.push(cell)
          more = true
        }
      })
    })
  } while (more)

  return cells
}

/**
 * Returns an array of all contiguous cells that are adjacent to the contiguous cells of the specified cell.
 *
 * @param {m3.model.cell.prototype} cell
 * @param {function} cellFilter - For {@link m3.utility.adjacency.getSimilarCellsGreedy}
 */
m3.utility.adjacency.getPaths = (cell, cellFilter) => {
  return m3.utility.adjacency.getSimilarCellsGreedy(cell, cellFilter).reduce((cells, cell) => {
    if (!cells.includes(cell)) {
      m3.utility.adjacency.getCells(cell).forEach((cell) => {
        if (cells.includes(cell)) {
          return
        }

        cells.push(...m3.utility.adjacency.getSimilarCellsGreedy(cell, cellFilter))
      })
    }

    return cells
  }, [])
}

/**
 * Returns an array of all cells that are contiguous and adjacent.
 * Be careful: this will slowly select the entire map without a filter.
 *
 * @param {m3.model.cell.prototype} cell
 * @param {function} cellFilter - For {@link m3.utility.adjacency.getSimilarCellsGreedy}
 */
m3.utility.adjacency.getPathsGreedy = (cell, cellFilter) => {
  const select = (cell) => m3.utility.adjacency.getPaths(cell, cellFilter)

  const cells = select(cell),
    tested = []

  let more
  do {
    more = false
    cells.forEach((cell) => {
      if (tested.includes(cell)) {
        return
      }

      select(cell, cellFilter).forEach((cell) => {
        if (!cells.includes(cell)) {
          cells.push(cell)
          more = true
        }
      })
    })
  } while (more)

  return cells
}

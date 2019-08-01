'use strict'

m3.utility.adjacency = {}

m3.utility.adjacency.getCells = (cell) => {
  const map = cell.map,
    x = cell.getX(),
    y = cell.getY();

  return [
    cell,
    map.getCell(x + 1, y),
    map.getCell(x - 1, y),
    map.getCell(x, y + 1),
    map.getCell(x, y - 1),
  ].filter((cell) => m3.model.cell.prototype.isPrototypeOf(cell))
}

m3.utility.adjacency.getSimilarCells = (cell) => m3.utility.adjacency.getCells(cell).filter((test) => test.tile == cell.tile)

m3.utility.adjacency.getSimilarCellsGreedy = (cell, filter) => {
  if (typeof filter != 'function') {
    filter = utility.fn.identity
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

// XXX: Be careful. This will slowly select the entire map without filters.
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

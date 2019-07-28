// XXX: Requires m3.utility.crawler
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
    filter = (x) => x
  }

  const cells = m3.utility.adjacency.getSimilarCells(cell).filter(filter),
    tested = []

  let more
  do {
    more = false

    cells.forEach((cell) => {
      if (tested.includes(cell)) {
        return
      }

      m3.utility.adjacency.getSimilarCells(cell).filter(filter).forEach((cell) => {
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

// XXX: Will select the entire map if not careful
// TODO: pathFilter parameter?
m3.utility.adjacency.getPathsGreedy = (cell, cellFilter) => {
  const cells = m3.utility.adjacency.getPaths(cell, cellFilter),
    tested = []

  let more
  do {
    more = false
    cells.forEach((cell) => {
      if (tested.includes(cell)) {
        return
      }

      m3.utility.adjacency.getPaths(cell, cellFilter).forEach((cell) => {
        if (!cells.includes(cell)) {
          cells.push(cell)
          more = true
        }
      })
    })
  } while (more)

  return cells
}

m3.utility.adjacency.getClaims = (target) => {
  if (!m3.model.cell.prototype.isPrototypeOf(target)) {
    if (m3.model.claim.prototype.isPrototypeOf(target)) {
      target = target.getCells()[0]
    } else {
      throw new Error('Please provide a valid target')
    }
  }

  // XXX: Hardcoded water
  // TODO: Make configurable, e.g. cell.tile.isTraversible()
  const cellFilter = (cell) => cell.claim || cell.tile.getId() == 2

  const getClaims = (claims, cell) => {
    const claim = cell.claim

    if (claim && !claims.includes(claim)) {
      claims.push(claim)
    }

    return claims
  }

  return m3.utility.adjacency.getPathsGreedy(target, cellFilter).reduce(getClaims, [])
}

m3.utility.adjacency.getClaimsGreedy = (target, claimFilter) => {
  if (typeof claimFilter != 'function') {
    claimFilter = (x) => x
  }

  const claims = m3.utility.adjacency.getClaims(target).filter(claimFilter),
    tested = []

  let more
  do {
    more = false
    claims.forEach((claim) => {
      if (tested.includes(claim)) {
        return
      }

      m3.utility.adjacency.getClaims(claim).filter(claimFilter).forEach((claim) => {
        if (!claims.includes(claim)) {
          claims.push(claim)
          more = true
        }
      })
    })
  } while (more)

  return claims
}

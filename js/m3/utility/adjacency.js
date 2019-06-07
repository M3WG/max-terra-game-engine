// XXX: Requires m3.utility.crawler
m3.utility.adjacency = {}

m3.utility.adjacency.getCells = (
  () => {
    const crawler = m3.utility.crawler.create()
    return (cell) => crawler.initializeWithCell(cell).getAdjacent()
  }
)()

m3.utility.adjacency.getSimilarCells = (
  () => {
    const crawler = m3.utility.crawler.create(),
      isSameType = (tile) => (cell) => cell.tile === tile

    return (cell, tile) => crawler.initializeWithCell(cell).getAdjacent().filter(isSameType(tile ? tile : cell.tile))
  }
)()

m3.utility.adjacency.getSimilarCellsGreedy = (cell, tile) => {
  const cells = m3.utility.adjacency.getSimilarCells(cell, tile),
    tested = []

  let more = true

  while (more) {
    more = false
    cells.forEach((cell) => {
      if (tested.includes(cell)) {
        return
      }

      m3.utility.adjacency.getSimilarCells(cell, tile).forEach((cell) => {
        if (!cells.includes(cell)) {
          cells.push(cell)
          more = true
        }
      })
    })
  }

  return cells
}

m3.utility.adjacency.getClaims = (target) => {
  const cells = [],
    initial = []

  if (m3.model.cell.prototype.isPrototypeOf(target)) {
    cells.push(target)
  } else if (m3.model.claim.prototype.isPrototypeOf(target)) {
    cells.push(...target.getCells())
    initial.push(target)
  } else if (Array.isArray(target)) {
    target.forEach((target) => {
      if (m3.model.cell.prototype.isPrototypeOf(target)) {
        cells.push(target)
      } else if (m3.model.claim.prototype.isPrototypeOf(target)) {
        cells.push(...target.getCells())
        initial.push(target)
      }
    })
  } else {
    throw new Error('Please provide a valid target')
  }

  return cells.reduce((claims, cell) => {
    m3.utility.adjacency.getCells(cell).forEach((test) => {
      if (test.claim && !claims.includes(test.claim)) {
        claims.push(test.claim)
      }
    })

    return claims
  }, initial)
}

m3.utility.adjacency.getClaimsGreedy = (target) => {
  const claims = m3.utility.adjacency.getClaims(target),
    tested = []

  let more = true

  while (more) {
    more = false
    claims.forEach((claim) => {
      if (tested.includes(claim)) {
        return
      }

      m3.utility.adjacency.getClaims(claim).forEach((claim) => {
        if (!claims.includes(claim)) {
          claims.push(claim)
          more = true
        }
      })
    })
  }

  return claims
}

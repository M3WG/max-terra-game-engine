// XXX: Requires m3.utility.crawler
m3.utility.adjacency = {}

m3.utility.adjacency.getCells = (
  () => {
    const crawler = m3.utility.crawler.create()
    return (cell) => crawler.initializeWithCell(cell).getAdjacent()
  }
)()

m3.utility.adjacency.getSimilarCells = (function IIFE() {
  const crawler = m3.utility.crawler.create(),
    isSameType = (tile) => (cell) => cell.tile === tile

  return (cell, tile) => crawler.initializeWithCell(cell).getAdjacent().filter(isSameType(tile ? tile : cell.tile))
})()

m3.utility.adjacency.getSimilarCellsGreedy = (cell, tile, filter) => {
  if (typeof filter != 'function') {
    filter = (x) => x
  }

  const cells = m3.utility.adjacency.getSimilarCells(cell, tile).filter(filter),
    tested = []

  let more
  do {
    more = false

    cells.forEach((cell) => {
      if (tested.includes(cell)) {
        return
      }

      m3.utility.adjacency.getSimilarCells(cell, tile).forEach((cell) => {
        if (filter(cell) && !cells.includes(cell)) {
          cells.push(cell)
          more = true
        }
      })
    })
  } while (more)

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

m3.utility.adjacency.getClaimsGreedy = (target, filter) => {
  if (typeof filter != 'function') {
    filter = (x) => x
  }

  const claims = m3.utility.adjacency.getClaims(target).filter(filter),
    tested = []

  let more
  do {
    more = false
    claims.forEach((claim) => {
      if (tested.includes(claim)) {
        return
      }

      m3.utility.adjacency.getClaims(claim).forEach((claim) => {
        if (filter(claim) && !claims.includes(claim)) {
          claims.push(claim)
          more = true
        }
      })
    })
  } while (more)

  return claims
}

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

// XXX: Traverses water
// XXX: Should we refactor so second parameter is an internal variable? (e.g. closure with a named function so it can call itself recursively)
m3.utility.adjacency.getClaims = (target, tested) => {
  tested = Array.isArray(tested) ? tested : []

  const cells = [],
    initial = []

  const isTested = (cell) => tested.includes(cell),
    isUntested = (...args) => !isTested(...args),
    setTested = (cell) => tested.push(cell)

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

  // XXX: Hardcoded water
  const traverseWater = (cell) => {
    if (cell.tile.getId() != 2) {
      return []
    }

    return m3.utility.adjacency.getClaims(
      m3.utility.adjacency.getSimilarCellsGreedy(cell).filter(isUntested),
      tested
    )
  }

  return cells.reduce((claims, cell) => {
    if (isTested(cell)) {
      return claims
    }

    setTested(cell)

    const pushClaim = (claim) => {
      if (claim && !claims.includes(claim)) {
        claims.push(claim)
      }
    }

    traverseWater(cell).forEach(pushClaim)

    m3.utility.adjacency.getCells(cell).forEach((cell) => {
      if (isTested(cell)) {
        return
      }

      setTested(cell)

      pushClaim(cell.claim)
      traverseWater(cell).forEach(pushClaim)
    })

    return claims
  }, initial)
}

m3.utility.adjacency.getClaimsGreedy = (target) => {
  if (typeof filter != 'function') {
    filter = (x) => x
  }

  const claims = m3.utility.adjacency.getClaims(target),
    tested = []

  let more
  do {
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
  } while (more)

  return claims
}

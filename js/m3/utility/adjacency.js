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

      m3.utility.adjacency.getSimilarCells(cell).forEach((cell) => {
        if (filter(cell) && !cells.includes(cell)) {
          cells.push(cell)
          more = true
        }
      })
    })
  } while (more)

  return cells
}

m3.utility.adjacency.getClaims = (function IIFE() {
  const tested = []

  const isTested = (cell) => tested.includes(cell),
    isUntested = (cell) => !tested.includes(cell),
    setTested = (cell) => tested.push(cell)

  const massageInput = (target) => {
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

    return {cells, initial};
  }

  // XXX: Hardcoded water
  // TODO: Make configurable, e.g. tile.isTraversable()
  const traverseWater = (cell) => {
    if (cell.tile.getId() != 2) {
      return []
    }

    return collect(
      m3.utility.adjacency.getSimilarCellsGreedy(cell).filter(isUntested)
    )
  }

  function collect(target) {
    const {cells, initial} = massageInput(target)

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

  return (target) => {
    tested.length = 0
    return collect(target)
  }
})()

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

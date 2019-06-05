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
      isSameType = (cell) => (test) => cell.type === test.type

    return (cell) => crawler.initializeWithCell(cell).getAdjacent().filter(isSameType(cell))
  }
)()

m3.utility.adjacency.getSimilarCellsGreedy = (cell) => {
  const cells = m3.utility.adjacency.getSimilarCells(cell),
    tested = []

  let more = true

  while (more) {
    more = false
    cells.forEach((cell) => {
      if (tested.includes(cell)) {
        return
      }

      m3.utility.adjacency.getSimilarCells(cell).forEach((cell) => {
        if (!cells.includes(cell)) {
          cells.push(cell)
          more = true
        }
      })
    })
  }

  return claims
}

m3.utility.adjacency.getClaims = (claim) => {
  if (!m3.model.claim.prototype.isPrototypeOf(claim)) {
    throw new Error('Please provide a valid claim')
  }

  return claim.getCells().reduce((claims, cell) => {
    m3.utility.adjacency.getCells(cell).forEach((test) => {
      if (test.claim && !claims.includes(test.claim)) {
        claims.push(test.claim)
      }
    })

    return claims
  }, [claim])
}

m3.utility.adjacency.getClaimsGreedy = (claim) => {
  const claims = m3.utility.adjacency.getClaims(claim),
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

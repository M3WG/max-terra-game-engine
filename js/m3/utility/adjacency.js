m3.utility.adjacency = {}

// TODO: Eventually return a linked-list hub-and-spoke type model (e.g. path)
m3.utility.adjacency.getClaims = (claim) => {
  const cells = claim.getCells(),
    claims = [claim]

  const pushAdjacencies = (cell) => {
    let count = 0

    const map = cell.map,
      x = cell.getX(),
      y = cell.getY()

    const tests = [
      map.getCell(x - 1, y),
      map.getCell(x + 1, y),
      map.getCell(x, y - 1),
      map.getCell(x, y + 1),
    ]

    tests.forEach((test) => {
      if (test.claim && !claims.includes(test.claim)) {
        claims.push(test.claim)
        count += 1
      }
    })

    return count
  }

  claim.getCells().forEach(pushAdjacencies)

  let more
  const testedClaims = []

  do {
    more = false

    claims.forEach((claim) => {
      if (testedClaims.includes(claim)) {
        return
      }

      const count = claim.getCells().reduce((count, cell) => {
        return count + pushAdjacencies(cell)
      }, 0)

      if (count > 0) {
        more = true
      }
    })

  } while (more)

  return claims
}

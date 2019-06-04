m3.utility.adjacency = {}

// TODO: Eventually return a linked-list hub-and-spoke type model (e.g. path)
m3.utility.adjacency.getClaims = (claim) => {
  if (!m3.model.claim.prototype.isPrototypeOf(claim)) {
    throw new Error('Please provide a valid claim')
  }

  const claims = [claim],
    crawler = m3.utility.crawler.create({
      cell: claim.getCells()[0],
    })

  const collectAdjacenctClaims = (claim) => {
    return claim.getCells().reduce((result, cell) => {
      crawler.setCell(cell)

      crawler.getAdjacent().forEach((test) => {
        if (test.claim && !claims.includes(test.claim)) {
          claims.push(test.claim)
          result = true
        }
      })

      return result
    }, false)
  }

  const testedClaims = []
  let more = true

  collectAdjacenctClaims(claim)

  while (more) {
    more = claims.reduce((result, claim) => {
      if (testedClaims.includes(claim)) {
        return result
      }

      return collectAdjacenctClaims(claim) || result
    }, false)
  }

  return claims
}

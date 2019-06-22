'use strict'

m3.utility.path = {}

m3.utility.path.magicWand = function (cell, filter) {
  return this.create({
    cell: m3.utility.adjacency.getSimilarCellsGreedy(cell, filter),
  })
}

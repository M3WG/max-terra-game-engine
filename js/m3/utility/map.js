'use strict'

m3.utility.map = {}

m3.utility.map.csvToData = function(csv) {
  // TODO: Convert CSV string to two-dimensional array
}

m3.utility.map.getPercentClaimed = (model) => {
  const cells = model.getCells(),
    isClaimed = (cell) => Boolean(cell.claim)

  return cells.filter(isClaimed).length / cells.length
}

m3.utility.map.import = function(model, data) {
  model.getCells().forEach(function setTile(cell) {
    const x = cell.getX(),
      y = cell.getY()

    cell.setTile(data[y][x])
  })
}

m3.utility.map.importCsv = function(model, csv) {
  const data = this.csvToData(csv)
  this.import(model, data)
}

m3.utility.map.randomize = function(model) {
  const tiles = utility.array.shuffle(
    m3.model.tile.getAll().reduce((tiles, tile) => [
      ...tiles,
      ...Array(tile.getRandomWeight()).fill(tile)
    ], [])
  )

  model.getCells().forEach((cell) => cell.setTile(
    utility.array.randomValue(tiles)
  ))
}

m3.utility.map.zero = function(model) {
  model.getCells().forEach(function setTile(cell) {
    cell.setTile(0)
  })
}

'use strict'

m3.utility.map = {}

m3.utility.map.csvToData = (csv) => {
  // TODO: Convert CSV string to two-dimensional array
}

m3.utility.map.getPercent = (model, filter) => {
  if (typeof filter != 'function') {
    filter = (x) => x
  }

  const cells = model.getCells()
  return cells.filter(filter).length / cells.length
}

m3.utility.map.import = (model, data) => {
  model.getCells().forEach((cell) => {
    const x = cell.getX(),
      y = cell.getY()

    cell.setTile(data[y][x])
  })
}

m3.utility.map.importCsv = (model, csv) => {
  const data = this.csvToData(csv)
  this.import(model, data)
}

m3.utility.map.randomize = (model) => {
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

m3.utility.map.zero = (model) => {
  model.getCells().forEach((cell) => {
    cell.setTile(0)
  })
}

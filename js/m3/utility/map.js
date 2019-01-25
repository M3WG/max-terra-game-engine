'use strict'

m3.utility.map = {}

m3.utility.map.csvToData = function(csv) {
  // TODO: Convert CSV string to two-dimensional array
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
  model.getCells().forEach(function setTile(cell) {
    const index = utility.array.randomValue(
      Object.keys(m3.config.tiles)
    )

    cell.setTile(index)
  })
}

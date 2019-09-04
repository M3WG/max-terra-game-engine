'use strict'

/**
 * Utilities for working with {@link m3.model.map} instances.
 *
 * @namespace m3.utility.map
 */
m3.utility.map = {}

/**
 * Fills the model's cells with the specified tile.
 */
m3.utility.map.fill = (model, tile) => {
  model.getCells().forEach((cell) => {
    cell.setTile(tile)
  })

  return this
}

/**
 * Returns the percentage of the model's cells that pass a filter function.
 */
m3.utility.map.getPercent = (model, filter) => {
  if (typeof filter != 'function') {
    filter = utility.fn.identity()
  }

  const cells = model.getCells()
  return cells.filter(filter).length / cells.length
}

/**
 * Imports a two-dimensional array of tiles into the model's cells.
 * Arrays must be in the format of `[y][x]`.
 */
m3.utility.map.import = (model, data) => {
  model.getCells().forEach((cell) => {
    const x = cell.getX(),
      y = cell.getY()

    cell.setTile(data[y][x])
  })
}

/**
 * Randomly fills the model's cells with tiles having a randomWeight property.
 * Higher weights equal higher probabilities to appear.
 */
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

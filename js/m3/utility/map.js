'use strict'

/**
 * Utilities for working with {@link m3.model.map.prototype} instances.
 *
 * @namespace m3.utility.map
 */
m3.utility.map = {}

/**
 * Fills the map's cells with the specified tile.
 *
 * @param {m3.model.map.prototype} map
 * @param {m3.model.tile.prototype} tile
 */
m3.utility.map.fill = (map, tile) => {
  map.getCells().forEach((cell) => {
    cell.setTile(tile)
  })

  return this
}

/**
 * Returns the percentage of the map's cells that pass a filter function.
 *
 * @param {m3.model.map.prototype} map
 * @param {function} filter
 */
m3.utility.map.getPercent = (map, filter) => {
  if (typeof filter != 'function') {
    filter = utility.fn.identity()
  }

  const cells = map.getCells()
  return cells.filter(filter).length / cells.length
}

/**
 * Imports a two-dimensional array of tiles into the map's cells.
 *
 * @param {m3.model.map.prototype} map
 * @param {m3.model.tile.prototype[][]} data - In the format of `[y][x]`
 */
m3.utility.map.import = (map, data) => {
  map.getCells().forEach((cell) => {
    const x = cell.getX(),
      y = cell.getY()

    cell.setTile(data[y][x])
  })
}

/**
 * Randomly fills the map's cells with tiles having a randomWeight property.
 * Higher weights equal higher probabilities to appear.
 *
 * @param {m3.model.map.prototype} map
 */
m3.utility.map.randomize = (map) => {
  const tiles = utility.array.shuffle(
    m3.model.tile.getAll().reduce((tiles, tile) => [
      ...tiles,
      ...Array(tile.getRandomWeight()).fill(tile)
    ], [])
  )

  map.getCells().forEach((cell) => cell.setTile(
    utility.array.randomValue(tiles)
  ))
}

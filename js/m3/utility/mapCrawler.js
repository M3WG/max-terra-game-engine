'use strict'

/**
 * Provides a natural language interface for navigating a map.
 *
 * @namespace m3.utility.mapCrawler
 */
m3.utility.mapCrawler = {}

/**
 * Creates an instance of {@link m3.utility.mapCrawler.prototype}.
 */
m3.utility.mapCrawler.create = function (...args) {
  return Object.create(this.prototype).initialize(...args)
}

/**
 * Prototype for the mapCrawler interface.
 */
m3.utility.mapCrawler.prototype = {
  getAdjacent: function () {
    return [
      this.getDown(),
      this.getLeft(),
      this.getRight(),
      this.getUp(),
    ].filter((cell) => m3.model.cell.is(cell))
  },
  getDown: function () {
    const x = this.getX(),
      y = this.getY() - 1

    return this.getMap().getCell(x, y)
  },
  getFirst: function (filter) {
    if (typeof filter != 'function') {
      filter = m3.utility.fn.identity()
    }

    const cells = this.getAdjacent()

    for (let cell in cells) {
      if (filter(cell)) {
        return cell
      }
    }
  },
  getLeft: function () {
    const x = this.getX() - 1,
      y = this.getY()

    return this.getMap().getCell(x, y)
  },
  getMap: function () {
    return this.map
  },
  getRight: function () {
    const x = this.getX() + 1,
      y = this.getY()

    return this.getMap().getCell(x, y)
  },
  getPriority: function (fn) {
    if (typeof fn != 'function') {
      filter = m3.utility.fn.identity()
    }

    const cells = this.getAdjacent()

    let resultCell,
      resultWeight = -Infinity

    for (let cell in cells) {
      const weight = fn(cell)

      if (weight > resultWeight) {
        resultCell = cell
        resultWeight = weight
      }
    }

    return resultCell
  },
  getUp: function () {
    const x = this.getX(),
      y = this.getY() + 1

    return this.getMap().getCell(x, y)
  },
  getX: function () {
    return this.x
  },
  getY: function () {
    return this.y
  },
  initialize: function ({cell, map, x, y}) {
    if (m3.model.cell.is(cell)) {
      return this.moveToCell(cell)
    }

    this.setMap(map)
    this.moveTo(x, y)

    return this
  },
  moveDown: function () {
    return this.setY(this.getY() + 1)
  },
  moveFirst: function (filter) {
    const cell = this.getFirst(filter)

    if (cell) {
      this.moveToCell(cell)
    }

    return this
  },
  moveLeft: function () {
    return this.setX(this.getX() - 1)
  },
  movePriority: function (fn) {
    const cell = this.getPriority(fn)

    if (cell) {
      this.moveToCell(cell)
    }

    return this
  },
  moveRight: function () {
    return this.setX(this.getX() + 1)
  },
  moveTo: function (x, y) {
    return this.setX(x).setY(y)
  },
  moveToCell: function (cell) {
    if (!m3.model.cell.is(cell)) {
      throw new Error('Please provide a valid cell')
    }

    return this
      .setMap(cell.getMap())
      .setX(cell.getX())
      .setY(cell.getY())
  },
  moveUp: function () {
    return this.setY(this.getY() - 1)
  },
  setMap: function (map) {
    if (!m3.model.map.is(map)) {
      throw new Error('Please provide a valid map')
    }

    this.map = map
    return this
  },
  setX: function (x) {
    this.x = Number(x) || 0
    return this
  },
  setY: function (y) {
    this.y = Number(y) || 0
    return this
  },
}

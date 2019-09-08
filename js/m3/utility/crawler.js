'use strict'

/**
 * Provides a natural language interface for navigating a map.
 *
 * @namespace m3.utility.crawler
 */
m3.utility.crawler = {}

/**
 * Creates an instance of {@link m3.utility.crawler.prototype}.
 */
m3.utility.crawler.create = function (...args) {
  return Object.create(this.prototype).initialize(...args)
}

/**
 * Prototype for the crawler interface.
 */
m3.utility.crawler.prototype = {
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
  getUp: function () {
    const x = this.getX(),
      y = this.getY() + 1

    return this.getMap().getCell(x, y)
  },
  getX: function () {
    return this.x;
  },
  getY: function () {
    return this.y;
  },
  initialize: function ({cell, map, x, y}) {
    if (m3.model.cell.is(cell)) {
      return this
        .setMap(cell.getMap())
        .moveTo(cell.getX(), cell.getY())
    }

    this.setMap(map)
    this.moveTo(x, y)

    return this
  },
  moveDown: function () {
    return this.setY(this.getY() + 1)
  },
  moveLeft: function () {
    return this.setX(this.getX() - 1)
  },
  moveRight: function () {
    return this.setX(this.getX() + 1)
  },
  moveTo: function (x, y) {
    return this.setX(x).setY(y)
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

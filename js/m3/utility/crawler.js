'use strict'

m3.utility.crawler = {}

m3.utility.crawler.create = (...args) => Object.create(m3.utility.crawler.prototype).create(...args)

m3.utility.crawler.prototype = (
  (undefined) => {

    function create({cell, map, x, y}) {
      if (m3.model.cell.is(cell)) {
        return this.initializeWithCell(cell)
      }

      if (map) {
        this.setMap(map)
      }

      this.moveTo(x, y)

      return this
    }

    function destruct() {
      return this
    }

    function getAdjacent() {
      return [
        this.getDown(),
        this.getLeft(),
        this.getRight(),
        this.getUp(),
      ].filter((cell) => m3.model.cell.is(cell))
    }

    function getDown() {
      const x = this.getX(),
        y = this.getY() - 1

      return this.map.getCell(x, y)
    }

    function getLeft() {
      const x = this.getX() - 1,
        y = this.getY()

      return this.map.getCell(x, y)
    }

    function getRight() {
      const x = this.getX() + 1,
        y = this.getY()

      return this.map.getCell(x, y)
    }

    function getUp() {
      const x = this.getX(),
        y = this.getY() + 1

      return this.map.getCell(x, y)
    }

    function getX() {
      return this._x;
    }

    function getY() {
      return this._y;
    }

    function initializeWithCell(cell) {
      if (!m3.model.cell.is(cell)) {
        throw new Error('Please provide a valid cell')
      }

      return this
        .setMap(cell.getMap())
        .moveTo(cell.getX(), cell.getY())
    }

    function moveDown() {
      return this.setY(this.getY() + 1)
    }

    function moveLeft() {
      return this.setX(this.getX() - 1)
    }

    function moveRight() {
      return this.setX(this.getX() + 1)
    }

    function moveTo(x, y) {
      return this.setX(x).setY(y)
    }

    function moveUp() {
      return this.setY(this.getY() - 1)
    }

    function setMap(map) {
      if (!m3.model.map.is(map)) {
        throw new Error('Please provide a valid map')
      }

      this.map = map

      return this
    }

    function setX(x) {
      this._x = Number(x) || 0

      return this
    }

    function setY(y) {
      this._y = Number(y) || 0

      return this
    }

    return {
      create,
      destruct,
      getAdjacent,
      getDown,
      getLeft,
      getRight,
      getUp,
      getX,
      getY,
      initializeWithCell,
      moveDown,
      moveLeft,
      moveRight,
      moveTo,
      moveUp,
      setMap,
      setX,
      setY,
    }
  }
)()

'use strict'

m3.utility.crawler = {}

m3.utility.crawler.create = (...args) => Object.create(m3.utility.crawler.prototype).construct(...args)

m3.utility.crawler.prototype = (
  (undefined) => {

    function construct(options) {
      if (m3.model.cell.prototype.isPrototypeOf(options.cell)) {
        return this.initializeWithCell(options.cell)
      }

      return this
        .setMap(options.map)
        .moveTo(options.x, options.y)
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
      ].filter((cell) => m3.model.cell.prototype.isPrototypeOf(cell))
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
      if (!m3.model.cell.prototype.isPrototypeOf(cell)) {
        throw new Error('Please provide a valid cell')
      }

      return this
        .setMap(cell.map)
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
      if (!m3.model.map.prototype.isPrototypeOf(map)) {
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
      construct,
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

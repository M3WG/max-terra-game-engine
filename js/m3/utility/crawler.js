'use strict'

m3.utility.crawler = {}

m3.utility.crawler.create = (...args) => Object.create(m3.utility.crawler.prototype).construct(...args)

m3.utility.crawler.prototype = (
  (undefined) => {

    function construct(options) {
      if (m3.model.cell.prototype.isPrototypeOf(options.cell)) {
        return this.setCell(options.cell)
      }

      return this.setMap(options.map)
        .setX(options.x)
        .setY(options.y)
    }

    function destruct() {
      return this
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

    function goDown() {
      return this.setY(this.getY() + 1)
    }

    function goLeft() {
      return this.setX(this.getX() - 1)
    }

    function goRight() {
      return this.setX(this.getX() + 1)
    }

    function goUp() {
      return this.setY(this.getY() - 1)
    }

    function setCoordinates(x, y) {
      return this.setX(x).setY(y)
    }

    function setCell(cell) {
      if (!m3.model.cell.prototype.isPrototypeOf(cell)) {
        throw new Error('Please provide a valid cell')
      }

      return this.setMap(cell.map)
        .setX(cell.getX())
        .setY(cell.getY())
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
      getDown,
      getLeft,
      getRight,
      getUp,
      getX,
      getY,
      goDown,
      goLeft,
      goRight,
      goUp,
      setCell,
      setCoordinates,
      setMap,
      setX,
      setY,
    }
  }
)()

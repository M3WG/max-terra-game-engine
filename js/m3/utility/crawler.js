'use strict'

m3.utility.crawler = {}

m3.utility.crawler.create = (...args) => Object.create(utility.crawler.prototype).construct(...args)

m3.utility.crawler.prototype = (
  (undefined) => {

    function construct(options) {
      this.setMap(options.map)
      this.setCell(options.cell)

      return this
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
      if (this.cell) {
        return this.cell.getX()
      }
    }

    function getY() {
      if (this.cell) {
        return this.cell.getY()
      }
    }

    function goDown() {
      return this.setCell(
        this.getDown()
      )
    }

    function goLeft() {
      return this.setCell(
        this.getLeft()
      )
    }

    function goRight() {
      return this.setCell(
        this.getRight()
      )
    }

    function goUp() {
      return this.setCell(
        this.getUp()
      )
    }

    function setCell(cell) {
      if (m3.model.cell.prototype.isPrototypeOf(cell)) {
        this.cell = cell
      }

      return this
    }

    function setMap(cell) {
      if (m3.model.map.prototype.isPrototypeOf(cell)) {
        this.map = map
      }

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
      setMap,
    }
  }
)()

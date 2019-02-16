'use strict'

m3.model.map = {}

m3.model.map.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.map.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _createCells.call(this)

      return this
    }

    function destruct() {
      return this
    }

    function getCell(x, y) {
      return this.cell[y][x]
    }

    function getCells() {
      return this.cell.reduce(function reduceCells(cells, row) {
        cells.push(...row)
        return cells
      }, [])
    }

    function getHeight() {
      return this.config.height
    }

    function getWidth() {
      return this.config.width
    }

    function _createCells() {
      const height = this.config.height,
        width = this.config.width

      this.cell = []

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!this.cell[y]) {
            this.cell[y] = []
          }

          this.cell[y][x] = m3.model.cell.create({
            map: this,
            x,
            y,
          })
        }
      }
    }

    // Game
    // Archetype?

    return Object.setPrototypeOf({
      construct,
      destruct,
      getCell,
      getCells,
      getHeight,
      getWidth,
    }, _prototype)
  }
)()

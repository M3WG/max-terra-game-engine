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

      const height = this.config.height,
        width = this.config.width

      this.cell = []
      this.height = height
      this.width = width

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!this.cell[y]) {
            this.cell[y] = []
          }

          this.cell[y][x] = m3.model.cell.create({
            x,
            y,
          })
        }
      }

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
      return this.height
    }

    function getWidth() {
      return this.width
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

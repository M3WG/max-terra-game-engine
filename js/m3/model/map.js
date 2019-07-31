'use strict'

m3.model.map = m3.utility.model.inventFactory(
  ((undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.cell = _createCells.call(this)

      return this
    }

    function createSlice(x, y, height, width) {
      return m3.model.mapSlice.create({
        height,
        map: this,
        width,
        x,
        y,
      })
    }

    function getCell(x, y) {
      if (this.cell[y]) {
        return this.cell[y][x]
      }
    }

    function getCells() {
      return this.cell.reduce((cells, row) => {
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
      const cells = [],
        height = this.config.height,
        width = this.config.width

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!cells[y]) {
            cells[y] = []
          }

          cells[y][x] = m3.model.cell.create({
            map: this,
            x,
            y,
          })
        }
      }

      return cells
    }

    // Game
    // Archetype?

    return {
      construct,
      createSlice,
      getCell,
      getCells,
      getHeight,
      getWidth,
    }
  })()
)

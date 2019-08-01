'use strict'

m3.model.map = m3.utility.model.inventFactory(
  ((undefined) => {

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
      return this.data.height
    }

    function getWidth() {
      return this.data.width
    }

    function _createCells() {
      const cells = [],
        height = this.data.height,
        width = this.data.width

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

    function setup() {
      this.cell = _createCells.call(this)

      return this
    }

    function teardown() {
      this.cell.forEach((cell) => cell.destroy())

      return this
    }

    return {
      createSlice,
      getCell,
      getCells,
      getHeight,
      getWidth,
      setup,
      teardown,
    }
  })()
)

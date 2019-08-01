'use strict'

// TODO: Document internal data struct
m3.model.map = m3.utility.model.inventFactory({
  createSlice: function (x, y, height, width) {
    return m3.model.mapSlice.create({
      height,
      map: this,
      width,
      x,
      y,
    })
  },
  getCell: function (x, y) {
    if (this.cell[y]) {
      return this.cell[y][x]
    }
  },
  getCells: function () {
    return this.cell.reduce((cells, row) => {
      cells.push(...row)
      return cells
    }, [])
  },
  getHeight: function () {
    return this.data.height
  },
  getWidth: function () {
    return this.data.width
  },
  setup: function () {
    this.cell = []

    const height = this.data.height,
      width = this.data.width

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

    return this
  },
  teardown: function () {
    this.cell.forEach((cell) => cell.destroy())

    return this
  }
})

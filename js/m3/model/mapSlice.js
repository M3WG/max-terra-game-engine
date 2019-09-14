'use strict'

// TODO: Document internal data struct
// TODO: Refactor away the need for private functions
m3.model.mapSlice = m3.utility.model.inventFactory((() => {
  function _getCells(data) {
    const cells = [],
      height = data.height,
      map = data.map,
      originX = data.x,
      originY = data.y,
      width = data.width

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = map.getCell(x + originX, y + originY)

        if (!cells[y]) {
          cells[y] = []
        }

        cells[y][x] = cell
      }
    }

    return cells
  }

  function _sanitizeData(data) {
    const map = data.map,
      mapHeight = map.getHeight(),
      mapWidth = map.getWidth()

    if (data.height < 0) {
      data.height = Math.abs(data.height)
    }

    if (data.width < 0) {
      data.width = Math.abs(data.width)
    }

    if (data.x < 0) {
      data.width += data.x
      data.x = 0
    }

    if (data.x >= mapWidth) {
      // XXX: Selects nothing
      data.width = 0
      data.x = 0
    }

    if (data.x + data.width >= mapWidth) {
      data.width -= data.x + data.width - mapWidth
    }

    if (data.y < 0) {
      data.height += data.y
      data.y = 0
    }

    if (data.y >= mapHeight) {
      // XXX: Selects nothing
      data.height = 0
      data.y = 0
    }

    if (data.y + data.height >= mapHeight) {
      data.height -= data.y + data.height - mapHeight
    }
  }

  return {
    flip: function () {
      this.cell = utility.matrix.flip(this.cell)
      return this
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
    getCellCoordinates: function (cell) {
      return {
        x: cell.getX() - this.data.x,
        y: cell.getY() - this.data.y,
      }
    },
    getHeight: function () {
      return this.data.height
    },
    getWidth: function () {
      return this.data.width
    },
    getX: function () {
      return this.data.x
    },
    getY: function () {
      return this.data.y
    },
    rotate: function () {
      this.cell = utility.matrix.rotate90(this.cell)
      return this
    },
    setup: function () {
      _sanitizeData(this.data)

      this.cell = _getCells(this.data)
      this.map = this.data.map

      return this
    },
    teardown: function () {
      this.cell = undefined
      this.map = undefined

      return this
    },
  }
})())

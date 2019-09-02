'use strict'

// TODO: Document internal data struct
// TODO: Refactor away the need for private functions
m3.model.mapSlice = m3.utility.model.inventFactory((() => {
  function _getCells(config) {
    const cells = [],
      height = config.height,
      map = config.map,
      originX = config.x,
      originY = config.y,
      width = config.width

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

  function _sanitizeConfig(config) {
    const map = config.map,
      mapHeight = map.getHeight(),
      mapWidth = map.getWidth()

    if (config.height < 0) {
      config.height = Math.abs(config.height)
    }

    if (config.width < 0) {
      config.width = Math.abs(config.width)
    }

    if (config.x < 0) {
      config.width += config.x
      config.x = 0
    }

    if (config.x >= mapWidth) {
      // XXX: Selects nothing
      config.width = 0
      config.x = 0
    }

    if (config.x + config.width >= mapWidth) {
      config.width -= config.x + config.width - mapWidth
    }

    if (config.y < 0) {
      config.height += config.y
      config.y = 0
    }

    if (config.y >= mapHeight) {
      // XXX: Selects nothing
      config.height = 0
      config.y = 0
    }

    if (config.y + config.height >= mapHeight) {
      config.height -= config.y + config.height - mapHeight
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
      _sanitizeConfig(this.data)

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

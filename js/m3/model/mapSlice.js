'use strict'

m3.model.mapSlice = m3.utility.model.inventFactory(
  ((undefined) => {

    function flip() {
      this.cell = utility.matrix.flip(this.cell)
      return this
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

    function getCellCoordinates(cell) {
      return {
        x: cell.getX() - this.data.x,
        y: cell.getY() - this.data.y,
      }
    }

    function getHeight() {
      return this.data.height
    }

    function getWidth() {
      return this.data.width
    }

    function getX() {
      return this.data.x
    }

    function getY() {
      return this.data.y
    }

    function rotate() {
      this.cell = utility.matrix.rotate90(this.cell)
      return this
    }

    function setup() {
      _sanitizeConfig(this.data)

      this.cell = _getCells(this.data)
      this.map = this.data.map

      return this
    }

    function teardown() {
      this.cell = undefined
      this.map = undefined

      return this
    }

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
        config.width = 1
        config.x = mapWidth - 1
      }

      if (config.x + config.width >= mapWidth) {
        config.width -= config.x + config.width - mapWidth
      }

      if (config.y >= mapHeight) {
        config.height = 1
        config.y = mapHeight - 1
      }

      if (config.y + config.height >= mapHeight) {
        config.height -= config.y + config.height - mapHeight
      }
    }

    return {
      flip,
      getCell,
      getCellCoordinates,
      getCells,
      getHeight,
      getWidth,
      getX,
      getY,
      rotate,
      setup,
      teardown,
    }
  })()
)

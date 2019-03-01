'use strict'

m3.model.mapSlice = {}

m3.model.mapSlice.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.mapSlice.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _sanitizeConfig(this.config)

      this.cell = _getCells(this.config)
      this.map = this.config.map

      return this
    }

    function destruct() {
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

    function getHeight() {
      return this.config.height
    }

    function getWidth() {
      return this.config.width
    }

    function getX() {
      return this.config.x
    }

    function getY() {
      return this.config.y
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
          if (!cells[y]) {
            cells[y] = []
          }

          cells[y][x] = map.getCell(x + originX, y + originY)
        }
      }

      return cells
    }

    function _sanitizeConfig(config) {
      // FIXME
      return
      const map = config.map,
        mapHeight = map.getHeight(),
        mapWidth = map.getWidth()

      if (config.height < 0) {
        config.height = Math.abs(config.height)
        config.y -= config.height
      }

      if (config.width < 0) {
        config.width = Math.abs(config.width)
        config.x -= config.width
      }

      const rawX = config.x,
        rawY = config.y

      config.x = Math.max(0, Math.min(config.x, mapWidth - 1))
      config.y = Math.max(0, Math.min(config.y, mapHeight - 1))

      if (config.x != rawX) {
        config.width = Math.abs(config.x - rawX)
      }

      if (config.y != rawY) {
        config.height = Math.abs(config.y - rawY)
      }

      if (config.x + config.width >= mapWidth) {
        config.width -= config.x + config.width - mapWidth + 1
      }

      if (config.y + config.height >= mapHeight) {
        config.height -= config.y + config.height - mapHeight + 1
      }
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      getCell,
      getCells,
      getHeight,
      getWidth,
      getX,
      getY,
    }, _prototype)
  }
)()

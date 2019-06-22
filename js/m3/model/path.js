'use strict'

m3.model.path = {}

m3.model.path.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      if (!Array.isArray(this.config.cell)) {
        this.config.cell = []
      }

      return this
    }

    function destruct() {
      return this
    }

    function combine(...paths) {
      if (!m3.model.path.prototype.isPrototypeOf(path)) {
        return this
      }

      return m3.model.path.create({
        cell: paths.reduce((cells, path) => [
          ...cells,
          ...path.getCells()
        ], this.getCells()),
      })
    }

    function getCells() {
      return utility.array.copy(this.config.cell)
    }

    function getSize() {
      return this.config.cell.length
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      combine,
      getCells,
      getSize,
    }, _prototype)
  }
)()

m3.model.path.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

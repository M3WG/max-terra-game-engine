'use strict'

m3.model.cell = {}

m3.model.cell.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.cell.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    function getX() {
      return this.config.x
    }

    function getY() {
      return this.config.y
    }

    // Tile
    // Claim

    return {
      construct,
      destruct,
      getX,
      getY,
    }
  }
)()

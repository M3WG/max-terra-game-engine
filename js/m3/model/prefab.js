'use strict'

m3.model.prefab = {}

m3.model.prefab.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.prefab.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    // Tile[][]

    return {
      construct,
      destruct,
    }
  }
)()

'use strict'

m3.model.tile = {}

m3.model.tile.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.tile.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    // id
    // color

    return {
      construct,
      destruct,
    }
  }
)()

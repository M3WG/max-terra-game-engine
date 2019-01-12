'use strict'

m3.model.claim = {}

m3.model.claim.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.claim.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    // Player
    // Tile[]
    // Claim type?

    return {
      construct,
      destruct,
    }
  }
)()

'use strict'

m3.model.hand = {}

m3.model.hand.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.hand.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    // Player
    // Prefab[]

    return {
      construct,
      destruct,
    }
  }
)()

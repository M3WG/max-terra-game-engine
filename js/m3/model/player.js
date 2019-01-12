'use strict'

m3.model.player = {}

m3.model.player.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.player.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    // User
    // color

    return {
      construct,
      destruct,
    }
  }
)()

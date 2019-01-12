'use strict'

m3.model.path = {}

m3.model.path.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.path.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    // Cell[]

    return {
      construct,
      destruct,
    }
  }
)()

'use strict'

m3.model.user = {}

m3.model.user.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.user.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    return {
      construct,
      destruct,
    }
  }
)()

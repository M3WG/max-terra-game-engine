'use strict'

m3.model.bank = {}

m3.model.bank.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.bank.prototype = (
  function prototypeIIFE(undefined) {

    function construct() {
      return this
    }

    function destruct() {
      return this
    }

    // Prefab[]
    // Player / User

    return {
      construct,
      destruct,
    }
  }
)()

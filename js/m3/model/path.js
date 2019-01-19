'use strict'

m3.model.path = {}

m3.model.path.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.path.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct() {
      _prototype.construct.apply(this, arguments)

      return this
    }

    function destruct() {
      return this
    }

    // Cell[]

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

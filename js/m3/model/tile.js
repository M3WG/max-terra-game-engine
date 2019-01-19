'use strict'

m3.model.tile = {}

m3.model.tile.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.tile.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct() {
      _prototype.construct.apply(this, arguments)

      return this
    }

    function destruct() {
      return this
    }

    // id
    // color

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

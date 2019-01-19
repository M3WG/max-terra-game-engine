'use strict'

m3.model.prefab = {}

m3.model.prefab.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.prefab.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct() {
      _prototype.construct.apply(this, arguments)

      return this
    }

    function destruct() {
      return this
    }

    // Tile[][]

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

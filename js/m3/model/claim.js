'use strict'

m3.model.claim = {}

m3.model.claim.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.claim.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      return this
    }

    function destruct() {
      return this
    }

    // Player
    // Tile[]
    // Claim type?

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

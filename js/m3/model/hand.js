'use strict'

m3.model.hand = {}

m3.model.hand.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      return this
    }

    function destruct() {
      return this
    }

    // Player
    // Prefab[]

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

m3.model.hand.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

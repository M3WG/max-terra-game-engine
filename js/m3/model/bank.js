'use strict'

m3.model.bank = {}

m3.model.bank.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      return this
    }

    function destruct() {
      return this
    }

    // Prefab[]
    // Player / User

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

m3.model.bank.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

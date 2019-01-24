'use strict'

m3.model.user = {}

m3.model.user.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.user.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(options) {
      _prototype.construct.call(this)

      return this
    }

    function destruct() {
      return this
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

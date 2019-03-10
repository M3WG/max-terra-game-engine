'use strict'

m3.model.claimType = {}

m3.model.claimType.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      return this
    }

    function destruct() {
      return this
    }

    function getPriority() {
      return this.config.priority
    }

    function getShape() {
      return this.config.shape
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      getPriority,
      getShape,
    }, _prototype)
  }
)()

m3.model.claimType.create = function (...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.claimType.get = function (id) {
  if (this.prototype.isPrototypeOf(id)) {
    return id
  }

  if (this.store.has(id)) {
    return this.store.get(id)
  }

  const config = m3.config.claimTypes[id]
  config.id = id

  const instance = this.create(config)
  this.store.set(id, instance)
  return instance
}

m3.model.claimType.getAll = function () {
  return Object.entries(m3.config.claimTypes)
    .map(([id]) => this.get(id))
}

m3.model.claimType.store = new Map()

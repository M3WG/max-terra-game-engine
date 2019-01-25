'use strict'

m3.model.tile = {}

m3.model.tile.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.tile.createWithId = function(id) {
  if (this.prototype.isPrototypeOf(id)) {
    return id
  }

  if (this.store.has(id)) {
    return this.store.get(id)
  }

  const config = m3.config.tiles[id]
  config.id = id

  const instance = this.create(config)
  this.store.set(id, instance)
  return instance
}

m3.model.tile.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(options) {
      _prototype.construct.call(this)

      return this
    }

    function destruct() {
      return this
    }

    function  getColor() {
      return this.config.color
    }

    // id
    // color

    return Object.setPrototypeOf({
      construct,
      destruct,
      getColor,
    }, _prototype)
  }
)()

m3.model.tile.store = new Map()

'use strict'

m3.model.tile = {}

m3.model.tile.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      return this
    }

    function destruct() {
      return this
    }

    function getClaimType() {
      return m3.model.claimType.get(this.config.claimType)
    }

    function getColor() {
      return this.config.color
    }

    function getIcon() {
      return this.config.icon
    }

    function getName() {
      return this.config.desc
    }

    function getRandomWeight() {
      return this.config.randomWeight
    }

    function isMatchable() {
      return Boolean(this.config.matchable)
    }

    // id
    // color

    return Object.setPrototypeOf({
      construct,
      destruct,
      getClaimType,
      getColor,
      getIcon,
      getName,
      getRandomWeight,
      isMatchable,
    }, _prototype)
  }
)()

m3.model.tile.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.tile.get = function (id) {
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

m3.model.tile.getAll = function () {
  return Object.entries(m3.config.tiles)
    .map(([id]) => this.get(id))
}

m3.model.tile.store = new Map()

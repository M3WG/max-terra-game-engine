'use strict'

// TODO: Document internal data struct
m3.model.tile = m3.utility.model.inventFactory({
  getClaimType: function () {
    return m3.model.claimType.get(this.data.claimType)
  },
  getColor: function () {
    return this.data.color
  },
  getIcon: function () {
    return this.data.icon
  },
  getName: function () {
    return this.data.desc
  },
  getRandomWeight: function () {
    return this.data.randomWeight
  },
  isMatchable: function () {
    return Boolean(this.data.matchable)
  },
  isPlaceableInFog: function () {
    return Boolean(this.data.placeableInFog)
  },
  isPlaceableInWater: function () {
    return Boolean(this.data.placeableInWater)
  },
}, {
  get: function (id) {
    if (this.is(id)) {
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
  },
  getAll: function () {
    return Object.entries(m3.config.tiles)
      .map(([id]) => this.get(id))
  },
  store: new Map(),
})

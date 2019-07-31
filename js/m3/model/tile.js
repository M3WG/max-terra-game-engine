'use strict'

m3.model.tile = m3.utility.model.inventFactory(
  ((undefined) => {
    const _prototype = m3.model.base.prototype

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

    function isPlaceableInFog() {
      return Boolean(this.config.placeableInFog)
    }

    function isPlaceableInWater() {
      return Boolean(this.config.placeableInWater)
    }

    return {
      getClaimType,
      getColor,
      getIcon,
      getName,
      getRandomWeight,
      isMatchable,
      isPlaceableInFog,
      isPlaceableInWater,
    }
  })(), {
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
  }
)

'use strict'

m3.model.tile = m3.utility.model.inventFactory(
  ((undefined) => {

    function getClaimType() {
      return m3.model.claimType.get(this.data.claimType)
    }

    function getColor() {
      return this.data.color
    }

    function getIcon() {
      return this.data.icon
    }

    function getName() {
      return this.data.desc
    }

    function getRandomWeight() {
      return this.data.randomWeight
    }

    function isMatchable() {
      return Boolean(this.data.matchable)
    }

    function isPlaceableInFog() {
      return Boolean(this.data.placeableInFog)
    }

    function isPlaceableInWater() {
      return Boolean(this.data.placeableInWater)
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

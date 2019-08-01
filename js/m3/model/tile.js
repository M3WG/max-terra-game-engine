'use strict'

// TODO: Document internal data struct
m3.model.tile = m3.utility.model.inventSingletonFactory({
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
})

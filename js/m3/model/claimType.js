'use strict'

m3.model.claimType = m3.utility.model.inventSingletonFactory({
  getLineOfSight: function () {
    return this.data.lineOfSight;
  },
  getMultiplier: function () {
    return Number(this.data.multiplier)
  },
  getPriority: function () {
    return this.data.priority
  },
  getScore: function () {
    return this.data.score
  },
})

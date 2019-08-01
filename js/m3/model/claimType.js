'use strict'

m3.model.claimType = m3.utility.model.inventFactory({
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
}, {
  get: function (id) {
    if (this.is(id)) {
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
  },
  getAll: function () {
    return Object.entries(m3.config.claimTypes)
      .map(([id]) => this.get(id))
  },
  store: new Map(),
})

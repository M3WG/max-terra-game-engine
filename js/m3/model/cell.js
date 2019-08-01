'use strict'

// TODO: Document internal data struct
// TODO: Move claim and fog management to game controller
m3.model.cell = m3.utility.model.inventFactory({
  getFog: function () {
    return this.data.fog
  },
  getX: function () {
    return this.data.x
  },
  getY: function () {
    return this.data.y
  },
  setClaim: function (claim) {
    if (m3.model.claim.prototype.isPrototypeOf(claim)) {
      this.claim = claim
      this.emit('change')
    }

    return this
  },
  setFog: function (state) {
    this.data.fog = Boolean(state)
    this.emit('change')
    return this
  },
  setTile: function (id) {
    this.tile = m3.model.tile.get(id)
    this.emit('change')
    return this
  },
  setup: function () {
    this.map = this.data.map
    this.data.fog = true

    return this
  },
  teardown: function () {
    this.map = undefined

    return this
  },
})

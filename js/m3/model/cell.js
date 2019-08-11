'use strict'

// TODO: Document internal data struct
// TODO: Move claim and fog management to game controller
m3.model.cell = m3.utility.model.inventFactory({
  getMap: function() {
    return this.data.map
  },
  getTile: function() {
    return this.data.tile
  },
  getX: function () {
    return this.data.x
  },
  getY: function () {
    return this.data.y
  },
  setClaim: function (claim) {
    if (m3.model.claim.is(claim)) {
      this.claim = claim
      this.emit('change')
    }

    return this
  },
  setTile: function (id) {
    this.data.tile = m3.model.tile.get(id)
    this.emit('change')
    return this
  },
})

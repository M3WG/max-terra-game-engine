'use strict'

// TODO: Document internal data struct
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
  setTile: function (tile) {
    if (m3.model.tile.is(tile)) {
      this.set('tile', tile)
    }

    return this
  },
})

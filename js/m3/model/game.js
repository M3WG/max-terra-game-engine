'use strict'

// TODO: Document internal data struct
m3.model.game = m3.utility.model.inventFactory({
  getPlayer: function (index) {
    return this.data.player[index]
  },
  getPlayerCount: function () {
    return this.data.player.length
  },
  getPlayers: function () {
    return utility.array.copy(this.data.player)
  },
}, {
  defaults: {
    player: [],
  },
})

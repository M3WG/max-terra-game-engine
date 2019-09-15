'use strict'

// TODO: Document internal data struct
m3.model.game = m3.utility.model.inventFactory({
  getPlayer: function (index) {
    return this.data.players[index]
  },
  getPlayerCount: function () {
    return this.data.players.length
  },
  getPlayers: function () {
    return utility.array.copy(this.data.players)
  },
  validators: {
    players: (values) => {
      values = utility.array.copy(values)

      values.forEach((value) => {
        if (!m3.model.player.is(value)) {
          throw new Error('Please provide a valid player')
        }
      })

      return values
    },
  },
})

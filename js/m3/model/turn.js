'use strict'

// TODO: Document internal data struct
m3.model.turn = m3.utility.model.inventFactory({
  getPlayer: function () {
    return this.data.player
  },
  validators: {
    player: (value) => {
      if (!m3.model.player.is(value)) {
        throw new Error('Please provide a valid player')
      }

      return value
    }
  }
})

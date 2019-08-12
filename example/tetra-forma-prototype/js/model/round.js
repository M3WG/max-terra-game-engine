'use strict'

m3.model.round = m3.utility.model.inventFactory({
  createTurn: function (options) {
    const turn = m3.model.turn.create(options)

    this.data.turn.push(turn)
    this.emit('change')

    return turn
  },
  getCurrentTurn: function () {
    return this.data.turn[this.data.turn.length - 1]
  },
  getTurnCount: function () {
    return this.data.turn.length
  },
}, {
  defaults: {
    turn: [],
  },
})

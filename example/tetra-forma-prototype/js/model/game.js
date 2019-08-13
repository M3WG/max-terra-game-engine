'use strict'

m3.model.game.extendPrototype({
  createRound: function () {
    const round = m3.model.round.create()

    this.data.round.push(round)
    this.emit('change')

    return round
  },
  getCurrentRound: function () {
    return this.data.round[this.data.round.length - 1]
  },
  getRoundCount: function () {
    return this.data.round.length
  },
  getRounds: function () {
    return utility.array.copy(this.data.round)
  },
}).extendDefaults({
  round: [],
})

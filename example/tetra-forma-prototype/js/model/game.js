'use strict'

m3.model.game.extendPrototype({
  createRound: function () {
    const round = m3.model.round.create()

    this.data.rounds.push(round)
    this.emit('change')

    return round
  },
  getCurrentRound: function () {
    return this.data.rounds[this.data.rounds.length - 1]
  },
  getRoundCount: function () {
    return this.data.rounds.length
  },
  getRounds: function () {
    return utility.array.copy(this.data.rounds)
  },
}).extendDefaults({
  round: [],
}).extendValidators({
  rounds: (values) => {
    values = utility.array.copy(values)

    values.forEach((value) => {
      if (!m3.model.round.is(value)) {
        throw new Error('Please provide a valid round')
      }
    })

    return values
  },
})

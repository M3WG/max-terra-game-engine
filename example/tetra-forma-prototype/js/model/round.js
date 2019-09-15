'use strict'

m3.model.round = m3.utility.model.inventFactory({
  createTurn: function (options) {
    const turn = m3.model.turn.create(options)

    this.data.turns.push(turn)
    this.emit('change')

    return turn
  },
  defaults: {
    turns: [],
  },
  getCurrentTurn: function () {
    return this.data.turns[this.data.turns.length - 1]
  },
  getTurnCount: function () {
    return this.data.turns.length
  },
  validators: {
    turns: (values) => {
      values = utility.array.copy(values)

      values.forEach((value) => {
        if (!m3.model.turn.is(value)) {
          throw new Error('Please provide a valid turn')
        }
      })

      return values
    },
  },
})

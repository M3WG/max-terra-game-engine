'use strict'

// TODO: Document internal data struct
m3.model.round = m3.utility.model.inventFactory({
  // TODO: Deprecate and prefer pushTurn() via a game controller
  createTurn: function (options) {
    options.round = this

    const turn = m3.model.turn.create(options)
    this.pushTurn(turn)

    return turn
  },
  getCurrentTurn: function () {
    return this.turn[this.turn.length - 1]
  },
  getTurnCount: function () {
    return this.turn.length
  },
  pushTurn: function (turn) {
    if (!m3.model.turn.is(turn)) {
      throw new Error('Please provide a valid turn')
    }

    this.turn.push(turn)
    this.emit('change')

    return this
  },
  setup: function () {
    this.game = this.data.game
    this.turn = []

    return this
  },
  teardown: function () {
    this.game = undefined
    this.turn.forEach((turn) => turn.destroy())

    return this
  },
})

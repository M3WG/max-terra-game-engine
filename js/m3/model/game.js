'use strict'

// TODO: Document internal data struct
m3.model.game = m3.utility.model.inventFactory({
  // TODO: Deprecate and prefer pushRound() via a game controller
  createRound: function () {
    const round = m3.model.round.create({
      game: this,
    })

    this.pushRound(round)

    return round
  },
  getCurrentRound: function () {
    return this.round[this.round.length - 1]
  },
  getPlayer: function (index) {
    return this.player[index]
  },
  getPlayerCount: function () {
    return this.player.length
  },
  getPlayers: function () {
    return utility.array.copy(this.player)
  },
  getRoundCount: function () {
    return this.round.length
  },
  pushRound: function (round) {
    if (!m3.model.round.prototype.isPrototypeOf(round)) {
      throw new Error('Please provide a valid round')
    }

    this.round.push(round)
    this.emit('change')

    return this
  },
  setup: function () {
    this.map = this.data.map
    this.player = this.data.player
    this.round = []

    return this
  },
  teardown: function () {
    this.map = this.data.map
    this.player = this.data.player
    this.round.forEach((round) => round.destroy())

    return this
  },
})

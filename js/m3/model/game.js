'use strict'

m3.model.game = m3.utility.model.inventFactory(
  ((undefined) => {

    // TODO: Deprecate and prefer pushRound() via a game controller
    function createRound() {
      const round = m3.model.round.create({
        game: this,
      })

      this.pushRound(round)

      return round
    }

    function getCurrentRound() {
      return this.round[this.round.length - 1]
    }

    function getPlayer(index) {
      return this.player[index]
    }

    function getPlayerCount() {
      return this.player.length
    }

    function getPlayers() {
      // XXX: Not a copy
      return this.player
    }

    function getRoundCount() {
      return this.round.length
    }

    function pushRound(round) {
      if (!m3.model.round.prototype.isPrototypeOf(round)) {
        throw new Error('Please provide a valid round')
      }

      this.round.push(round)
      this.emit('change')

      return this
    }

    function setup() {
      this.map = this.data.map
      this.player = this.data.player
      this.round = []

      return this
    }

    function teardown() {
      this.map = this.data.map
      this.player = this.data.player
      this.round.forEach((round) => round.destroy())

      return this
    }

    return {
      createRound,
      getCurrentRound,
      getPlayer,
      getPlayerCount,
      getPlayers,
      getRoundCount,
      pushRound,
      setup,
      teardown,
    }
  })()
)

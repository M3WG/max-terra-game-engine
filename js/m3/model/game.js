'use strict'

m3.model.game = {}

m3.model.game.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.map = this.config.map
      this.player = this.config.player
      this.round = []

      return this
    }

    function destruct() {
      return this
    }

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

    // Map

    return Object.setPrototypeOf({
      construct,
      destruct,
      createRound,
      getCurrentRound,
      getPlayer,
      getPlayerCount,
      getPlayers,
      getRoundCount,
      pushRound,
    }, _prototype)
  }
)()

m3.model.game.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

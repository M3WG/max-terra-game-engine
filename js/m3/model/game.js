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

      this.createRound()

      return this
    }

    function destruct() {
      return this
    }

    function createRound() {
      const round = m3.model.round.create({
        game: this,
      })

      this.round.push(round)

      this.emit('change')

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
    }, _prototype)
  }
)()

m3.model.game.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

'use strict'

m3.model.game = {}

m3.model.game.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.game.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(options) {
      _prototype.construct.call(this)

      this.map = options.map
      this.player = options.player
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

      round.on('end', _onRoundEnd.bind(this))
      this.round.push(round)

      this.emit('change')

      return this
    }

    function getCurrentRound() {
      return this.round[this.round.length - 1]
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

    function _onRoundEnd() {
      // TODO: Check game end
      if (false) {
        // TODO: ???
      } else {
        this.createRound()
      }

      return this
    }

    // Map

    return Object.setPrototypeOf({
      construct,
      destruct,
      createRound,
      getCurrentRound,
      getPlayerCount,
      getPlayers,
      getRoundCount,
    }, _prototype)
  }
)()

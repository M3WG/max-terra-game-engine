'use strict'

m3.model.round = {}

m3.model.round.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.round.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(options) {
      _prototype.construct.apply(this, arguments)

      this.game = options.game
      this.turn = []

      this.createTurn()

      return this
    }

    function destruct() {
      return this
    }

    function createTurn() {
      const turn = m3.model.turn.create({
        // TODO: Inject player
        round: this,
      })

      turn.on('end', _onTurnEnd.bind(this))
      this.turn.push(turn)

      this.emit('change')

      return this
    }

    function getCurrentTurn() {
      return this.turn[this.turn.length - 1]
    }

    function getTurnCount() {
      return this.turn.length
    }

    function _onTurnEnd() {
      const isRoundEnd = this.getTurnCount() >= this.game.getPlayerCount()

      if (isRoundEnd) {
        this.emit('end')
      } else {
        this.createTurn()
      }

      return this
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      createTurn,
      getCurrentTurn,
      getTurnCount,
    }, _prototype)
  }
)()

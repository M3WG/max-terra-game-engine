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
      this.turn.push(
        m3.model.turn.create({
          // TODO: Inject player
          round: this,
        })
      )

      return this
    }

    function getCurrentTurn() {
      return this.turn[this.turn.length - 1]
    }

    function getTurnCount() {
      return this.turn.length
    }

    function onTurnEnd() {
      const isRoundEnd = this.getTurnCount() >= this.game.getPlayerCount()

      if (isRoundEnd) {
        this.game.onRoundEnd()
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
      onTurnEnd,
    }, _prototype)
  }
)()

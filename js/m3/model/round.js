'use strict'

m3.model.round = {}

m3.model.round.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.game = this.config.game
      this.turn = []

      return this
    }

    function destruct() {
      return this
    }

    function createTurn(options) {
      options.round = this

      const turn = m3.model.turn.create(options)
      this.turn.push(turn)

      this.emit('change')

      return turn
    }

    function getCurrentTurn() {
      return this.turn[this.turn.length - 1]
    }

    function getTurnCount() {
      return this.turn.length
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

m3.model.round.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

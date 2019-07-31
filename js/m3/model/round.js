'use strict'

m3.model.round = m3.utility.model.inventFactory(
  ((undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.game = this.config.game
      this.turn = []

      return this
    }

    // TODO: Deprecate and prefer pushTurn() via a game controller
    function createTurn(options) {
      options.round = this

      const turn = m3.model.turn.create(options)
      this.pushTurn(turn)

      return turn
    }

    function getCurrentTurn() {
      return this.turn[this.turn.length - 1]
    }

    function getTurnCount() {
      return this.turn.length
    }

    function pushTurn(turn) {
      if (!m3.model.turn.prototype.isPrototypeOf(turn)) {
        throw new Error('Please provide a valid turn')
      }

      this.turn.push(turn)
      this.emit('change')

      return this
    }

    return {
      construct,
      createTurn,
      getCurrentTurn,
      getTurnCount,
      pushTurn,
    }
  })()
)

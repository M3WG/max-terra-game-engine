'use strict'

m3.model.action = {}

m3.model.action.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.cell = this.config.cell
      this.tile = this.config.tile
      this.turn = this.config.turn

      _incrementScore.call(this)

      return this
    }

    function destruct() {
      return this
    }

    // XXX: Not the time or place for this
    // TODO: Good luck future us
    function _incrementScore() {
      if (this.config.claim) {
        this.turn.player.incrementScore(this.config.claim.type.getScore())
      }
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

m3.model.action.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

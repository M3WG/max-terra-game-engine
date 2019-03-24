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

      _swapTile.call(this)
      _claimCheck.call(this)
      _incrementScore.call(this)

      return this
    }

    function destruct() {
      return this
    }

    // XXX: Not the time or place for this
    // TODO: Good luck future us
    function _claimCheck() {
      // TODO: Somewhere more accessible, e.g. player.claim
      this.claim = m3.utility.match(this)
    }

    // XXX: Not the time or place for this
    // TODO: Good luck future us
    function _incrementScore() {
      if (this.claim) {
        this.turn.player.incrementScore(this.claim.type.getScore())
      }
    }

    // XXX: Not the time or place for this
    // TODO: Good luck future us
    function _swapTile() {
      this.cell.setTile(this.tile)
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

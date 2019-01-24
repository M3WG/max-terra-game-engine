'use strict'

m3.model.action = {}

m3.model.action.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.action.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(options) {
      _prototype.construct.call(this)

      this.cell = options.cell
      this.tile = options.tile
      this.turn = options.turn

      _swapTile.call(this)

      return this
    }

    function destruct() {
      return this
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

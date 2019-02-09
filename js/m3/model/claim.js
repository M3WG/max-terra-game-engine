'use strict'

m3.model.claim = {}

m3.model.claim.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.claim.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.type = this.config.type

      _claimCells.call(this);

      return this
    }

    function destruct() {
      return this
    }

    function getCells() {
      return utility.array.copy(this.config.cell)
    }

    function _claimCells() {
      const setClaim = (cell) => cell.setClaim(this)
      this.getCells().forEach(setClaim)
    }

    // Player

    return Object.setPrototypeOf({
      construct,
      destruct,
    }, _prototype)
  }
)()

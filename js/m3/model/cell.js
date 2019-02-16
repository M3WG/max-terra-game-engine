'use strict'

m3.model.cell = {}

m3.model.cell.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.cell.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      return this
    }

    function destruct() {
      return this
    }

    function getX() {
      return this.config.x
    }

    function getY() {
      return this.config.y
    }

    function setClaim(claim) {
      if (m3.model.claim.prototype.isPrototypeOf(claim)) {
        this.claim = claim
      }

      return this
    }

    function setTile(id) {
      this.tile = m3.model.tile.createWithId(id)
      this.emit('change')
      return this
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      getX,
      getY,
      setClaim,
      setTile,
    }, _prototype)
  }
)()

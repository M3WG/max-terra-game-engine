'use strict'

m3.model.cell = {}

m3.model.cell.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.map = this.config.map

      // TODO: Game controller?
      this._fog = true

      return this
    }

    function destruct() {
      return this
    }

    function getFog() {
      return this._fog
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
        this.emit('change')
      }

      return this
    }

    function setFog(state) {
      this._fog = Boolean(state)
      this.emit('change')
      return this
    }

    function setTile(id) {
      this.tile = m3.model.tile.get(id)
      this.emit('change')
      return this
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      getFog,
      getX,
      getY,
      setClaim,
      setFog,
      setTile,
    }, _prototype)
  }
)()

m3.model.cell.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

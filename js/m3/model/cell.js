'use strict'

m3.model.cell = m3.utility.model.inventFactory(
  ((undefined) => {

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

    function setup() {
      this.map = this.config.map

      this._fog = true

      return this
    }

    function teardown() {
      this.map = undefined

      return this
    }

    return {
      getFog,
      getX,
      getY,
      setClaim,
      setFog,
      setTile,
      setup,
      teardown,
    }
  })()
)

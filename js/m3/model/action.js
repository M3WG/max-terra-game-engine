'use strict'

m3.model.action = m3.utility.model.inventFactory(
  ((undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.cell = this.config.cell
      this.tile = this.config.tile
      this.turn = this.config.turn

      return this
    }

    return {
      construct,
    }
  })()
)

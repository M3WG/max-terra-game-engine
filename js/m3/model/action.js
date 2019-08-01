'use strict'

m3.model.action = m3.utility.model.inventFactory(
  ((undefined) => {

    function setup() {
      this.cell = this.config.cell
      this.tile = this.config.tile
      this.turn = this.config.turn

      return this
    }

    function teardown() {
      this.cell = undefined
      this.tile = undefined
      this.turn = undefined

      return this
    }

    return {
      setup,
      teardown,
    }
  })()
)

'use strict'

m3.model.action = m3.utility.model.inventFactory(
  ((undefined) => {

    function setup() {
      this.cell = this.data.cell
      this.tile = this.data.tile
      this.turn = this.data.turn

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

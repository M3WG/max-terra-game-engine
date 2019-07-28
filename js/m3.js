const m3 = (
  function IIFE(undefined) {
    'use strict'

    function configure(config) {
      this.config = Object.assign({}, config)
      return this
    }

    return {
      component: {},
      config: {},
      configure,
      model: {},
      utility: {},
    }
  }
)()

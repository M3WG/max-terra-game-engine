'use strict'

m3.model.base = {}

m3.model.base.prototype = (
  function prototypeIIFE(undefined) {

    function construct(options) {
      utility.pubsub.decorate(this)

      return this
    }

    return {
      construct,
    }
  }
)()

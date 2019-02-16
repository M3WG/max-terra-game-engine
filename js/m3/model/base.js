'use strict'

m3.model.base = {}

m3.model.base.prototype = (
  function prototypeIIFE(undefined) {

    function construct(config) {
      this.config = Object.assign({}, config)

      utility.pubsub.decorate(this)

      return this
    }

    function getId() {
      return Number(this.config.id)
    }

    return {
      construct,
      getId,
    }
  }
)()

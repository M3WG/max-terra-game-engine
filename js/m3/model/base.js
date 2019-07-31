'use strict'

m3.model.base = {}

m3.model.base.is = (x) => m3.model.base.isPrototypeOf(x)

m3.model.base.prototype = (
  (undefined) => {

    function construct(config) {
      // TODO: Rethink config
      this.config = Object.assign({}, config)

      utility.pubsub.decorate(this)

      this.setup()

      return this
    }

    function destroy() {
      this.config = {}

      this.teardown()

      return this
    }

    function getId() {
      return Number(this.config.id)
    }

    function setup() {
      return this
    }

    function teardown() {
      return this
    }

    return {
      construct,
      destroy,
      getId,
      setup,
      teardown,
    }
  }
)()

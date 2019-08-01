'use strict'

m3.model.base = {}

m3.model.base.is = (x) => m3.model.base.isPrototypeOf(x)

m3.model.base.prototype = {
  construct: function (config) {
    // TODO: Rethink config
    this.config = Object.assign({}, config)

    utility.pubsub.decorate(this)

    this.setup()

    return this
  },
  destroy: function () {
    this.config = {}

    this.teardown()

    return this
  },
  getId: function () {
    return Number(this.config.id)
  },
  setup: function () {
    return this
  },
  teardown: function () {
    return this
  }
}

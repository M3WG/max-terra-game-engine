'use strict'

m3.model.base = {}

m3.model.base.is = (x) => m3.model.base.isPrototypeOf(x)

m3.model.base.prototype = {
  construct: function (data, ...args) {
    this.data = Object.assign({}, data)

    utility.pubsub.decorate(this)
    this.setup(...args)

    return this
  },
  destroy: function () {
    this.teardown()
    this.data = {}

    return this
  },
  getId: function () {
    return Number(this.data.id)
  },
  setup: function () {
    return this
  },
  teardown: function () {
    return this
  }
}

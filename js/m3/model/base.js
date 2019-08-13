'use strict'

m3.model.base = {}

m3.model.base.is = (x) => m3.model.base.isPrototypeOf(x)

m3.model.base.prototype = {
  construct: function (data, ...args) {
    this.data = {...data}

    utility.pubsub.decorate(this)
    this.setup(...args)

    return this
  },
  destroy: function () {
    this.teardown()
    this.data = {}

    return this
  },
  has: function(key) {
    return typeof this.data[key] != 'undefined'
  },
  get: function(key) {
    return this.data[key]
  },
  getId: function () {
    return this.data.id
  },
  is: function (key, value, strict) {
    if (strict) {
      return this.data[key] === value
    }
    return this.data[key] == value
  },
  set: function (key, value) {
    this.data[key] = value
    this.emit('change')
    return this
  },
  setup: function () {
    return this
  },
  teardown: function () {
    return this
  }
}

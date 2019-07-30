'use strict'

m3.utility.model = {}

m3.utility.model.invent = (definition) => Object.setPrototypeOf(Object.assign({}, definition), m3.model.base)

m3.utility.model.inventFactory = (definition, mixin) => m3.utility.model.factory(m3.utility.model.invent(definition), mixin)

m3.utility.model.factory = (prototype, mixin = {}) => ({
  create: function create(...args) {
    return Object.create(this.prototype).construct(...args)
  },
  is: function is(x) {
    return this.prototype.isPrototypeOf(x)
  },
  prototype,
  ...mixin,
})

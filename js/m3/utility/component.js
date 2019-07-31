'use strict'

m3.utility.component = {}

m3.utility.component.factory = (prototype, mixin = {}) => ({
  create: function create(...args) {
    return Object.create(this.prototype).construct(...args)
  },
  is: function is(x) {
    return this.prototype.isPrototypeOf(x)
  },
  prototype,
  ...mixin,
})

m3.utility.component.invent = (definition) => Object.setPrototypeOf(Object.assign({}, definition), m3.component.base.prototype)
m3.utility.component.inventFactory = (definition, mixin) => m3.utility.component.factory(m3.utility.component.invent(definition), mixin)

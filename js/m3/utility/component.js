'use strict'

m3.utility.component = {}

m3.utility.component.extend = (prototype, mixin = {}) => {
  if (!m3.utility.component.is(prototype)) {
    throw new Error('Please provide a valid component')
  }

  Object.keys(mixin).forEach((key) => {
    let value = mixin[key]

    if (key == 'defaults' || key == 'validators') {
      value = {...prototype[key], ...value}
    }

    prototype[key] = value
  })

  return prototype
}

m3.utility.component.extendDelegate = (prototype, fn) => {
  if (typeof fn != 'function') {
    throw new Error ('Please provide a valid function')
  }

  return m3.utility.component.extend(
    prototype,
    fn(prototype)
  )
}

m3.utility.component.factory = (prototype, mixin = {}) => ({
  create: function (...args) {
    return Object.create(this.prototype).create(...args)
  },
  is: function (x) {
    return this.prototype.isPrototypeOf(x)
  },
  prototype,
  ...mixin,
})

m3.utility.component.invent = (definition = {}, prototype) => Object.setPrototypeOf(
  {...definition},
  m3.utility.component.is(prototype) ? prototype : m3.component.base.prototype
)

m3.utility.component.inventFactory = (definition, mixin = {}, prototype) => m3.utility.component.factory(m3.utility.component.invent(definition, prototype), mixin)

m3.utility.component.is = (x) => m3.component.base.prototype.isPrototypeOf(x)

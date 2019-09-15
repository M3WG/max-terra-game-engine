'use strict'

m3.utility.model = {}

m3.utility.model.extend = (prototype = {}, definition = {}) => Object.setPrototypeOf(
  {
    ...definition,
    validators: {...prototype.validators, ...definition.validators},
  },
  prototype
)

m3.utility.model.extendFactory = (prototype, definition, mixin) => m3.utility.model.factory(m3.utility.model.extend(prototype, definition), mixin)
m3.utility.model.extendSingletonFactory = (prototype, definition, mixin) => m3.utility.model.singletonFactory(m3.utility.model.extend(prototype, definition), mixin)

m3.utility.model.factory = (prototype, mixin = {}) => ({
  create: function (data = {}, ...args) {
    data = {...this.defaults, ...data}
    return Object.create(this.prototype).create(data, ...args)
  },
  defaults: {},
  extendDefaults: function (mixin = {}) {
    this.defaults = {...this.defaults, ...mixin}
    return this
  },
  extendPrototype: function (mixin = {}) {
    Object.keys(mixin).forEach((key) => this.prototype[key] = mixin[key])
    return this
  },
  extendValidators: function (mixin = {}) {
    this.prototype.validators = {...this.prototype.validators, ...mixin}
    return this
  },
  is: function (x) {
    return this.prototype.isPrototypeOf(x)
  },
  prototype,
  ...mixin,
})

m3.utility.model.invent = (definition = {}) => Object.setPrototypeOf(
  {
    ...definition,
    validators: {...definition.validators},
  },
  m3.model.base.prototype
)

m3.utility.model.inventFactory = (definition, mixin = {}) => m3.utility.model.factory(m3.utility.model.invent(definition), mixin)
m3.utility.model.inventSingletonFactory = (definition, mixin) => m3.utility.model.singletonFactory(m3.utility.model.invent(definition), mixin)

m3.utility.model.is = function (x) {
  return m3.model.base.prototype.isPrototypeOf(x)
}

m3.utility.model.singletonFactory = (prototype, mixin = {}) => m3.utility.model.factory(prototype, {
  data: {},
  get: function (id) {
    if (this.is(id)) {
      return id
    }

    if (this.store.has(id)) {
      return this.store.get(id)
    }

    const data = this.data[id] || {}
    data.id = id

    const instance = this.create(data)
    this.store.set(id, instance)
    return instance
  },
  getSome: function(ids) {
    return ids.map((id) => this.get(id))
  },
  getAll: function() {
    return Object.keys(this.data).map((id) => this.get(id))
  },
  store: new Map(),
  ...mixin,
})

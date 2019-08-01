'use strict'

m3.utility.model = {}

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

m3.utility.model.singletonFactory = (prototype, mixin = {}) => m3.utility.model.factory(prototype, {
  data: {},
  get: function (id) {
    if (this.is(id)) {
      return id
    }

    if (this.store.has(id)) {
      return this.store.get(id)
    }

    const data = this.data[id]
    data.id = id

    const instance = this.create(data)
    this.store.set(id, instance)
    return instance
  },
  getSome: function(ids) {
    return ids.reduce((models, id) => {
      models.push(this.get(id))
      return models
    }, [])
  },
  getAll: function() {
    return Object.keys(this.data).map((id) => this.get(id))
  },
  store: new Map(),
  ...mixin,
})

m3.utility.model.invent = (definition) => Object.setPrototypeOf(Object.assign({}, definition), m3.model.base.prototype)
m3.utility.model.inventFactory = (definition, mixin) => m3.utility.model.factory(m3.utility.model.invent(definition), mixin)
m3.utility.model.inventSingletonFactory = (definition, mixin) => m3.utility.model.singletonFactory(m3.utility.model.invent(definition), mixin)

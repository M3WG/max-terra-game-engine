'use strict'

utility.pubsub = {}

utility.pubsub.create = (...args) => Object.create(utility.pubsub.prototype).construct(...args)

utility.pubsub.decorate = (target) => {
  const instance = utility.pubsub.create(),
    methods = ['emit', 'off', 'on']

  target.pubsub = instance

  methods.forEach((method) => {
    target[method] = (...args) => {
      instance[method](...args)
      return target
    }
  })

  return target
}

utility.pubsub.prototype = {
  construct: function() {
    this._handler = {}
    return this
  },
  destroy: function() {
    this.off()
    return this
  },
  emit: function(event, ...args) {
    if (!this._handler[event]) {
      return this
    }

    const execute = (handler) => handler(...args)
    this._handler[event].forEach(execute)

    return this
  },
  off: function(event, handler) {
    if (event === undefined) {
      this._handler = {}
      return this
    }

    if (handler === undefined) {
      delete this._handler[event]
      return this
    }

    if (!this._handler[event]) {
      return this
    }

    const handlers = this._handler[event],
      index = handlers.indexOf(handler)

    if (index != -1) {
      handlers.splice(index, 1)
    }

    return this
  },
  on: function(event, handler) {
    if (!this._handler[event]) {
      this._handler[event] = []
    }

    this._handler[event].push(handler)

    return this
  },
}

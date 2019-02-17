'use strict'

var utility = utility || {}

utility.pubsub = {}

utility.pubsub.create = (...args) => {
  const instance = Object.create(utility.pubsub.prototype)
  return instance.construct(...args)
}

utility.pubsub.decorate = (target) => {
  const instance = utility.pubsub.create(),
    methods = ['emit', 'off', 'on']

  target._pubsub = instance

  methods.forEach(function bind(method) {
    target[method] = function decorated(...args) {
      instance[method](...args)
      return target
    }
  })

  return target
}

utility.pubsub.prototype = (
  (undefined) => {

    function construct() {
      this._handler = {}

      return this
    }

    function destruct() {
      this.off()

      return this
    }

    function emit(event, ...args) {
      if (!this._handler[event]) {
        return this
      }

      const execute = (handler) => handler(...args)
      this._handler[event].forEach(execute)

      return this
    }

    function off(event, handler) {
      if (event === undefined) {
        Object.keys(this._handler).forEach((event) => {
          this.off(event)
        })

        return this
      }

      if (handler === undefined) {
        delete this._handler[event]
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
    }

    function on(event, handler) {
      if (!this._handler[event]) {
        this._handler[event] = []
      }

      this._handler[event].push(handler)

      return this
    }

    return {
      construct,
      destruct,
      emit,
      off,
      on,
    }
  }
)()

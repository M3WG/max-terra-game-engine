'use strict'

var utility = utility || {}

utility.pubsub = {}

utility.pubsub.create = function create() {
  const instance = Object.create(this.prototype)
  return instance.construct()
}

utility.pubsub.decorate = function decorate(target) {
  const instance = this.create(),
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
  function prototypeIIFE(undefined) {

    function construct() {
      this._handlers = {}

      return this
    }

    function destruct() {
      this.off()

      return this
    }

    function emit(event, ...args) {
      if (!this._handlers[event]) {
        return this
      }

      this._handlers[event].forEach(function execute(handler) {
        handler(...args)
      })

      return this
    }

    function off(event, handler) {
      if (event === undefined) {
        Object.keys(this._handlers).forEach((event) => {
          this.off(event)
        })

        return this
      }

      if (handler === undefined) {
        delete this._handlers[event]
      }

      if (!this._handlers[event]) {
        return this
      }

      const handlers = this._handlers[event],
        index = handlers.indexOf(handler)

      if (index != -1) {
        handlers.splice(index, 1)
      }

      return this
    }

    function on(event, handler) {
      if (!this._handlers[event]) {
        this._handlers[event] = []
      }

      this._handlers[event].push(handler)

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

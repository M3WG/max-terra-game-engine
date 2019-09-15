'use strict'

/**
 * Utility for providing simple event subscription.
 *
 * @namespace m3.utility.pubsub
 */
m3.utility.pubsub = {}

/**
 * Creates an instance of {@link Pubsub}.
 *
 * @return {Pubsub}
 */
m3.utility.pubsub.create = function (...args) {
  return Object.create(this.prototype).create(...args)
}

/**
 * Decortates the target object with a pubsub instance and chainable emit, off, and on methods.
 * A new instance will be created if one isn't provided.
 *
 * @param {object} target
 * @param {Pubsub} [instance]
 * @returns {object} - Decorated target
 */
m3.utility.pubsub.decorate = function (target, instance) {
  if (!this.is(instance)) {
    instance = this.create()
  }

  target.pubsub = instance;

  ['emit', 'off', 'on'].forEach((method) => {
    target[method] = (...args) => {
      instance[method](...args)
      return target
    }
  })

  return target
}

/**
 * Returns whether the provided value is a pubsub instance.
 *
 * @param {*} x
 * @returns {boolean}
 */
m3.utility.pubsub.is = function (x) {
  return this.prototype.isPrototypeOf(x)
}

/**
 * Prototype for pubsub instances.
 *
 * @interface Pubsub
 * @see m3.utility.pubsub
 */
m3.utility.pubsub.prototype = {
  /**
   * Called automatically by {@link m3.utility.pubsub.create}.
   *
   * @alias Pubsub#create
   */
  create: function() {
    this._handler = {}
    return this
  },
  /**
   * Call to prepare for garbage collection.
   *
   * @alias Pubsub#destroy
   */
  destroy: function() {
    this.off()
    return this
  },
  /**
   * Emits args to handlers subscribed to event.
   *
   * @alias Pubsub#emit
   * @param {string} event
   * @param {...mixed} args
   */
  emit: function(event, ...args) {
    if (!this._handler[event]) {
      return this
    }

    const execute = (handler) => handler(...args)
    this._handler[event].forEach(execute)

    return this
  },
  /**
   * Unsubscribes the handler function from event.
   * If no handler is provided, then all handlers for event are removed.
   * If no event is provided, then all handlers for all events are removed.
   *
   * @alias Pubsub#off
   * @param {string} [event]
   * @param {function} [handler]
   */
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
  /**
   * Subscribes the handler function to event.
   *
   * @alias Pubsub#on
   * @param {string} event
   * @param {function} handler
   */
  on: function(event, handler) {
    if (!this._handler[event]) {
      this._handler[event] = []
    }

    this._handler[event].push(handler)

    return this
  },
}

'use strict'

/**
 * Namespace for the base model that all models extend.
 * There is no factory here because it's intended to be abstract.
 *
 * @namespace m3.model.base
 */
m3.model.base = {}

/**
 * Prototype for the base model.
 *
 * The base model provides a simple wrapper for a flat internal data structure.
 * Users are encouraged to extend it with custom members and accessor methods.
 *
 * @implements Pubsub
 * @interface Model
 */
m3.model.base.prototype = {
  /**
   * Called when instantiating a new instance, typically automatically via a factory.
   * Models _must not_ override this method.
   *
   * @alias Model#create
   * @final
   * @param {object} data - Copied into {@link Model#data}
   * @param {...mixed} ...args - Passed into {@link Model#setup}
   * @returns {Model}
   * @see {@link Model#setup}
   */
  create: function (data, ...args) {
    Object.keys(this.validators).forEach((key) =>
      data[key] = this.validators[key](data[key])
    )

    this.data = {...data}

    utility.pubsub.decorate(this)
    this.setup(...args)

    return this
  },
  /**
   * The internal data structure of the model instance.
   * Initially filled with the values provided via {@link Model#create}.
   *
   * @name Model#data
   * @type {object}
   */
  /**
   * Prepares the model for garbage collection.
   * Models _must not_ override this method.
   *
   * @alias Model#destroy
   * @final
   * @returns {Model}
   * @see {@link Model#teardown}
   */
  destroy: function () {
    this.teardown()
    this.pubsub.destroy()

    this.data = {}

    return this
  },
  /**
   * Returns whether `key` exists within the internal data structure.
   *
   * @alias Model#has
   * @param {string} key
   * @returns {boolean}
   */
  has: function(key) {
    return typeof this.data[key] != 'undefined'
  },
  /**
   * Returns the value for `key` within the internal data structure.
   *
   * @alias Model#get
   * @param {string} key
   * @returns {mixed}
   */
  get: function(key) {
    return this.data[key]
  },
  /**
   * Returns the identifier used by singletons.
   * Shorthand for `this.get('id')`.
   *
   * @alias Model#getId
   * @returns {mixed}
   */
  getId: function () {
    return this.data.id
  },
  /**
   * Returns whether `key` is equal to `value` within the internal data structure.
   *
   * @alias Model#is
   * @param {string} key
   * @param {mixed} value
   * @param {boolean} strict
   * @returns {boolean}
   */
  is: function (key, value, strict) {
    if (strict) {
      return this.data[key] === value
    }

    return this.data[key] == value
  },
  /**
   * Sets `key` to `value` within the internal data structure.
   *
   * @alias Model#set
   * @param {string} key
   * @param {mixed} value
   * @returns {Model}
   */
  set: function (key, value) {
    if (this.validators[key]) {
      value = this.validators[key](value)
    }

    this.data[key] = value
    this.emit('change')
    return this
  },
  /**
   * Called via {@link Model#create}.
   * Models _can_ override this method to initialize custom members.
   *
   * @alias Model#setup
   * @param {...mixed} - Additional arguments from {@link Model#create}
   * @returns {Model}
   */
  setup: function () {
    return this
  },
  /**
   * Called via {@link Model#destroy}.
   * Models _should_ override this method to free any refrences for garbage collection.
   *
   * @alias Model#teardown
   * @returns {Model}
   */
  teardown: function () {
    return this
  },
  /**
   * Hash of validation functions for ensuring type safety when setting keys.
   *
   * A validator function _must_ accept a value and return it like an identity function.
   * It _should_ massage the value into the correct type and throw an exception if proceeding is impossible.
   *
   * Providing validator functions is optional but recommended.
   *
   * @alias Model#validators
   * @type {object}
   */
  validators: {},
}

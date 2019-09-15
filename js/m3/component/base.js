'use strict'

/**
 * Namespace for the base component that all components extend.
 * There is no factory here because it's intended to be abstract.
 *
 * @namespace m3.component.base
 */
m3.component.base = {}

/**
 * Prototype for the base component.
 *
 * @implements Pubsub
 * @interface Component
 */
m3.component.base.prototype = {
  /**
   * Appends the root element to the specified Node.
   *
   * @alias Component#attach
   * @returns {Component}
   */
  attach: function (node) {
    if (node instanceof Node) {
      node.appendChild(this.rootElement)
    }

    return this
  },
  /**
   * Called when creating a new instance, typically automatically via a factory.
   * Components _must not_ override this method.
   *
   * @alias Component#create
   * @final
   * @param {object} config
   * @param {Component} [config.parentComponent]
   * @param {Element} [config.parentElement]
   * @param {...mixed} [config....data] - Copied into {@link Component#data}
   * @param {...mixed} [...args] - Passed into {@link Component#setup}
   * @returns {Component}
   * @see {@link m3.component.base.setup}
   */
  create: function ({parentComponent, parentElement, ...data}, ...args) {
    this.data = data
    this.parent = parentComponent

    m3.utility.pubsub.decorate(this)
    this.setup(...args).attach(parentElement)

    return this
  },
  /**
   * Data associated with the component instance.
   * Initially filled with the values provided via {@link Component#create}.
   *
   * @name Component#data
   * @type {object}
   */
  /**
   * Prepares the component for garbage collection.
   * Components _must not_ override this method.
   *
   * @alias Component#destroy
   * @final
   * @returns {Component}
   * @see {@link m3.component.base.teardown}
   */
  destroy: function () {
    this.teardown()
    this.pubsub.destroy()

    this.data = {}

    return this
  },
  /**
   * Removes the root element from the DOM until attached again.
   *
   * @alias Component#detach
   * @returns {Component}
   */
  detach: function (node) {
    if (this.rootElement && this.rootElement.parentNode instanceof Node) {
      this.rootElement.parentNode.removeChild(this.rootElement)
    }

    return this
  },
  /**
   * Returns the dimensions and position of the root element relative to the viewport.
   *
   * @alias Component#getBoundingClientRect
   * @returns {Component}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect}
   */
  getBoundingClientRect: function () {
    if (!(this.rootElement instanceof Element)) {
      return {}
    }

    return this.rootElement.getBoundingClientRect()
  },
  /**
   * The root element of the component.
   * Must be created within {@link Component#setup}.
   *
   * @name Component#rootElement
   * @type {Element}
   */
  /**
   * Called via {@link Component#create}.
   * Components _must_ override this method to create and assign an element to `this.rootElement`.
   *
   * @abstract
   * @alias Component#setup
   * @param {...*} - Additional arguments from {@link Component#create}
   * @returns {Component}
   */
  setup: function () {
    return this
  },
  /**
   * Called via {@link Component#destroy}.
   * Components _should_ override this method to free any refrences for garbage collection.
   *
   * @alias Component#teardown
   * @returns {Component}
   */
  teardown: function () {
    return this
  },
}

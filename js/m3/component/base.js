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
 * @borrows utility.pubsub.prototype.emit
 * @borrows utility.pubsub.prototype.off
 * @borrows utility.pubsub.prototype.on
 */
m3.component.base.prototype = {
  /**
   * Appends the root element to the specified Node.
   */
  attach: function (node) {
    if (node instanceof Node) {
      node.appendChild(this.rootElement)
    }

    return this
  },
  /**
   * Called when creating a new instance, typically automatically via a factory.
   * Components must not override this method.
   *
   * @final
   * @see {@link m3.component.base.setup}
   */
  create: function ({parentComponent, parentElement, ...config}, ...args) {
    this.config = config
    this.parent = parentComponent

    utility.pubsub.decorate(this)
    this.setup(...args).attach(parentElement)

    return this
  },
  /**
   * Prepares the component for garbage collection.
   * Components must not override this method.
   *
   * @final
   * @see {@link m3.component.base.teardown}
   */
  destroy: function () {
    this.teardown()
    this.pubsub.destroy()

    this.config = {}

    return this
  },
  /**
   * Removes the root element from the DOM until attached again.
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
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect}
   */
  getBoundingClientRect: function () {
    if (!(this.rootElement instanceof Element)) {
      return {}
    }

    return this.rootElement.getBoundingClientRect()
  },
  /**
   * Called via {@link app.component.base.create}.
   * Components must override this method to create and assign an element to `this.rootElement`.
   *
   * @abstract
   * @param {...*} - Additional arguments from {@link app.component.base.create}
   */
  setup: function () {
    return this
  },
  /**
   * Called via {@link m3.component.base.destroy}.
   * Components should override this method to free any refrences for garbage collection.
   */
  teardown: function () {
    return this
  },
}

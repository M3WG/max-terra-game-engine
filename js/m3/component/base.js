'use strict'

m3.component.base = {}

m3.component.base.prototype = {
  attach: function (node) {
    if (node instanceof Node) {
      node.appendChild(this.rootElement)
    }

    return this
  },
  create: function ({parentComponent, parentElement, ...config}, ...args) {
    this.config = config
    this.parent = parentComponent

    utility.pubsub.decorate(this)
    this.setup(...args).attach(parentElement)

    return this
  },
  destroy: function () {
    this.teardown()
    this.pubsub.destroy()

    this.config = {}

    return this
  },
  detach: function (node) {
    if (this.rootElement && this.rootElement.parentNode instanceof Node) {
      this.rootElement.parentNode.removeChild(this.rootElement)
    }

    return this
  },
  getBoundingClientRect: function () {
    if (!(this.rootElement instanceof Element)) {
      return {}
    }

    return this.rootElement.getBoundingClientRect()
  },
  getId: function () {
    return this.rootElement.id
  },
  setId: function (id) {
    this.rootElement.id = id

    return this
  },
  setup: function () {
    return this
  },
  teardown: function () {
    return this
  },
}

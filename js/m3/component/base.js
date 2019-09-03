'use strict'

m3.component.base = {}

m3.component.base.prototype = {
  attach: function (parentElement) {
    if (parentElement instanceof Element) {
      parentElement.appendChild(this.rootElement)
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
    this.config = {}

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

'use strict'

m3.component.base = {}

m3.component.base.is = (x) => m3.component.base.prototype.isPrototypeOf(x)

m3.component.base.prototype = {
  attach: function (parentElement) {
    if (typeof parentElement != 'undefined') {
      this.parentElement = parentElement
    }

    if (this.parentElement instanceof Element) {
      this.parentElement.appendChild(this.rootElement)
    }

    return this
  },
  construct: function (config, parentElement, parentComponent, ...args) {
    this.config = {...config}
    this.parentElement = parentElement
    this.parent = parentComponent

    utility.pubsub.decorate(this)
    this.setup(...args).attach()

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

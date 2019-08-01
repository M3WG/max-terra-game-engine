'use strict'

m3.component.base = {}

m3.component.base.is = (x) => m3.component.base.prototype.isPrototypeOf(x)

m3.component.base.prototype = {
  attach: function (parentElement) {
    if (typeof parentElement != 'undefined') {
      this._parentElement = parentElement
    }

    if (this._parentElement instanceof Element) {
      this._parentElement.appendChild(this._rootElement)
    }

    return this
  },
  construct: function (config, parentElement, parentComponent) {
    this.config = Object.assign({}, config)
    this._parentElement = parentElement
    this.parent = parentComponent

    utility.pubsub.decorate(this)

    this.setup().attach()

    return this
  },
  destroy: function () {
    this.teardown()

    this.config = {}

    return this
  },
  getBoundingClientRect: function () {
    if (!(this._rootElement instanceof Element)) {
      return {}
    }

    return this._rootElement.getBoundingClientRect()
  },
  getId: function () {
    return this._rootElement.id
  },
  setId: function (id) {
    this._rootElement.id = id

    return this
  },
  setup: function () {
    return this
  },
  teardown: function () {
    return this
  },
}

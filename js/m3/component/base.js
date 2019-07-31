'use strict'

m3.component.base = {}

m3.component.is = (x) => m3.component.base.prototype.isPrototypeOf(x)

m3.component.base.prototype = (
  (undefined) => {

    function construct(config, parentElement, parentComponent) {
      this.config = Object.assign({}, config)
      this._parentElement = parentElement
      this.parent = parentComponent

      utility.pubsub.decorate(this)

      this.setup().attach()

      return this
    }

    function destroy() {
      this.teardown()

      this.config = {}

      return this
    }

    function attach(parentElement) {
      if (parentElement) {
        this._parentElement = parentElement
      }

      if (this._parentElement) {
        this._parentElement.appendChild(this._rootElement)
      }

      return this
    }

    function detach() {
      if (this._rootElement) {
        this._rootElement.remove()
      }

      return this
    }

    function getBoundingClientRect() {
      if (!this._rootElement) {
        return {}
      }

      return this._rootElement.getBoundingClientRect()
    }

    function getId() {
      return this._rootElement.id
    }

    function setId(id) {
      this._rootElement.id = id

      return this
    }

    function setup() {
      return this
    }

    function teardown() {
      return this
    }

    return {
      attach,
      construct,
      destroy,
      getBoundingClientRect,
      getId,
      setId,
      setup,
      teardown,
    }
  }
)()

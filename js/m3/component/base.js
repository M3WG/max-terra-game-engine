'use strict'

m3.component.base = {}

m3.component.base.prototype = (
  function prototypeIIFE() {

    function construct(config, parentElement, parentComponent) {
      this.config = Object.assign({}, config)
      this._parentElement = parentElement
      this.parent = parentComponent

      utility.pubsub.decorate(this)

      return this
    }

    function destruct() {
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

    return {
      construct,
      destruct,
      attach,
    }
  }
)()

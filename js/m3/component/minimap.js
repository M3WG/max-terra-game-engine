'use strict'

m3.component.minimap = {}

m3.component.minimap.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _build.call(this)

      this.attach()

      return this
    }

    function getModel() {
      return this.config.model
    }

    function _build() {
      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-minimap'
    }

    return Object.setPrototypeOf({
      construct,
      getModel,
    }, _prototype)
  }
)()

m3.component.minimap.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

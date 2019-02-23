'use strict'

m3.component.picker = {}

m3.component.picker.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

m3.component.picker.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _build.call(this)

      return this
    }

    function getValue() {
      return this._rootElement.value
    }

    function _build() {
      this._rootElement = document.createElement('select')
      this._rootElement.className = 'm3-c-picker'
      this._rootElement.addEventListener('change', _onChange.bind(this))

      _buildOptions.call(this)
    }

    function _buildOptions() {
      if (!Array.isArray(this.config.option)) {
        return
      }

      this.config.option.forEach((config) => {
        const option = document.createElement('option')

        option.innerHTML = config.label
        option.value = config.value

        this._rootElement.appendChild(option)
      })
    }

    function _onChange(e) {
      e.preventDefault()
      e.stopPropagation()

      this.emit('change', this.getValue())
    }

    return Object.setPrototypeOf({
      construct,
      getValue,
    }, _prototype)
  }
)()

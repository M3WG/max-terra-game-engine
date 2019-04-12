'use strict'

m3.component.score = {}

m3.component.score.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _build.call(this)

      if (this.config.model) {
        this.config.model.on('change', _onModelChange.bind(this))
      }

      this.render().attach()

      return this
    }

    function getModel() {
      return this.config.model
    }

    function render() {
      this._value.innerHTML = this.getModel().score

      return this
    }

    function setActive(state) {
      if (state) {
        this._rootElement.classList.add('m3-c-score-active')
      } else {
        this._rootElement.classList.remove('m3-c-score-active')
      }

      return this
    }

    function _build() {
      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-score'

      this._value = document.createElement('div')
      this._value.className = 'm3-c-score--value'
      this._rootElement.appendChild(this._value)
    }

    function _onModelChange(data) {
      this.render()
    }

    return Object.setPrototypeOf({
      construct,
      getModel,
      render,
      setActive,
    }, _prototype)
  }
)()

m3.component.score.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

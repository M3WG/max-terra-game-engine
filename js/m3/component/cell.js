'use strict'

m3.component.cell = {}

m3.component.cell.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

m3.component.cell.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this._cell = []
      _build.call(this)

      if (this.config.model) {
        this.config.model.on('change', _onModelChange.bind(this))
      }

      this.render().attach()

      return this
    }

    function click() {
      this.emit('click')

      return this
    }

    function getModel() {
      return this.config.model
    }

    function getX() {
      return this.config.x
    }

    function getY() {
      return this.config.y
    }

    function render() {
      const tile = this.getModel().tile

      this._rootElement.innerHTML = tile ? tile.getId() : 0
      this._rootElement.style.backgroundColor = tile ? tile.getColor() : 'transparent'

      if (this.getModel().claim) {
        this._rootElement.classList.add('m3-c-cell-claim')
      } else {
        this._rootElement.classList.remove('m3-c-cell-claim')
      }

      return this
    }

    function _build() {
      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-cell'
      this._rootElement.addEventListener('click', _onClick.bind(this))
    }

    function _onClick(e) {
      e.preventDefault()
      e.stopPropagation()

      this.click()
    }

    function _onModelChange(data) {
      this.render()
    }

    return Object.setPrototypeOf({
      construct,
      click,
      getModel,
      getX,
      getY,
      render,
    }, _prototype)
  }
)()

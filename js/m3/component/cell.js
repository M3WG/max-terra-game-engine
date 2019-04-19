'use strict'

m3.component.cell = {}

m3.component.cell.prototype = (
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
      const model = this.getModel(),
        tile = this.getModel().tile

      this._rootElement.style.backgroundColor = tile ? tile.getColor() : 'transparent'
      this._rootElement.setAttribute('data-tile', tile ? tile.getId() : -1)
      this._icon.innerHTML = tile ? tile.getIcon() : ''

      if (model.claim) {
        this._rootElement.classList.add('m3-c-cell-claim', ..._getClaimDirectionClassnames.call(this))
        this._rootElement.style.borderColor = model.claim.player.getColor()
      } else {
        this._rootElement.classList.remove(
          'm3-c-cell-claim',
          'm3-c-cell-claimDown',
          'm3-c-cell-claimLeft',
          'm3-c-cell-claimRight',
          'm3-c-cell-claimUp',
        )
        this._rootElement.style.borderColor = 'transparent'
      }

      if (model.getFog()) {
        this._rootElement.classList.add('m3-c-cell-fog')
      } else {
        this._rootElement.classList.remove('m3-c-cell-fog')
      }

      return this
    }

    function _build() {
      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-cell'
      this._rootElement.addEventListener('click', _onClick.bind(this))

      this._icon = document.createElement('div')
      this._icon.className = 'm3-c-cell--icon'
      this._rootElement.appendChild(this._icon)
    }

    function _getClaimDirectionClassnames() {
      const classnames = [],
        model = this.getModel(),
        x = this.getX(),
        y = this.getY()

      const map = model.map

      const down = map.getCell(x, y + 1),
        left = map.getCell(x - 1, y),
        right = map.getCell(x + 1, y),
        up = map.getCell(x, y - 1)

      const claimCells = model.claim.getCells()

      if (down && claimCells.includes(down)) {
        classnames.push('m3-c-cell-claimDown')
      }

      if (left && claimCells.includes(left)) {
        classnames.push('m3-c-cell-claimLeft')
      }

      if (right && claimCells.includes(right)) {
        classnames.push('m3-c-cell-claimRight')
      }

      if (up && claimCells.includes(up)) {
        classnames.push('m3-c-cell-claimUp')
      }

      return classnames
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

m3.component.cell.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

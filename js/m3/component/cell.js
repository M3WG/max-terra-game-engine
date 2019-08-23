'use strict'

m3.component.cell = m3.utility.component.inventFactory((() => {
  function _getClaimDirectionClassnames() {
    const classnames = [],
      model = this.getModel(),
      player = model.getClaim().getPlayer(),
      x = this.getX(),
      y = this.getY()

    const map = model.getMap()

    const down = map.getCell(x, y + 1),
      left = map.getCell(x - 1, y),
      right = map.getCell(x + 1, y),
      up = map.getCell(x, y - 1)

    const isContiguous = (cell) => cell && cell.getClaim() && cell.getClaim().getPlayer() == player

    if (isContiguous(down)) {
      classnames.push('m3-c-cell-claimDown')
    }

    if (isContiguous(left)) {
      classnames.push('m3-c-cell-claimLeft')
    }

    if (isContiguous(right)) {
      classnames.push('m3-c-cell-claimRight')
    }

    if (isContiguous(up)) {
      classnames.push('m3-c-cell-claimUp')
    }

    return classnames
  }

  function _onClick(e) {
    e.preventDefault()
    e.stopPropagation()

    this.click()
  }

  return {
    click: function () {
      this.emit('click')

      return this
    },
    getModel: function () {
      return this.config.model
    },
    getX: function () {
      return this.config.x
    },
    getY: function () {
      return this.config.y
    },
    setup: function () {
      this.rootElement = document.createElement('div')
      this.rootElement.className = 'm3-c-cell'
      this.rootElement.addEventListener('click', _onClick.bind(this))

      this._icon = document.createElement('div')
      this._icon.className = 'm3-c-cell--icon'
      this.rootElement.appendChild(this._icon)

      if (this.config.model) {
        this.config.model.on('change', this.update.bind(this))
      }

      this.update()

      return this
    },
    update: function () {
      const model = this.getModel(),
        tile = model.getTile()

      this.rootElement.style.backgroundColor = tile ? tile.getColor() : 'transparent'
      this.rootElement.setAttribute('data-tile', tile ? tile.getId() : -1)
      this._icon.innerHTML = tile ? tile.getIcon() : ''

      if (model.getClaim()) {
        this.rootElement.classList.add('m3-c-cell-claim', ..._getClaimDirectionClassnames.call(this))
        this.rootElement.style.backgroundColor = model.getClaim().getPlayer().getColor()
      } else {
        this.rootElement.classList.remove(
          'm3-c-cell-claim',
          'm3-c-cell-claimDown',
          'm3-c-cell-claimLeft',
          'm3-c-cell-claimRight',
          'm3-c-cell-claimUp',
        )
      }

      if (model.getFog()) {
        this.rootElement.classList.add('m3-c-cell-fog')
      } else {
        this.rootElement.classList.remove('m3-c-cell-fog')
      }

      return this
    },
  }
})())

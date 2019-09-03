'use strict'

m3.component.cell = m3.utility.component.inventFactory((() => {
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
      const createElement = utility.dom.createElement

      this.rootElement = createElement('button', {
        props: {
          className: 'm3-c-cell',
          type: 'button',
        },
        listeners: [
          ['click', _onClick.bind(this)],
        ],
        children: [
          createElement('div', {
            assign: [this, '_icon'],
            props: {
              className: 'm3-c-cell--icon',
            },
          })
        ],
      })

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

      return this
    },
  }
})())

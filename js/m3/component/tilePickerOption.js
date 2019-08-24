'use strict'

m3.component.tilePickerOption = m3.utility.component.inventFactory((() => {
  const _disabledModifier = 'm3-c-tilePickerOption-disabled',
    _selectedModifier = 'm3-c-tilePickerOption-selected'

  function _onClick(e) {
    e.preventDefault()
    e.stopPropagation()

    this.click()
  }

  return {
    click: function () {
      const index = this.parent.getOptionIndex(this)
      this.parent.setSelectedIndex(index)

      return this
    },
    getValue: function () {
      return this.config.tile
    },
    isDisabled: function () {
      return this.rootElement.classList.contains(_disabledModifier)
    },
    isSelected: function () {
      return this.rootElement.classList.contains(_selectedModifier)
    },
    setInventory: function (value) {
      value = Math.max(0, value) || 0

      if (value == Infinity || value == -Infinity) {
        value = '∞'
      }

      this._inventory.innerHTML = value

      const isDisabled = this.isDisabled()

      if (!isDisabled && !value) {
        this.setDisabled(true)
      } else if (isDisabled && value) {
        this.setDisabled(false)
      }

      return this
    },
    setDisabled: function (state) {
      if (state) {
        this.rootElement.classList.add(_disabledModifier)
      } else {
        this.rootElement.classList.remove(_disabledModifier)
      }

      return this
    },
    setSelected: function (state) {
      if (state) {
        this.rootElement.classList.add(_selectedModifier)
      } else {
        this.rootElement.classList.remove(_selectedModifier)
      }

      return this
    },
    setup: function () {
      const createElement = utility.dom.createElement,
        tile = this.getValue()

      this.rootElement = createElement('button', {
        props: {
          className: 'm3-c-tilePickerOption',
        },
        listeners: [
          ['click', _onClick.bind(this)],
        ],
        children: [
          createElement('div', {
            props: {
              className: 'm3-c-tilePickerOption--color',
            },
            styles: {
              backgroundColor: tile.getColor(),
            },
          }),
          createElement('div', {
            props: {
              className: 'm3-c-tilePickerOption--icon',
              innerHTML: tile.getIcon(),
            },
          }),
          createElement('div', {
            props: {
              className: 'm3-c-tilePickerOption--label',
              innerHTML: tile.getName(),
            },
          }),
          createElement('div', {
            assign: [this, '_inventory'],
            props: {
              className: 'm3-c-tilePickerOption--inventory',
            },
          }),
        ],
      })

      return this
    },
  }
})())

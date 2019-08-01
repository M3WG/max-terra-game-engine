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
      return this._rootElement.classList.contains(_disabledModifier)
    },
    isSelected: function () {
      return this._rootElement.classList.contains(_selectedModifier)
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
        this._rootElement.classList.add(_disabledModifier)
      } else {
        this._rootElement.classList.remove(_disabledModifier)
      }

      return this
    },
    setSelected: function (state) {
      if (state) {
        this._rootElement.classList.add(_selectedModifier)
      } else {
        this._rootElement.classList.remove(_selectedModifier)
      }

      return this
    },
    setup: function () {
      const tile = this.getValue()

      this._rootElement = document.createElement('button')
      this._rootElement.className = 'm3-c-tilePickerOption'
      this._rootElement.type = 'button'
      this._rootElement.addEventListener('click', _onClick.bind(this))

      const color = document.createElement('div')
      color.className = 'm3-c-tilePickerOption--color'
      color.style.backgroundColor = tile.getColor()
      this._rootElement.appendChild(color)

      const icon = document.createElement('div')
      icon.className = 'm3-c-tilePickerOption--icon'
      icon.innerHTML = tile.getIcon()
      this._rootElement.appendChild(icon)

      const label = document.createElement('div')
      label.className = 'm3-c-tilePickerOption--label'
      label.innerHTML = tile.getName()
      this._rootElement.appendChild(label)

      const inventory = document.createElement('div')
      inventory.className = 'm3-c-tilePickerOption--inventory'
      this._rootElement.appendChild(inventory)
      this._inventory = inventory

      return this
    },
  }
})())

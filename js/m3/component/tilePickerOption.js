'use strict'

m3.component.tilePickerOption = {}

m3.component.tilePickerOption.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    const _disabledModifier = 'm3-c-tilePickerOption-disabled',
      _selectedModifier = 'm3-c-tilePickerOption-selected'

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _build.call(this)

      this.attach()

      return this
    }

    function click() {
      const index = this.parent.getOptionIndex(this)
      this.parent.setSelectedIndex(index)

      return this
    }

    function getValue() {
      return this.config.tile
    }

    function isDisabled() {
      return this._rootElement.classList.contains(_disabledModifier)
    }

    function isSelected() {
      return this._rootElement.classList.contains(_selectedModifier)
    }

    function setInventory(value) {
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
    }

    function setDisabled(state) {
      if (state) {
        this._rootElement.classList.add(_disabledModifier)
      } else {
        this._rootElement.classList.remove(_disabledModifier)
      }

      return this
    }

    function setSelected(state) {
      if (state) {
        this._rootElement.classList.add(_selectedModifier)
      } else {
        this._rootElement.classList.remove(_selectedModifier)
      }

      return this
    }

    function _build() {
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
    }

    function _onClick(e) {
      e.preventDefault()
      e.stopPropagation()

      this.click()
    }

    return Object.setPrototypeOf({
      construct,
      click,
      getValue,
      isDisabled,
      isSelected,
      setInventory,
      setDisabled,
      setSelected,
    }, _prototype)
  }
)()

m3.component.tilePickerOption.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

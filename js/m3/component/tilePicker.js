'use strict'

m3.component.tilePicker = {}

m3.component.tilePicker.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _build.call(this)

      this.setSelectedIndex(0)

      return this
    }

    function getSelectedIndex() {
      for (let i = 0, length = this._option.length; i < length; i++) {
        if (this._option[i].isSelected()) {
          return i
        }
      }

      return 0
    }

    function getOption(index) {
      return this._option[index]
    }

    function getOptionIndex(option) {
      return this._option.indexOf(option)
    }

    function getOptions() {
      return utility.array.copy(this._option)
    }

    function getValue() {
      const index = this.getSelectedIndex(),
        option = this.getOption(index)

      if (option) {
        return option.getValue()
      }
    }

    function setSelectedIndex(index) {
      this._option.forEach((component, i) => {
        const isIndex = i === index,
          isSelected = component.isSelected()

        if (isSelected && !isIndex) {
          component.setSelected(false)
        }

        if (isIndex && !isSelected) {
          component.setSelected(true)
        }
      })

      return this
    }

    function _build() {
      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-tilePicker'

      _buildOptions.call(this)
    }

    function _buildOptions() {
      const optionsElement = document.createElement('ul')
      optionsElement.className = 'm3-c-tilePicker--options'
      this._rootElement.appendChild(optionsElement)

      const isValid = (config) => config && m3.model.tile.prototype.isPrototypeOf(config.tile)
      const createOption = (config) => {
        const container = document.createElement('li')
        container.className = 'm3-c-tilePicker--option'
        optionsElement.appendChild(container)

        return m3.component.tilePickerOption.create(config, container, this)
      }

      this._option = this.config.option.filter(isValid).map(createOption)
    }

    return Object.setPrototypeOf({
      construct,
      getSelectedIndex,
      getOption,
      getOptionIndex,
      getOptions,
      getValue,
      setSelectedIndex,
    }, _prototype)
  }
)()

m3.component.tilePicker.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

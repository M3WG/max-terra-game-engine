'use strict'

m3.component.tilePicker = m3.utility.component.inventFactory({
  getSelectedIndex: function () {
    for (let i = 0, length = this._option.length; i < length; i++) {
      if (this._option[i].isSelected()) {
        return i
      }
    }

    return 0
  },
  getOption: function (index) {
    return this._option[index]
  },
  getOptionIndex: function (option) {
    return this._option.indexOf(option)
  },
  getOptions: function () {
    return utility.array.copy(this._option)
  },
  getValue: function () {
    const index = this.getSelectedIndex(),
      option = this.getOption(index)

    if (option) {
      return option.getValue()
    }
  },
  setSelectedIndex: function (index) {
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
  },
  setup: function () {
    this._rootElement = document.createElement('div')
    this._rootElement.className = 'm3-c-tilePicker'

    const optionsElement = document.createElement('ul')
    optionsElement.className = 'm3-c-tilePicker--options'
    this._rootElement.appendChild(optionsElement)

    const isValid = (config) => config && m3.model.tile.is(config.tile)
    const createOption = (config) => {
      const container = document.createElement('li')
      container.className = 'm3-c-tilePicker--option'
      optionsElement.appendChild(container)

      return m3.component.tilePickerOption.create(config, container, this)
    }

    this._option = this.config.option.filter(isValid).map(createOption)

    this.setSelectedIndex(0)

    return this
  },
  teardown: function () {
    this._option.forEach((option) => option.destroy())

    return this
  },
})

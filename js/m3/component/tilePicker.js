'use strict'

m3.component.tilePicker = m3.utility.component.inventFactory({
  getOption: function (index) {
    return this._option[index]
  },
  getOptionIndex: function (option) {
    return this._option.indexOf(option)
  },
  getOptions: function () {
    return utility.array.copy(this._option)
  },
  getSelectedIndex: function () {
    for (let i = 0, length = this._option.length; i < length; i++) {
      if (this._option[i].isSelected()) {
        return i
      }
    }

    return 0
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
    const createElement = utility.dom.createElement

    this.rootElement = createElement('div', {
      props: {
        className: 'm3-c-tilePicker'
      },
      children: [
        createElement('ul', {
          props: {
            className: 'm3-c-tilePicker--options',
          },
          children: [
            createElement('ul', {
              props: {
                className: 'm3-c-tilePicker--options',
              },
              then: (element) => {
                const isValid = (data) => data && m3.model.tile.is(data.tile)
                const createOption = (data) => {
                  return m3.component.tilePickerOption.create({
                    parentComponent: this,
                    ...data
                  }).attach(createElement('li', {
                    parent: element,
                    props: {
                      className: 'm3-c-tilePicker--option',
                    },
                  }))
                }

                this._option = this.data.option.filter(isValid).map(createOption)
              }
            }),
          ],
        }),
      ],
    })

    this.setSelectedIndex(0)

    return this
  },
  teardown: function () {
    this._option.forEach((option) => option.destroy())

    return this
  },
})

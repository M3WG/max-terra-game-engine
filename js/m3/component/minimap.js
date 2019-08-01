'use strict'

m3.component.minimap = m3.utility.component.inventFactory({
  setup: function () {
    this._rootElement = document.createElement('div')
    this._rootElement.className = 'm3-c-minimap'

    return this
  },
})

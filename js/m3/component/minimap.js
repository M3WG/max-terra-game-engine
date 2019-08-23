'use strict'

m3.component.minimap = m3.utility.component.inventFactory({
  setup: function () {
    this.rootElement = document.createElement('div')
    this.rootElement.className = 'm3-c-minimap'

    return this
  },
})

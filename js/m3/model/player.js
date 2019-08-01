'use strict'

// TODO: Document internal data struct
m3.model.player = m3.utility.model.inventFactory({
  getColor: function () {
    return this.data.color;
  },
  getName: function () {
    return this.data.name
  },
  incrementScore: function (value) {
    this.score += value
    this.emit('change')

    return this
  },
  setup: function () {
    this.score = 0

    return this
  },
})

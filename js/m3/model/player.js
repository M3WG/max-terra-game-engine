'use strict'

// TODO: Document internal data struct
m3.model.player = m3.utility.model.inventFactory({
  getColor: function () {
    return this.data.color
  },
  getName: function () {
    return this.data.name
  },
  getScore: function() {
    return this.data.score
  },
  incrementScore: function (value) {
    this.data.score += value
    this.emit('change')

    return this
  },
}, {
  defaults: {
    score: 0,
  },
  validate: (data) => {
    data.score = Number(data.score)
  }
})

'use strict'

m3.model.player = m3.utility.model.inventFactory(
  ((undefined) => {

    function getColor() {
      return this.data.color;
    }

    function getName() {
      return this.data.name
    }

    function incrementScore(value) {
      this.score += value
      this.emit('change')

      return this
    }

    function setup() {
      this.score = 0

      return this
    }

    return {
      getColor,
      getName,
      incrementScore,
      setup,
    }
  })()
)

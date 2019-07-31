'use strict'

m3.model.player = m3.utility.model.inventFactory(
  ((undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.score = 0

      return this
    }

    function getColor() {
      return this.config.color;
    }

    function getName() {
      return this.config.name
    }

    function incrementScore(value) {
      this.score += value
      this.emit('change')

      return this
    }

    return {
      construct,
      getColor,
      getName,
      incrementScore,
    }
  })()
)

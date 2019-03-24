'use strict'

m3.model.player = {}

m3.model.player.prototype = (
  (undefined) => {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.score = 0

      return this
    }

    function destruct() {
      return this
    }

    // User
    // color

    function incrementScore(value) {
      this.score += value

      return this
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      incrementScore,
    }, _prototype)
  }
)()

m3.model.player.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

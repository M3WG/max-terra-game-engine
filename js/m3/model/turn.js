'use strict'

m3.model.turn = {}

m3.model.turn.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.turn.prototype = (
  function prototypeIIFE(undefined) {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      this.action = []
      this.player = this.config.player
      this.round = this.config.round

      return this
    }

    function destruct() {
      return this
    }

    function createAction(options) {
      options.turn = this

      this.action.push(
        m3.model.action.create(options)
      )

      this.emit('change')

      // XXX: Hardcoded
      const isTurnEnd = this.getActionCount() >= 3

      if (isTurnEnd) {
        this.emit('end')
      }

      return this
    }

    function getActionCount() {
      return this.action.length
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      createAction,
      getActionCount,
    }, _prototype)
  }
)()

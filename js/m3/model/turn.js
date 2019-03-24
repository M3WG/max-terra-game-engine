'use strict'

m3.model.turn = {}

m3.model.turn.prototype = (
  (undefined) => {
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

      const action = m3.model.action.create(options)
      this.action.push(action)

      this.emit('change')

      // XXX: Hardcoded
      const isTurnEnd = this.getActionCount() >= 3

      if (isTurnEnd) {
        this.emit('end')
      }

      return action
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

m3.model.turn.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

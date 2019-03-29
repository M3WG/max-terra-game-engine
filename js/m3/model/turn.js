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

    // TODO: Deprecate and prefer pushAction() via a game controller
    function createAction(options) {
      options.turn = this

      const action = m3.model.action.create(options)
      this.pushAction(action)

      return action
    }

    function getActionCount() {
      return this.action.length
    }

    function pushAction(action) {
      if (!m3.model.action.prototype.isPrototypeOf(action)) {
        throw new Error('Please provide a valid action')
      }

      this.action.push(action)
      this.emit('change')

      return this
    }

    return Object.setPrototypeOf({
      construct,
      destruct,
      createAction,
      getActionCount,
      pushAction,
    }, _prototype)
  }
)()

m3.model.turn.create = function(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

'use strict'

m3.model.turn = m3.utility.model.inventFactory(
  ((undefined) => {

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

    function setup() {
      this.action = []
      this.player = this.config.player
      this.round = this.config.round

      return this
    }

    function teardown() {
      this.action.forEach((action) => action.destroy())
      this.player = undefined
      this.round = undefined

      return this
    }

    return {
      createAction,
      getActionCount,
      pushAction,
      setup,
      teardown,
    }
  })()
)

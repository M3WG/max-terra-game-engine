'use strict'

// TODO: Document internal data struct
m3.model.turn = m3.utility.model.inventFactory({
  // TODO: Deprecate and prefer pushAction() via a game controller
  createAction: function (options) {
    options.turn = this

    const action = m3.model.action.create(options)
    this.pushAction(action)

    return action
  },
  getActionCount: function () {
    return this.action.length
  },
  pushAction: function (action) {
    if (!m3.model.action.is(action)) {
      throw new Error('Please provide a valid action')
    }

    this.action.push(action)
    this.emit('change')

    return this
  },
  setup: function () {
    this.action = []
    this.player = this.data.player
    this.round = this.data.round

    return this
  },
  teardown: function () {
    this.action.forEach((action) => action.destroy())
    this.player = undefined
    this.round = undefined

    return this
  },
})

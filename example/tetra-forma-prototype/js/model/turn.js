'use strict'

m3.model.turn.extendPrototype({
  createAction: function () {
    const action = m3.model.action.create()

    this.data.action.push(action)
    this.emit('change')

    return action
  },
  getCurrentAction: function () {
    return this.data.action[this.data.action.length - 1]
  },
  getActionCount: function () {
    return this.data.action.length
  },
  getActions: function () {
    return utility.array.copy(this.data.action)
  },
}).extendDefaults({
  action: [],
})

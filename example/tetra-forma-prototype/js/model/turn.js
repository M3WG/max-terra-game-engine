'use strict'

m3.utility.model.extend(m3.model.turn.prototype, {
  createAction: function () {
    const action = m3.model.action.create()

    this.data.actions.push(action)
    this.emit('change')

    return action
  },
  defaults: {
    actions: [],
  },
  getCurrentAction: function () {
    return this.data.actions[this.data.actions.length - 1]
  },
  getActionCount: function () {
    return this.data.actions.length
  },
  getActions: function () {
    return m3.utility.array.copy(this.data.actions)
  },
  validators: {
    actions: (values) => {
      values = m3.utility.array.copy(values)

      values.forEach((value) => {
        if (!m3.model.action.is(value)) {
          throw new Error('Please provide a valid round')
        }
      })

      return values
    },
  },
})

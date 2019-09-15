'use strict'

m3.model.cell.prototype.extend({
  defaults: {
    fog: true,
  },
  getClaim: function () {
    return this.data.claim
  },
  getFog: function () {
    return this.data.fog
  },
  setClaim: function (value) {
    this.set('claim', value)
    return this
  },
  setFog: function (value) {
    return this.set('fog', value)
  },
  validators: {
    claim: (value) => {
      if (value !== null && value !== undefined && !m3.model.claim.is(value)) {
        throw new Error('Please provide a valid claim')
      }

      return value
    },
    fog: Boolean,
  },
})

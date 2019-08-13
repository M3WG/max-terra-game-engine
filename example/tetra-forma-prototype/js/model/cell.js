'use strict'

m3.model.cell.extendPrototype({
  getClaim: function () {
    return this.get('claim')
  },
  getFog: function () {
    return this.get('fog')
  },
  setClaim: function (claim) {
    if (m3.model.claim.is(claim)) {
      this.set('claim', claim)
    }

    return this
  },
  setFog: function (value) {
    return this.set('fog', Boolean(value))
  },
}).extendDefaults({
  fog: true,
})

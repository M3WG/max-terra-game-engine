'use strict'

m3.model.claim = m3.utility.model.inventFactory({
  getCells: function () {
    return m3.utility.array.copy(this.data.cell)
  },
  getFogShape: function () {
    const radius = this.getType().getLineOfSight()

    return this.getCells().reduce((shape, cell) => {
      const cx = cell.getX(),
        cy = cell.getY(),
        map = cell.getMap(),
        slice = map.createSlice(cx - radius, cy - radius, radius * 2 + 1, radius * 2 + 1)

      // XXX: Distance formula
      const isWithinRadius = (cell) => {
        // XXX: Issue within mapSlice where getCells() returns undefined cells when out-of-bounds
        if (cell === undefined) {
          return false
        }

        return Math.sqrt(Math.pow(cx - cell.getX(), 2) + Math.pow(cy - cell.getY(), 2)) <= radius
      }

      slice.getCells()
        .filter(isWithinRadius)
        .forEach((cell) => {
          if (!shape.includes(cell)) {
            shape.push(cell)
          }
        })

      return shape
    }, [])
  },
  getPlayer: function() {
    return this.data.player
  },
  getSize: function () {
    return this.data.cell.length
  },
  getType: function() {
    return this.data.type
  },
  setup: function () {
    if (!Array.isArray(this.data.cell)) {
      this.data.cell = []
    }

    // XXX: This doesn't feel right
    // TODO: Make claiming / claim checking the responsibility of the game controller
    const setClaim = (cell) => cell.setClaim(this)
    this.getCells().forEach(setClaim)

    return this
  },
  teardown: function () {
    // XXX: Cells still hold a reference to this, see setup()
    return this
  },
})

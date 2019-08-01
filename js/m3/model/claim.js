'use strict'

m3.model.claim = m3.utility.model.inventFactory(
  ((undefined) => {

    function getCells() {
      return utility.array.copy(this.data.cell)
    }

    function getFogShape() {
      const radius = this.type.getLineOfSight()

      return this.getCells().reduce((shape, cell) => {
        const cx = cell.getX(),
          cy = cell.getY(),
          map = cell.map,
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
    }

    function getSize() {
      return this.data.cell.length
    }

    function setup() {
      this.player = this.data.player
      this.type = this.data.type

      if (!Array.isArray(this.data.cell)) {
        this.data.cell = []
      }

      // XXX: This doesn't feel right.
      _claimCells.call(this);

      return this
    }

    function teardown() {
      this.player = undefined
      this.type = undefined

      // XXX: Cells still hold a reference to this, see below

      return this
    }

    // XXX: This doesn't feel right
    // TODO: Make claiming / claim checking the responsibility of the game controller
    function _claimCells() {
      const setClaim = (cell) => cell.setClaim(this)
      this.getCells().forEach(setClaim)
    }

    return {
      getCells,
      getFogShape,
      getSize,
      setup,
      teardown,
    }
  })()
)

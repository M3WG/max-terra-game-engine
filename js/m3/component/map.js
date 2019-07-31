'use strict'

m3.component.map = m3.utility.component.inventFactory(
  ((undefined) => {

    function getCell(x, y) {
      if (this._cell[y]) {
        return this._cell[y][x]
      }
    }

    function getCells() {
      return this._cell.reduce(function reduceCells(cells, row) {
        cells.push(...row)
        return cells
      }, [])
    }

    function getModel() {
      return this.config.model
    }

    function setup() {
      this._cell = []

      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-map'

      this._table = document.createElement('table')
      this._table.className = 'm3-c-map--table'
      this._table.cellSpacing = 0
      this._rootElement.appendChild(this._table)

      const model = this.getModel()

      if (!model) {
        return
      }

      const height = model.getHeight(),
        width = model.getWidth()

      for (let y = 0; y < height; y++) {
        const tr = document.createElement('tr')
        tr.className = 'm3-c-map--row'
        this._table.appendChild(tr)

        this._cell[y] = []

        for (let x = 0; x < width; x++) {
          const td = document.createElement('td')
          td.className = 'm3-c-map--cell'

          this._cell[y][x] = m3.component.cell.create({
            model: map.getCell(x, y),
            x,
            y,
          }, td, this)

          tr.appendChild(td)
        }
      }

      this.update()

      return this
    }

    function teardown() {
      const destroyCell = (cell) => cell.destroy(),
        destroyRow = (row) => row.forEach(destroyCell)

      this._cell.forEach(destroyRow)

      return this
    }

    function update() {
      this._cell.forEach(function updateColumn(column) {
        column.forEach(function updateCell(cell) {
          cell.update()
        })
      })

      return this
    }

    return {
      getCell,
      getCells,
      getModel,
      setup,
      teardown,
      update,
    }
  })()
)

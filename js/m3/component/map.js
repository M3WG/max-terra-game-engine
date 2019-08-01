'use strict'

m3.component.map = m3.utility.component.inventFactory({
  getCell: function (x, y) {
    if (this._cell[y]) {
      return this._cell[y][x]
    }
  },
  getCells: function () {
    return this._cell.reduce((cells, row) => {
      cells.push(...row)
      return cells
    }, [])
  },
  getModel: function () {
    return this.config.model
  },
  setup: function () {
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
  },
  teardown: function () {
    const destroyCell = (cell) => cell.destroy(),
      destroyRow = (row) => row.forEach(destroyCell)

    this._cell.forEach(destroyRow)

    return this
  },
  update: function () {
    this._cell.forEach(function updateColumn(column) {
      column.forEach(function updateCell(cell) {
        cell.update()
      })
    })

    return this
  },
})

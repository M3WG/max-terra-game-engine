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
    return this.data.model
  },
  setup: function () {
    this._cell = []

    const createElement = utility.dom.createElement

    this.rootElement = createElement('div', {
      props: {
        className: 'm3-c-map',
      },
      children: [
        createElement('table', {
          assign: [this, '_table'],
          props: {
            className: 'm3-c-map--table',
            cellSpacing: 0,
          },
        }),
      ],
    })

    const model = this.getModel()

    if (!model) {
      return
    }

    const height = model.getHeight(),
      width = model.getWidth()

    for (let y = 0; y < height; y++) {
      const tr = createElement('tr', {
        parent: this._table,
        properties: {
          className: 'm3-c-map--row',
        },
      })

      this._cell[y] = []

      for (let x = 0; x < width; x++) {
        const td = createElement('td', {
          parent: tr,
          properties: {
            className: 'm3-c-map--cell',
          },
        })

        this._cell[y][x] = m3.component.cell.create({
          model: map.getCell(x, y),
          parentComponent: this,
          parentElement: td,
          x,
          y,
        })
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

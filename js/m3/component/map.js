'use strict'

m3.component.map = {}

m3.component.map.create = function create(...args) {
  const instance = Object.create(m3.component.map.prototype)
  instance.construct(...args)
  return instance
}

m3.component.map.prototype = (
  function prototypeIIFE(undefined) {
    const _delegate = m3.component.base.prototype

    function construct(...args) {
      _delegate.construct.call(this, ...args)

      this._cell = []
      _build.call(this)

      this.render().attach()

      return this
    }

    function getCell(x, y) {
      if (this._cell[y]) {
        return this._cell[y][x]
      }
    }

    function getModel() {
      return this.config.model
    }

    function render() {
      this._cell.forEach(function renderColumn(column) {
        column.forEach(function renderCell(cell) {
          cell.render()
        })
      })

      return this
    }

    function _build() {
      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-map'

      this._table = document.createElement('table')
      this._table.className = 'm3-c-map--table'
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
            onClick: this.config.onCellClick,
            x,
            y,
          }, td, this)

          tr.appendChild(td)
        }
      }
    }

    return Object.setPrototypeOf({
      construct,
      getCell,
      getModel,
      render,
    }, _delegate)
  }
)()

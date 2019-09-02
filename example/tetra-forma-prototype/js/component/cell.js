'use strict'

m3.component.cell.extendDelegate('update', (update) => function () {
  update.call(this)

  const model = this.getModel(),
    x = this.getX(),
    y = this.getY()

  const claim = model.getClaim(),
    map = model.getMap()

  if (claim) {
    const classnames = [],
      player = claim.getPlayer()

    const tests = {
      'm3-c-cell-claimDown': map.getCell(x, y + 1),
      'm3-c-cell-claimLeft': map.getCell(x - 1, y),
      'm3-c-cell-claimRight': map.getCell(x + 1, y),
      'm3-c-cell-claimUp': map.getCell(x, y - 1),
    }

    Object.entries(tests).forEach(([classname, cell]) => {
      if (cell && cell.getClaim() && cell.getClaim().getPlayer() == player) {
        classnames.push(classname)
      }
    })

    this.rootElement.classList.add('m3-c-cell-claim', ...classnames)
    this.rootElement.style.backgroundColor = player.getColor()
  } else {
    this.rootElement.classList.remove(
      'm3-c-cell-claim',
      'm3-c-cell-claimDown',
      'm3-c-cell-claimLeft',
      'm3-c-cell-claimRight',
      'm3-c-cell-claimUp',
    )
  }

  if (model.getFog()) {
    this.rootElement.classList.add('m3-c-cell-fog')
  } else {
    this.rootElement.classList.remove('m3-c-cell-fog')
  }

  return this
})

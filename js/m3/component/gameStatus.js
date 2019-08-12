'use strict'

m3.component.gameStatus = m3.utility.component.inventFactory({
  getModel: function () {
    return this.config.model
  },
  setup: function () {
    this._rootElement = document.createElement('div')
    this._rootElement.className = 'm3-c-gameStatus'

    const items = document.createElement('ul')
    items.className = 'm3-c-gameStatus--items'
    this._rootElement.appendChild(items)

    const round = document.createElement('li')
    round.className = 'm3-c-gameStatus--item m3-c-gameStatus--round'
    round.innerHTML = '<div class="m3-c-gameStatus--label">Round</div>'
    items.appendChild(round)

    this._roundValue = document.createElement('div')
    this._roundValue.className = 'm3-c-gameStatus--value'
    round.appendChild(this._roundValue)

    const turn = document.createElement('li')
    turn.className = 'm3-c-gameStatus--item m3-c-gameStatus--turn'
    items.appendChild(turn)

    this._turnColor = document.createElement('div')
    this._turnColor.className = 'm3-c-gameStatus--color'
    turn.appendChild(this._turnColor)

    this._turnValue = document.createElement('div')
    this._turnValue.className = 'm3-c-gameStatus--value'
    turn.appendChild(this._turnValue)

    const action = document.createElement('li')
    action.className = 'm3-c-gameStatus--item m3-c-gameStatus--action'
    action.innerHTML = '<div class="m3-c-gameStatus--label">Actions</div>'
    items.appendChild(action)

    this._actionValue = document.createElement('div')
    this._actionValue.className = 'm3-c-gameStatus--value'
    action.appendChild(this._actionValue)

    this.update()

    return this
  },
  update: function () {
    const game = this.getModel(),
      round = game.getCurrentRound(),
      turn = round.getCurrentTurn()

    const player = turn.getPlayer()

    this._roundValue.innerHTML = game.getRoundCount()
    this._turnColor.style.backgroundColor = player.getColor()
    this._turnValue.innerHTML = player.getName()
    // XXX: Hardcoded at 4 actions per turn
    this._actionValue.innerHTML = 4 - turn.getActionCount()

    return this
  },
})

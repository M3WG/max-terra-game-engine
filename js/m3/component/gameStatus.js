'use strict'

m3.component.gameStatus = {}

m3.component.gameStatus.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _build.call(this)

      this.render()

      return this
    }

    function getModel() {
      return this.config.model
    }

    function render() {
      const game = this.getModel(),
        round = game.getCurrentRound(),
        turn = round.getCurrentTurn()

      this._roundValue.innerHTML = game.getRoundCount()
      this._turnColor.style.backgroundColor = turn.player.getColor()
      this._turnValue.innerHTML = turn.player.getName()
      this._actionValue.innerHTML = turn.getActionCount() + 1
    }

    function _build() {
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
      action.innerHTML = '<div class="m3-c-gameStatus--label">Action</div>'
      items.appendChild(action)

      this._actionValue = document.createElement('div')
      this._actionValue.className = 'm3-c-gameStatus--value'
      action.appendChild(this._actionValue)
    }

    return Object.setPrototypeOf({
      construct,
      getModel,
      render,
    }, _prototype)
  }
)()

m3.component.gameStatus.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

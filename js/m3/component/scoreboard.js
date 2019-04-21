'use strict'

m3.component.scoreboard = {}

m3.component.scoreboard.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _build.call(this)

      return this
    }

    function _build() {
      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-scoreboard'

      _buildPlayers.call(this)
    }

    function _buildPlayers() {
      const container = document.createElement('ul')
      container.className = 'm3-c-scoreboard--players'
      this._rootElement.appendChild(container)

      const isValid = (player) => m3.model.player.prototype.isPrototypeOf(player)
      const createPlayer = (player) => m3.component.scoreboardPlayer.create({model: player}, container, this)

      this._player = this.config.player.filter(isValid).map(createPlayer)
    }

    return Object.setPrototypeOf({
      construct,
    }, _prototype)
  }
)()

m3.component.scoreboard.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

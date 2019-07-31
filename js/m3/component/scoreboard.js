'use strict'

m3.component.scoreboard = m3.utility.component.inventFactory(
  ((undefined) => {

    function setup() {
      this._rootElement = document.createElement('div')
      this._rootElement.className = 'm3-c-scoreboard'

      _buildPlayers.call(this)

      return this
    }

    function teardown() {
      this._player.forEach((component) => component.destroy())

      return this
    }

    function _buildPlayers() {
      const container = document.createElement('ul')
      container.className = 'm3-c-scoreboard--players'
      this._rootElement.appendChild(container)

      const isValid = (player) => m3.model.player.prototype.isPrototypeOf(player)
      const createPlayer = (player) => m3.component.scoreboardPlayer.create({model: player}, container, this)

      this._player = this.config.player.filter(isValid).map(createPlayer)
    }

    return {
      setup,
      teardown,
    }
  })()
)

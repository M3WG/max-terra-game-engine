'use strict'

m3.component.scoreboard = m3.utility.component.inventFactory({
  setup: function () {
    this._rootElement = document.createElement('div')
    this._rootElement.className = 'm3-c-scoreboard'

    const container = document.createElement('ul')
    container.className = 'm3-c-scoreboard--players'
    this._rootElement.appendChild(container)

    const isValid = (player) => m3.model.player.is(player)
    const createPlayer = (player) => m3.component.scoreboardPlayer.create({model: player}, container, this)

    this._player = this.config.players.filter(isValid).map(createPlayer)

    return this
  },
  teardown: function () {
    this._player.forEach((component) => component.destroy())

    return this
  },
})

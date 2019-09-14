'use strict'

m3.component.scoreboard = m3.utility.component.inventFactory({
  setup: function () {
    const createElement = utility.dom.createElement

    this.rootElement = createElement('div', {
      props: {
        className: 'm3-c-scoreboard',
      },
      children: [
        createElement('ul', {
          parent: this.rootElement,
          props: {
            className: 'm3-c-scoreboard--players',
          },
          then: (element) => {
            const isValid = (player) => m3.model.player.is(player)
            const createPlayer = (player) => m3.component.scoreboardPlayer.create({
              model: player,
              parentComponent: this,
              parentElement: element
            })

            this._player = this.data.players.filter(isValid).map(createPlayer)
          },
        }),
      ]
    })

    return this
  },
  teardown: function () {
    this._player.forEach((component) => component.destroy())

    return this
  },
})

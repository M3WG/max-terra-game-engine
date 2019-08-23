'use strict'

m3.component.gameStatus = m3.utility.component.inventFactory({
  getModel: function () {
    return this.config.model
  },
  setup: function () {
    this.rootElement = document.createElement('div')
    this.rootElement.className = 'm3-c-gameStatus'

    const createElement = utility.dom.createElement

    createElement('ul', {
      parent: this.rootElement,
      props: {
        className: 'm3-c-gameStatus--items',
      },
      children: [
        createElement('li', {
          props: {
            className: 'm3-c-gameStatus--item m3-c-gameStatus--round',
          },
          children: [
            createElement('div', {
              props: {
                className: 'm3-c-gameStatus--label',
                innerHTML: 'Round',
              },
            }),
            createElement('div', {
              assign: (x) => this._roundValue = x,
              props: {
                className: 'm3-c-gameStatus--value',
              },
            }),
          ],
        }),
        createElement('li', {
          props: {
            className: 'm3-c-gameStatus--item m3-c-gameStatus--turn',
          },
          children: [
            createElement('div', {
              assign: (x) => this._turnColor = x,
              props: {
                className: 'm3-c-gameStatus--color',
              },
            }),
            createElement('div', {
              assign: (x) => this._turnValue = x,
              props: {
                className: 'm3-c-gameStatus--value',
              },
            })
          ],
        }),
        createElement('li', {
          props: {
            className: 'm3-c-gameStatus--item m3-c-gameStatus--action',
          },
          children: [
            createElement('div', {
              props: {
                className: 'm3-c-gameStatus--label',
                innerHTML: 'Action',
              },
            }),
            createElement('div', {
              assign: (x) => this._actionValue = x,
              props: {
                className: 'm3-c-gameStatus--value',
              },
            }),
          ],
        }),
      ],
    })

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

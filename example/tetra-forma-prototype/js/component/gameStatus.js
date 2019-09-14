'use strict'

m3.component.gameStatus = m3.utility.component.inventFactory({
  getModel: function () {
    return this.data.model
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
              assign: [this, '_roundValue'],
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
              assign: [this, '_turnColor'],
              props: {
                className: 'm3-c-gameStatus--color',
              },
            }),
            createElement('div', {
              assign: [this, '_turnValue'],
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
              assign: [this, '_actionValue'],
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

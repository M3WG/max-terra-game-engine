'use strict'

m3.component.scoreboardPlayer = m3.utility.component.inventFactory({
  getModel: function () {
    return this.data.model
  },
  setup: function () {
    const createElement = m3.utility.dom.createElement

    this.rootElement = createElement('li', {
      props: {
        className: 'm3-c-scoreboard--player',
      },
      children: [
        createElement('div', {
          assign: [this, '_color'],
          props: {
            className: 'm3-c-scoreboard--playerColor',
          },
        }),
        createElement('div', {
          assign: [this, '_name'],
          props: {
            className: 'm3-c-scoreboard--playerName',
          },
        }),
        createElement('div', {
          assign: [this, '_score'],
          props: {
            className: 'm3-c-scoreboard--playerScore',
          },
        }),
      ],
    })

    const model = this.getModel()

    if (model) {
      model.on('change', this.update.bind(this))
    }

    this.update()

    return this
  },
  update: function () {
    const model = this.getModel()

    this._color.style.backgroundColor = model.getColor()
    this._name.innerHTML = model.getName()
    this._score.innerHTML = model.getScore()

    return this
  },
})

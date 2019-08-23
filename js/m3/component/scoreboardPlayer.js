'use strict'

m3.component.scoreboardPlayer = m3.utility.component.inventFactory({
  getModel: function () {
    return this.config.model
  },
  setup: function () {
    this.rootElement = document.createElement('li')
    this.rootElement.className = 'm3-c-scoreboard--player'

    this._color = document.createElement('div')
    this._color.className = 'm3-c-scoreboard--playerColor'
    this.rootElement.appendChild(this._color)

    this._name = document.createElement('div')
    this._name.className = 'm3-c-scoreboard--playerName'
    this.rootElement.appendChild(this._name)

    this._score = document.createElement('div')
    this._score.className = 'm3-c-scoreboard--playerScore'
    this.rootElement.appendChild(this._score)

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

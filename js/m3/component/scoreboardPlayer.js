'use strict'

m3.component.scoreboardPlayer = {}

m3.component.scoreboardPlayer.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      const model = this.getModel()

      _build.call(this)

      if (model) {
        model.on('change', _onModelChange.bind(this))
      }

      this.render().attach()

      return this
    }

    function getModel() {
      return this.config.model
    }

    function render() {
      const model = this.getModel()

      this._color.style.backgroundColor = model.getColor()
      this._name.innerHTML = model.getName()
      this._score.innerHTML = model.score

      return this
    }

    function _build() {
      this._rootElement = document.createElement('li')
      this._rootElement.className = 'm3-c-scoreboard--player'

      this._color = document.createElement('div')
      this._color.className = 'm3-c-scoreboard--playerColor'
      this._rootElement.appendChild(this._color)

      this._name = document.createElement('div')
      this._name.className = 'm3-c-scoreboard--playerName'
      this._rootElement.appendChild(this._name)

      this._score = document.createElement('div')
      this._score.className = 'm3-c-scoreboard--playerScore'
      this._rootElement.appendChild(this._score)
    }

    function _onModelChange(data) {
      this.render()
    }

    return Object.setPrototypeOf({
      construct,
      getModel,
      render,
    }, _prototype)
  }
)()

m3.component.scoreboardPlayer.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}

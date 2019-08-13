m3.model.tile.data = {
  'empty': {
    icon: '',
  },
  'O': {
    icon: 'O',
  },
  'X' : {
    icon: 'X',
  },
}

const players = [
  m3.model.player.create({
    color: '#FF0000',
    name: 'Player 1',
  }),
  m3.model.player.create({
    color: '#0000FF',
    name: 'Player 2',
  }),
]

const game = m3.model.game.create({
  player: players,
})

const map = m3.model.map.create({
  height: 3,
  width: 3,
})

const mapComponent = m3.component.map.create({
  model: map,
}, document.querySelector('.xo-o-map'))

const scoreboardComponent = m3.component.scoreboard.create({
  player: players,
})

mapComponent.getCells().forEach((cell) => cell.on('click', () => onCellClick(cell)))

function onCellClick(cellComponent) {

}

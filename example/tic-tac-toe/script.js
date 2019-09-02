m3.model.tile.data = {
  'empty': {
    color: '',
    icon: '&nbsp;',
  },
  'O': {
    color: '#0000FF',
    icon: 'O',
  },
  'X' : {
    color: '#FF0000',
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

let currentPlayer = players[0]

const map = m3.model.map.create({
  height: 3,
  width: 3,
})

clearMap()

const mapComponent = m3.component.map.create({
  model: map,
}).attach(document.querySelector('.xo-o-app--map'))

mapComponent.getCells().forEach((cell) => cell.on('click', () => onCellClick(cell)))

const scoreboardComponent = m3.component.scoreboard.create({
  players,
}).attach(document.querySelector('.xo-o-app--scoreboard'))

function clearMap() {
  m3.utility.map.fill(map, m3.model.tile.get('empty'))
}

function onCellClick(cellComponent) {
  const cell = cellComponent.getModel()

  if (cell.getTile().getId() != 'empty') {
    return
  }

  const tile = m3.model.tile.get(currentPlayer === players[0] ? 'X' : 'O')
  cell.setTile(tile)

  const isMatch = (x) => x && x.getTile() === tile
  const shapes = [
    {
      definition: [
        {dx: 0, dy: 0},
        {dx: 1, dy: 0},
        {dx: 2, dy: 0},
      ],
      rotate: true,
    },
    {
      definition: [
        {dx: 0, dy: 0},
        {dx: 1, dy: 1},
        {dx: 2, dy: 2},
      ],
      mirror: true,
    },
  ]

  if (m3.utility.match.shapes(cell, shapes, isMatch)) {
    currentPlayer.incrementScore(1)
    alert(currentPlayer.getName() + ' wins!')
    currentPlayer = players[0]
    clearMap()
  } else if (m3.utility.map.getPercent(map, (cell) => cell.getTile().getId() == 'empty') == 0) {
    alert('Draw!')
    clearMap()
  } else {
    swapPlayers()
  }
}

function swapPlayers() {
  if (currentPlayer === players[0]) {
    currentPlayer = players[1]
  } else {
    currentPlayer = players[0]
  }
}

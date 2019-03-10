'use strict'

m3.config.claimTypes = {
  1: {
    id: 1,
    name: 'city',
    priority: 1,
    shape: {
      mirror: false,
      rotate: false,
      test: [
        [
          {dx: 0, dy: 0, tile: 1},
          {dx: 1, dy: 0, tile: 1},
          {dx: 0, dy: 1, tile: 1},
          {dx: 1, dy: 1, tile: 1},
        ],
        [
          {dx: 0, dy: 0, tile: 1},
          {dx: -1, dy: 0, tile: 1},
          {dx: 0, dy: 1, tile: 1},
          {dx: -1, dy: 1, tile: 1},
        ],
        [
          {dx: 0, dy: 0, tile: 1},
          {dx: 1, dy: 0, tile: 1},
          {dx: 0, dy: -1, tile: 1},
          {dx: 1, dy: -1, tile: 1},
        ],
        [
          {dx: 0, dy: 0, tile: 1},
          {dx: -1, dy: 0, tile: 1},
          {dx: 0, dy: -1, tile: 1},
          {dx: -1, dy: -1, tile: 1},
        ],
      ],
    },
  },
  2: {
    id: 2,
    name: 'farmstead',
    priority: 1,
    shape: {
      mirror: true,
      rotate: true,
      test: [
        [
          {dx: 0, dy: 0, tile: 3},
          {dx: 1, dy: 0, tile: 3},
          {dx: 2, dy: 0, tile: 3},
          {dx: 0, dy: 1, tile: 3},
        ],
        [
          {dx: 0, dy: 0, tile: 3},
          {dx: -1, dy: 0, tile: 3},
          {dx: 1, dy: 0, tile: 3},
          {dx: -1, dy: 1, tile: 3},
        ],
        [
          {dx: 0, dy: 0, tile: 3},
          {dx: -1, dy: 0, tile: 3},
          {dx: -2, dy: 0, tile: 3},
          {dx: -2, dy: 1, tile: 3},
        ],
        [
          {dx: 0, dy: 0, tile: 3},
          {dx: 0, dy: -1, tile: 3},
          {dx: 1, dy: -1, tile: 3},
          {dx: 2, dy: -1, tile: 3},
        ],
      ],
    },
  },
  3: {
    id: 3,
    name: 'logging camp',
    priority: 1,
    shape: {
      mirror: true,
      rotate: true,
      test: [
        [
          {dx: 0, dy: 0, tile: 4},
          {dx: 1, dy: 0, tile: 4},
          {dx: 1, dy: 1, tile: 4},
          {dx: 2, dy: 1, tile: 4},
        ],
        [
          {dx: 0, dy: 0, tile: 4},
          {dx: -1, dy: 0, tile: 4},
          {dx: 0, dy: 1, tile: 4},
          {dx: 1, dy: 1, tile: 4},
        ],
        [
          {dx: 0, dy: 0, tile: 4},
          {dx: -1, dy: -1, tile: 4},
          {dx: 0, dy: -1, tile: 4},
          {dx: 1, dy: 0, tile: 4},
        ],
        [
          {dx: 0, dy: 0, tile: 4},
          {dx: -2, dy: -1, tile: 4},
          {dx: -1, dy: -1, tile: 4},
          {dx: -1, dy: 0, tile: 4},
        ],
      ],
    },
  },
  4: {
    id: 4,
    name: 'mine',
    priority: 1,
    shape: {
      mirror: false,
      rotate: true,
      test: [
        [
          {dx: 0, dy: 0, tile: 5},
          {dx: -1, dy: 1, tile: 5},
          {dx: 0, dy: 1, tile: 5},
          {dx: 1, dy: 1, tile: 5},
        ],
        [
          {dx: 0, dy: 0, tile: 5},
          {dx: 1, dy: -1, tile: 5},
          {dx: 1, dy: 0, tile: 5},
          {dx: 2, dy: 0, tile: 5},
        ],
        [
          {dx: 0, dy: 0, tile: 5},
          {dx: 0, dy: -1, tile: 5},
          {dx: -1, dy: 0, tile: 5},
          {dx: 1, dy: 0, tile: 5},
        ],
        [
          {dx: 0, dy: 0, tile: 5},
          {dx: -1, dy: 0, tile: 5},
          {dx: -1, dy: -1, tile: 5},
          {dx: -2, dy: 0, tile: 5},
        ],
      ],
    },
  },
}

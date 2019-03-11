'use strict'

m3.config.claimTypes = {
  1: {
    id: 1,
    name: 'city',
    priority: 1,
    shape: {
      mirror: false,
      permutation: [
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
      rotate: false,
    },
  },
  2: {
    id: 2,
    name: 'farmstead',
    priority: 1,
    shape: {
      mirror: true,
      permutation: [
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
      rotate: true,
    },
  },
  3: {
    id: 3,
    name: 'logging camp',
    priority: 1,
    shape: {
      mirror: true,
      permutation: [
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
      rotate: true,
    },
  },
  4: {
    id: 4,
    name: 'mine',
    priority: 1,
    shape: {
      mirror: false,
      permutation: [
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
      rotate: true,
    },
  },
}

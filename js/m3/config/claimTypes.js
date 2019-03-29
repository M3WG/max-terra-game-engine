'use strict'

m3.config.claimTypes = {
  1: {
    id: 1,
    lineOfSight: 1,
    name: 'city',
    priority: 1,
    score: 24,
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
    lineOfSight: 4,
    name: 'farmstead',
    priority: 1,
    score: 8,
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
    lineOfSight: 3,
    name: 'logging camp',
    priority: 1,
    score: 12,
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
    lineOfSight: 2,
    name: 'quarry',
    score: 16,
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
  5: {
    id: 5,
    lineOfSight: 2,
    name: 'mine',
    priority: 1,
    score: 20,
    shape: {
      mirror: false,
      permutation: [
        [
          {dx: 0, dy: 0, tile: 6},
          {dx: 1, dy: 0, tile: 6},
          {dx: 2, dy: 0, tile: 6},
          {dx: 3, dy: 0, tile: 6},
        ],
        [
          {dx: -1, dy: 0, tile: 6},
          {dx: 0, dy: 0, tile: 6},
          {dx: 1, dy: 0, tile: 6},
          {dx: 2, dy: 0, tile: 6},
        ],
      ],
      rotate: true,
    },
  },
  6: {
    id: 6,
    lineOfSight: 6,
    name: 'tower',
    priority: 1,
    score: 0,
    shape: {
      mirror: false,
      permutation: [
        [
          {dx: 0, dy: 0, tile: 7},
        ],
      ],
      rotate: false,
    },
  },
}

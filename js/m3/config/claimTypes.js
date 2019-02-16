'use strict'

m3.config.claimTypes = {
  1: {
    id: 1,
    name: 'city',
    priority: 1,
    shape: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
  },
  2: {
    id: 2,
    name: 'farmstead',
    priority: 1,
    shape: [
      [
        [3, 3, 3],
        [3, 0, 0],
      ],
      [
        [3, 0, 0],
        [3, 3, 3],
      ],
    ],
  },
  3: {
    id: 3,
    name: 'logging camp',
    priority: 1,
    shape: [
      [
        [4, 4, 0],
        [0, 4, 4],
      ],
      [
        [0, 4, 4],
        [4, 4, 0],
      ],
    ],
  },
  4: {
    id: 4,
    name: 'mine',
    priority: 1,
    shape: [
      [
        [5, 5, 5],
        [0, 5, 0],
      ],
    ]
  },
}

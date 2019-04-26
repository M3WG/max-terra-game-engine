'use strict'

m3.config.shapes = [
  {
    mirror: false,
    permutation: [
      [
        {dx: 0, dy: 0},
        {dx: 1, dy: 0},
        {dx: 0, dy: 1},
        {dx: 1, dy: 1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: -1, dy: 0},
        {dx: 0, dy: 1},
        {dx: -1, dy: 1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: 1, dy: 0},
        {dx: 0, dy: -1},
        {dx: 1, dy: -1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: -1, dy: 0},
        {dx: 0, dy: -1},
        {dx: -1, dy: -1},
      ],
    ],
    rotate: false,
  },
  {
    mirror: true,
    permutation: [
      [
        {dx: 0, dy: 0},
        {dx: 1, dy: 0},
        {dx: 2, dy: 0},
        {dx: 0, dy: 1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: -1, dy: 0},
        {dx: 1, dy: 0},
        {dx: -1, dy: 1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: -1, dy: 0},
        {dx: -2, dy: 0},
        {dx: -2, dy: 1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: 0, dy: -1},
        {dx: 1, dy: -1},
        {dx: 2, dy: -1},
      ],
    ],
    rotate: true,
  },
  {
    mirror: true,
    permutation: [
      [
        {dx: 0, dy: 0},
        {dx: 1, dy: 0},
        {dx: 1, dy: 1},
        {dx: 2, dy: 1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: -1, dy: 0},
        {dx: 0, dy: 1},
        {dx: 1, dy: 1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: -1, dy: -1},
        {dx: 0, dy: -1},
        {dx: 1, dy: 0},
      ],
      [
        {dx: 0, dy: 0},
        {dx: -2, dy: -1},
        {dx: -1, dy: -1},
        {dx: -1, dy: 0},
      ],
    ],
    rotate: true,
  },
  {
    mirror: false,
    permutation: [
      [
        {dx: 0, dy: 0},
        {dx: -1, dy: 1},
        {dx: 0, dy: 1},
        {dx: 1, dy: 1},
      ],
      [
        {dx: 0, dy: 0},
        {dx: 1, dy: -1},
        {dx: 1, dy: 0},
        {dx: 2, dy: 0},
      ],
      [
        {dx: 0, dy: 0},
        {dx: 0, dy: -1},
        {dx: -1, dy: 0},
        {dx: 1, dy: 0},
      ],
      [
        {dx: 0, dy: 0},
        {dx: -1, dy: 0},
        {dx: -1, dy: -1},
        {dx: -2, dy: 0},
      ],
    ],
    rotate: true,
  },
  {
    mirror: false,
    permutation: [
      [
        {dx: 0, dy: 0},
        {dx: 1, dy: 0},
        {dx: 2, dy: 0},
        {dx: 3, dy: 0},
      ],
      [
        {dx: -1, dy: 0},
        {dx: 0, dy: 0},
        {dx: 1, dy: 0},
        {dx: 2, dy: 0},
      ],
    ],
    rotate: true,
  },
]

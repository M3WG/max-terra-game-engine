'use strict'

m3.config.claimTypes = {
  1: {
    id: 1,
    lineOfSight: 2,
    name: 'city',
    priority: 1,
    score: 24,
    type: 1,
  },
  2: {
    id: 2,
    lineOfSight: 3,
    name: 'farmstead',
    priority: 1,
    score: 8,
    type: 3,
  },
  3: {
    id: 3,
    lineOfSight: 3,
    name: 'logging camp',
    priority: 1,
    score: 12,
    type: 4,
  },
  4: {
    id: 4,
    lineOfSight: 2,
    name: 'quarry',
    score: 16,
    priority: 1,
    type: 5,
  },
  5: {
    id: 5,
    lineOfSight: 2,
    name: 'mine',
    priority: 1,
    score: 20,
    type: 6,
  },
  6: {
    id: 6,
    lineOfSight: 6,
    name: 'tower',
    priority: 1,
    score: 0,
    type: 7,
  },
}

// Fun fact: Semi-colon prevents "Uncaught TypeError: {(intermediate value)...} is not a function"
;(function normalize() {
  Object.values(m3.config.claimTypes).filter((type) => type.id !== 6).forEach((type) => {
    type.score = 1
    type.lineOfSight = 3
  })
})()

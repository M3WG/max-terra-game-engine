'use strict'

// TODO: Separate scoring into m3.config.economy?

m3.config.claimTypes = {
  1: {
    id: 1,
    lineOfSight: 3,
    multiplier: 1,
    name: 'city',
    priority: 1,
    score: 10,
    type: 1,
  },
  2: {
    id: 2,
    lineOfSight: 3,
    multiplier: 1,
    name: 'farmstead',
    priority: 1,
    score: 10,
    type: 3,
  },
  3: {
    id: 3,
    lineOfSight: 3,
    multiplier: 1,
    name: 'logging camp',
    priority: 1,
    score: 10,
    type: 4,
  },
  4: {
    id: 4,
    lineOfSight: 3,
    multiplier: 1,
    name: 'quarry',
    score: 10,
    priority: 1,
    type: 5,
  },
  5: {
    id: 5,
    lineOfSight: 3,
    multiplier: 1,
    name: 'mine',
    priority: 1,
    score: 100,
    type: 6,
  },
  6: {
    id: 6,
    lineOfSight: 6,
    multiplier: 1,
    name: 'tower',
    priority: 1,
    score: 0,
    type: 7,
  },
}

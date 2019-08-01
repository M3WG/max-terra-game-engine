'use strict'

var utility = utility || {}

utility.fn = {
  const: (x) => () => x,
  compose: (...fns) => (x) => fns.reduceRight((v, fn) => fn(v), x),
  identity: (x) => x,
  pipe: (...fns) => (x) => fns.reduce((v, fn) => fn(v), x),
  unary: (fn) => (x) => fn(x),
}

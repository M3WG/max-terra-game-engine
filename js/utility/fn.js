'use strict'

var utility = utility || {}

utility.fn = {}
utility.fn.compose = (...fns) => (x) => fns.reduceRight((v, fn) => fn(v), x)
utility.fn.identity = (x) => () => x
utility.fn.pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x)
utility.fn.unary = (fn) => (x) => fn(x)

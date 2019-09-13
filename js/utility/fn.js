'use strict'

/**
 * Pure utility functions for functional composition.
 *
 * @namespace utility.fn
 */
utility.fn = {
  /**
   * @param {...function} fns
   * @returns {function}
   */
  compose: (...fns) => (x) => fns.reduceRight((v, fn) => fn(v), x),
  /**
   * @param {*} x
   * @returns {function}
   */
  const: (x) => () => x,
  /**
   * @returns {function}
   */
  identity: () => (x) => x,
  /**
   * @param {...function} fns
   * @returns {function}
   */
  pipe: (...fns) => (x) => fns.reduce((v, fn) => fn(v), x),
  /**
   * @param {function} fn
   * @returns {function}
   */
  unary: (fn) => (x) => fn(x),
}

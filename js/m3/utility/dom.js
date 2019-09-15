'use strict'

/**
 * Utility functions for manipulating the DOM.
 *
 * @namespace m3.utility.dom
 */
m3.utility.dom = {}

/**
 * Returns whether the inner node is a descendent of the outer node.
 *
 * @param {Node} outer
 * @param {Node} inner
 * @returns {boolean}
 */
m3.utility.dom.contains = (outer, inner) => {
  do {
    if (!(inner instanceof Node)) {
      return false
    }
    if (inner === outer) {
      return true
    }
  } while (inner = inner.parentNode)

  return false
}

/**
 * Helper for creating an element with a tagName and options.
 *
 * @param {string} tagName
 * @param {object} [options]
 * @param {array} [options.assign] - Array of `[object, key]`, such that `object.key = element`
 * @param {object} [options.attrs] - Hash of attributes to apply via element.setAttribute()
 * @param {array} [options.children] - Array of child text nodes, elements, or components
 * @param {object} [options.data] - Hash of properties to apply to element.dataset
 * @param {array} [options.listeners] - Array of argument arrays to apply via element.addEventListener()
 * @param {object} [options.props] - Hash of properties to apply to element
 * @param {Node} [options.parent] - Appends element as its child
 * @param {object} [options.style] - Hash of properties to apply to element.style
 * @param {function} [options.then] - Callback function called with element before returning it
 * @returns {Element}
 */
m3.utility.dom.createElement = (tagName, {assign, attrs, children, data, listeners, props, parent, style, then}) => {
  const element = document.createElement(tagName)

  if (Array.isArray(assign)) {
    const [context, key] = assign

    if (context) {
      context[key] = element
    }
  }

  for (let key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      element.setAttribute(key, attrs[key])
    }
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (m3.utility.component.is(child)) {
        child.attach(element)
        return
      }

      if (typeof child =='string') {
        child = document.createTextNode(child)
      }

      element.appendChild(child)
    })
  }

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      element.dataset[key] = data[key]
    }
  }

  if (Array.isArray(listeners)) {
    listeners.forEach(([...args]) => {
      element.addEventListener(...args)
    })
  }

  if (parent instanceof Node) {
    parent.appendChild(element)
  }

  for (let key in props) {
    if (props.hasOwnProperty(key) && key in element) {
      element[key] = props[key]
    }
  }

  for (let key in style) {
    if (style.hasOwnProperty(key) && key in element.style) {
      element.style[key] = style[key]
    }
  }

  if (typeof then == 'function') {
    then(element)
  }

  return element
}

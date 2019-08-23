'use strict'

utility.dom = {}

utility.dom.contains = (outer, inner) => {
  do {
    if (!(inner instanceof Element)) {
      return false
    }
    if (inner === outer) {
      return true
    }
  } while (inner = inner.parentNode)

  return false
}

utility.dom.createElement = (tagName, {assign, children, props, parent}) => {
  const element = document.createElement(tagName)

  for (let prop in props) {
    if (props.hasOwnProperty(prop) && prop in element) {
      element[prop] = props[prop]
    }
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (!(child instanceof Node)) {
        child = document.createTextNode(child)
      }

      element.appendChild(child)
    });
  }

  if (parent instanceof Node) {
    parent.appendChild(element)
  }

  if (typeof assign == 'function') {
    assign(element)
  }

  return element
}

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

utility.dom.createElement = (tagName, options = {}) => {
  const element = document.createElement(tagName)

  for (let property in properties) {
    if (properties.hasOwnProperty(property) && property in element) {
      element[property] = properties[property]
    }
  }

  if (Array.isArray(options.children)) {
    options.children.forEach((child) => {
      if (!(child instanceof Node)) {
        child = document.createTextNode(child)
      }

      element.appendChild(child)
    });
  }

  if (options.parent instanceof Node) {
    options.parent.appendChild(element)
  }

  return element
}

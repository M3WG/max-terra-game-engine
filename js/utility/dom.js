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

utility.dom.createElement = (tagName, {assign, children, identity, listeners, props, parent}) => {
  const element = document.createElement(tagName)

  for (let prop in props) {
    if (props.hasOwnProperty(prop) && prop in element) {
      element[prop] = props[prop]
    }
  }

  if (Array.isArray(listeners)) {
    listeners.forEach(([...args]) => {
      element.addEventListener(...args)
    })
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (!(child instanceof Node)) {
        child = document.createTextNode(child)
      }

      element.appendChild(child)
    })
  }

  if (parent instanceof Node) {
    parent.appendChild(element)
  }

  if (Array.isArray(assign)) {
    const [context, key] = assign;

    if (context) {
      context[key] = element;
    }
  }

  if (typeof identity == 'function') {
    identity(element)
  }

  return element
}

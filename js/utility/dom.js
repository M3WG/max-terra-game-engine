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

utility.dom.createElement = (tagName, {assign, children, listeners, props, parent, styles, then}) => {
  const element = document.createElement(tagName)

  if (Array.isArray(assign)) {
    const [context, key] = assign;

    if (context) {
      context[key] = element;
    }
  }

  for (let prop in props) {
    if (props.hasOwnProperty(prop) && prop in element) {
      element[prop] = props[prop]
    }
  }

  for (let style in styles) {
    if (styles.hasOwnProperty(style) && style in element.style) {
      element.style[style] = styles[style]
    }
  }

  if (Array.isArray(listeners)) {
    listeners.forEach(([...args]) => {
      element.addEventListener(...args)
    })
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (m3.component.base.is(child)) {
        child.attach(element)
        return
      }

      if (typeof child =='string') {
        child = document.createTextNode(child)
      }

      element.appendChild(child)
    })
  }

  if (parent instanceof Node) {
    parent.appendChild(element)
  }

  if (typeof then == 'function') {
    then(element)
  }

  return element
}

'use strict'

utility.dom = {}

utility.dom.contains = (outer, inner) => {
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

utility.dom.createElement = (tagName, {assign, children, data, listeners, props, parent, style, then}) => {
  const element = document.createElement(tagName)

  if (Array.isArray(assign)) {
    const [context, key] = assign

    if (context) {
      context[key] = element
    }
  }

  for (let key in props) {
    if (props.hasOwnProperty(key) && key in element) {
      element[key] = props[key]
    }
  }

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      element.dataset[key] = data[key]
    }
  }

  for (let key in style) {
    if (style.hasOwnProperty(key) && key in element.style) {
      element.style[key] = style[key]
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

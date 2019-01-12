Reusable interface components that make up the prototype.
They consist of two parts: the prototype and one or more factory methods.

Please assign these to the `m3.component` namespace:
```js
/**
 * @file js/m3/component/foo.js
 */
'use strict'

m3.component.foo = {}

m3.component.foo.create = function create(...args) {
  const instance = Object.create(m3.component.foo.prototype)
  return instance.construct(...args)
}

m3.component.foo.prototype = (
  function prototypeIIFE() {
    const _delegate = m3.component.base.prototype

    return Object.setPrototypeOf({

    }, _delegate)
  }
)()
```

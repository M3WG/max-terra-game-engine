Reusable models representing game concepts.
They consist of two parts: the prototype and one or more factory methods.
Typically their prototypes extend `m3.model.base.prototype`.

Please assign these to the `m3.model` namespace:
```js
/**
 * @file js/m3/model/foo.js
 */
'use strict'

m3.model.foo = {}

m3.model.foo.create = function create(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.model.foo.prototype = (
  function prototypeIIFE() {
    const _prototype = m3.model.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      return this
    }

    return Object.setPrototypeOf({
      construct,
    }, _prototype)
  }
)()
```

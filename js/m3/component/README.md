Reusable interface components that make up the prototype.
They consist of two parts: the prototype and one or more factory methods.
Typically their prototypes extend `m3.component.base.prototype`.

Please assign these to the `m3.component` namespace:
```js
/**
 * @file js/m3/component/foo.js
 */
'use strict'

m3.component.foo = {}

m3.component.foo.create = function create(...args) {
  const instance = Object.create(this.prototype)
  return instance.construct(...args)
}

m3.component.foo.prototype = (
  function prototypeIIFE() {
    const _prototype = m3.component.base.prototype

    function construct(...args) {
      _prototype.construct.call(this, ...args)

      _build.call(this)
      this.render().attach()

      return this
    }

    function _build() {
      
    }

    return Object.setPrototypeOf({
      construct,
    }, _prototype)
  }
)()
```

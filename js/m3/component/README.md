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

m3.component.foo.prototype = (
  (undefined) => {
    const _prototype = m3.component.base.prototype

    function setup() {
      this._rootElement = document.createElement('div')

      return this
    }

    return Object.setPrototypeOf({
      setup,
    }, _prototype)
  }
)()

m3.component.foo.create = function create(...args) {
  return Object.create(this.prototype).construct(...args)
}
```

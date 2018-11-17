Reusable models representing game concepts.
They consist of two parts: the prototype and one or more factory methods.

Please assign these to the `m3.model` namespace:
```js
/**
 * @file js/m3/model/foo.js
 */
'use strict';

m3.model.foo = {};

m3.model.foo.create = function create() {
  const instance = Object.create(m3.model.foo.prototype);
  // ...
  return instance;
}

m3.model.foo.prototype = /* ... */
```
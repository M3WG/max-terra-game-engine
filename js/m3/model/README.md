The `m3.model` namespace defines reusable data structures.
They leverage `m3.utility.model.inventFactory()` to provide a consistent interface.

```js
/**
 * @file js/m3/model/foo.js
 */
'use strict'

m3.model.foo = m3.utility.model.inventFactory({
  foobar: function() {/* ... */},
  setup: function() {/* ... */},
  teardown: function() {/* ... */},
})
```

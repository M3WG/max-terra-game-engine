The `m3.component` namespace defines reusable interface components.
They leverage `m3.utility.component.inventFactory()` to provide a consistent interface.

```js
/**
 * @file js/m3/component/foo.js
 */
'use strict'

m3.component.foo = m3.utility.component.inventFactory({
  foobar: function() {/* ... */},
  setup: function() {/* ... */},
  teardown: function() {/* ... */},
})
```

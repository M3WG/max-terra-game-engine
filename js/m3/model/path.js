'use strict';

m3.model.path = {};

m3.model.path.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.path.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Cell[]

    return {
      construct,
      destruct,
    };
  }
)();

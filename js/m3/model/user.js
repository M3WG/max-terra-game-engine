'use strict';

m3.model.user = {};

m3.model.user.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.user.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    return {
      construct,
      destruct,
    };
  }
)();

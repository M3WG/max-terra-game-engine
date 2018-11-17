'use strict';

m3.model.action = {};

m3.model.action.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.action.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Player
    // Round
    // Turn

    return {
      construct,
      destruct,
    };
  }
)();

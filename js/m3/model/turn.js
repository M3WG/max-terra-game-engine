'use strict';

m3.model.turn = {};

m3.model.turn.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.turn.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Player
    // Action[]
    // Round

    return {
      construct,
      destruct,
    };
  }
)();

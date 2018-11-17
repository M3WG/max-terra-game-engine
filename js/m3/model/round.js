'use strict';

m3.model.round = {};

m3.model.round.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.round.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Game
    // Turn[]

    return {
      construct,
      destruct,
    };
  }
)();

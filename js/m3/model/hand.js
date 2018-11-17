'use strict';

m3.model.hand = {};

m3.model.hand.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.hand.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Player
    // Prefab[]

    return {
      construct,
      destruct,
    };
  }
)();

'use strict';

m3.model.claim = {};

m3.model.claim.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.claim.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Player
    // Tile[]
    // Claim type?

    return {
      construct,
      destruct,
    };
  }
)();

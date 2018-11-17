'use strict';

m3.model.cell = {};

m3.model.cell.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.cell.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Tile
    // Claim

    return {
      construct,
      destruct,
    };
  }
)();

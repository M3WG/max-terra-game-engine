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

    function getX() {
      return this.config.x;
    }

    function getY() {
      return this.config.y;
    }

    // Tile
    // Claim

    return {
      construct,
      destruct,
      getX,
      getY,
    };
  }
)();

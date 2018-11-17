'use strict';

m3.model.prefab = {};

m3.model.prefab.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.prefab.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Tile[][]

    return {
      construct,
      destruct,
    };
  }
)();

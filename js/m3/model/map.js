'use strict';

m3.model.map = {};

m3.model.map.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.map.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Game
    // Cell[][]
    // Archetype?

    return {
      construct,
      destruct,
    };
  }
)();

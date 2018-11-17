'use strict';

m3.model.tile = {};

m3.model.tile.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.tile.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // id
    // color

    return {
      construct,
      destruct,
    };
  }
)();

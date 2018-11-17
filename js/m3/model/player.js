'use strict';

m3.model.player = {};

m3.model.player.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.player.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // User
    // color

    return {
      construct,
      destruct,
    };
  }
)();

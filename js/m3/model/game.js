'use strict';

m3.model.game = {};

m3.model.game.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.game.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Map
    // Player
    // Round -> Turn -> Action

    return {
      construct,
      destruct,
    };
  }
)();

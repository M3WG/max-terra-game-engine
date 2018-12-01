'use strict';

m3.model.action = {};

m3.model.action.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.action.prototype = (
  function prototypeIIFE() {

    function construct(options) {
      this.turn = options.turn;

      return this;
    }

    function destruct() {
      return this;
    }

    return {
      construct,
      destruct,
    };
  }
)();

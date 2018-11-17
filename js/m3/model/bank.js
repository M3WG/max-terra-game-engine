'use strict';

m3.model.bank = {};

m3.model.bank.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.bank.prototype = (
  function prototypeIIFE() {

    function construct() {
      return this;
    }

    function destruct() {
      return this;
    }

    // Prefab[]
    // Player / User

    return {
      construct,
      destruct,
    };
  }
)();

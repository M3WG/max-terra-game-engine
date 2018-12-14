'use strict';

m3.model.turn = {};

m3.model.turn.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.turn.prototype = (
  function prototypeIIFE() {

    function construct(options) {
      this.action = [];
      this.player = options.player;
      this.round = options.round;

      return this;
    }

    function destruct() {
      return this;
    }

    function createAction(options) {
      options.turn = this;

      this.action.push(
        m3.model.action.create(options)
      );

      // XXX: Hardcoded
      const isTurnEnd = this.getActionCount() >= 3;

      if (isTurnEnd) {
        this.round.onTurnEnd();
      }

      return this;
    }

    function getActionCount() {
      return this.action.length;
    }

    return {
      construct,
      destruct,
      createAction,
      getActionCount,
    };
  }
)();

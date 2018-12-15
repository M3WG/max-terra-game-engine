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
      this.tile = options.tile;
      this.x = options.x;
      this.y = options.y;

      _swapTile.call(this);

      return this;
    }

    function destruct() {
      return this;
    }

    // XXX: Not the time or place for this
    // TODO: Good luck future us
    function _swapTile() {
      const map = this.turn.round.game.map;
      const cell = map.getCell(this.x, this.y);

      cell.tile = this.tile;
    }

    return {
      construct,
      destruct,
    };
  }
)();

'use strict';

m3.model.map = {};

m3.model.map.create = function(...args) {
  const Instance = Object.create(this.prototype);
  return Instance.construct(...args);
}

m3.model.map.prototype = (
  function prototypeIIFE() {

    function construct(options) {
      const {height, width} = options;

      this.cell = [];
      this.height = height;
      this.width = width;

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          if (!this.cell[x]) {
            this.cell[x] = [];
          }

          this.cell[x][y] = m3.model.cell.create(/* ... */);
        }
      }

      return this;
    }

    function destruct() {
      return this;
    }

    function getCell(x, y) {
      return this.cell[x][y];
    }

    function getHeight() {
      return this.height;
    }

    function getWidth() {
      return this.width;
    }

    // Game
    // Archetype?

    return {
      construct,
      destruct,
      getCell,
      getHeight,
      getWidth,
    };
  }
)();

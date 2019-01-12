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

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!this.cell[y]) {
            this.cell[y] = [];
          }

          this.cell[y][x] = m3.model.cell.create({
            x,
            y,
          });
        }
      }

      return this;
    }

    function destruct() {
      return this;
    }

    function getCell(x, y) {
      return this.cell[y][x];
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

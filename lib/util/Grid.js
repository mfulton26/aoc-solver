const VALUE = Symbol("Grid.value");

export default class Grid {
  #data = new Map();
  #size = 0;

  constructor(iterable = undefined) {
    if (iterable) {
      for (const [coordinates, value] of iterable) {
        this.set(coordinates, value);
      }
    }
  }

  get size() {
    return this.#size;
  }

  get(coordinates) {
    let map = this.#data;
    for (const coordinate of coordinates) {
      if (!map.has(coordinate)) {
        return;
      }
      map = map.get(coordinate);
    }
    return map.get(VALUE);
  }

  has(coordinates) {
    let map = this.#data;
    for (const coordinate of coordinates) {
      if (!map.has(coordinate)) {
        return false;
      }
      map = map.get(coordinate);
    }
    return map.has(VALUE);
  }

  set(coordinates, value) {
    let map = this.#data;
    for (const coordinate of coordinates) {
      if (!map.has(coordinate)) {
        map.set(coordinate, new Map());
      }
      map = map.get(coordinate);
    }
    if (!map.has(VALUE)) {
      this.#size++;
    }
    map.set(VALUE, value);
  }

  delete(coordinates) {
    let map = this.#data;
    const maps = [map];
    for (const coordinate of coordinates) {
      if (!map.has(coordinate)) {
        return false;
      }
      map = map.get(coordinate);
      maps.push(map);
    }
    const existed = map.delete(VALUE);
    if (existed) {
      this.#size--;
      for (let index = coordinates.length - 1; index >= 0; index--) {
        const coordinate = coordinates[index];
        if (maps[index + 1].size) {
          break;
        }
        const map = maps[index];
        map.delete(coordinate);
      }
    }
    return existed;
  }

  clear() {
    this.#data.clear();
    this.#size = 0;
  }

  forEach(callback, thisArg = undefined) {
    if (thisArg) {
      for (const [coordinates, value] of this) {
        callback.call(thisArg, value, coordinates, this);
      }
    } else {
      for (const [coordinates, value] of this) {
        callback(value, coordinates, this);
      }
    }
  }

  *entries() {
    const queue = [[[], this.#data]];
    while (queue.length) {
      const [coordinates, map] = queue.shift();
      if (map.has(VALUE)) {
        yield [coordinates, map.get(VALUE)];
      }
      for (const [key, value] of map) {
        if (key === VALUE) {
          continue;
        }
        queue.push([coordinates.concat(key), value]);
      }
    }
  }

  *keys() {
    const queue = [[[], this.#data]];
    while (queue.length) {
      const [coordinates, map] = queue.shift();
      if (map.has(VALUE)) {
        yield coordinates;
      }
      for (const [key, value] of map) {
        if (key === VALUE) {
          continue;
        }
        queue.push([coordinates.concat(key), value]);
      }
    }
  }

  *values() {
    const queue = [[[], this.#data]];
    while (queue.length) {
      const [coordinates, map] = queue.shift();
      if (map.has(VALUE)) {
        yield map.get(VALUE);
      }
      for (const [key, value] of map) {
        if (key === VALUE) {
          continue;
        }
        queue.push([coordinates.concat(key), value]);
      }
    }
  }
}

Object.defineProperties(Grid.prototype, {
  [Symbol.species]: {
    writable: false,
    enumerable: false,
    configurable: true,
    value: Grid
  },
  [Symbol.toStringTag]: {
    writable: false,
    enumerable: false,
    configurable: true,
    value: "Grid"
  }
});

Grid.prototype[Symbol.iterator] = Grid.prototype.entries;

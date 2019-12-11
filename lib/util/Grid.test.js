import Grid from "./Grid.js";

QUnit.module("Grid", () => {
  QUnit.module("constructor", () => {
    QUnit.test("no iterable arg", assert => {
      const grid = new Grid();
      assert.equal(grid.size, 0);
    });
    QUnit.module("iterable arg", () => {
      QUnit.test("0 entries", assert => {
        const grid = new Grid([]);
        assert.equal(grid.size, 0);
      });
      QUnit.test("1 entry", assert => {
        const grid = new Grid([[[1, 2, 3], "hi"]]);
        assert.equal(grid.size, 1);
      });
      QUnit.test("2 unique entries", assert => {
        const grid = new Grid([
          [[1, 2, 3], "hi"],
          [[3, 2, 1], "bye"]
        ]);
        assert.equal(grid.size, 2);
      });
      QUnit.test("2 duplicate entries", assert => {
        const grid = new Grid([
          [[1, 2, 3], "hi"],
          [[1, 2, 3], "hi"]
        ]);
        assert.equal(grid.size, 1);
      });
      QUnit.test("2 duplicate keys", assert => {
        const grid = new Grid([
          [[1, 2, 3], "hi"],
          [[1, 2, 3], "bye"]
        ]);
        assert.equal(grid.size, 1);
      });
      QUnit.test("3 unique entries", assert => {
        const grid = new Grid([
          [[1, 2, 3], "hi"],
          [[3, 2, 1], "bye"],
          [[1, 2], "sweet"]
        ]);
        assert.equal(grid.size, 3);
      });
      QUnit.test("3 duplicate values", assert => {
        const grid = new Grid([
          [[1, 2, 3], "ok"],
          [[3, 2, 1], "ok"],
          [[1, 2], "ok"]
        ]);
        assert.equal(grid.size, 3);
      });
      QUnit.test("4 unique entries", assert => {
        const grid = new Grid([
          [[1, 2, 3], "hi"],
          [[3, 2, 1], "bye"],
          [[1, 2], "sweet"],
          [[1, 2, 3, 4], "bitter"]
        ]);
        assert.equal(grid.size, 4);
      });
      QUnit.test("mixed keys/values", assert => {
        const grid = new Grid([
          [[1, 2, 3, 4], "bitter"],
          [[1, 2, 3], "hi"],
          [[3, 2, 1], "bye"],
          [[1, 2], "sweet"],
          [[1, 2, 3, 4], "bitter"],
          [[1, 2, 3], "hi21"],
          [[], "scalar1"],
          [[], "scalar2"],
          [[], "scalar3"],
          [[], "scalar4"],
          [[], "scalar5"]
        ]);
        assert.equal(grid.size, 5);
      });
    });
  });
  QUnit.test("get [Symbol.species]", assert => {
    const grid = new Grid();
    assert.equal(grid[Symbol.species], Grid);
  });
  QUnit.test("set [Symbol.species]", assert => {
    const grid = new Grid();
    assert.throws(() => (grid[Symbol.species] = "Map"), TypeError);
  });
  QUnit.module("get size", () => {
    QUnit.test("increasing", assert => {
      const grid = new Grid();
      assert.equal(grid.size, 0);
      grid.set([], 0);
      assert.equal(grid.size, 1);
      grid.set([0], 1);
      assert.equal(grid.size, 2);
      grid.set([0, 1], 2);
      assert.equal(grid.size, 3);
      grid.set([0, 1, 2], 3);
      assert.equal(grid.size, 4);
    });
    QUnit.test("decreasing", assert => {
      const grid = new Grid([
        [[0, 1, 2], 3],
        [[0, 1], 2],
        [[0], 1],
        [[], 0]
      ]);
      assert.equal(grid.size, 4);
      grid.delete([0, 1, 2]);
      assert.equal(grid.size, 3);
      grid.delete([0, 1]);
      assert.equal(grid.size, 2);
      grid.delete([0]);
      assert.equal(grid.size, 1);
      grid.delete([]);
      assert.equal(grid.size, 0);
    });
  });
  QUnit.test("set size", assert => {
    const grid = new Grid();
    assert.throws(() => (grid.size = 12), TypeError);
  });
  QUnit.test("get [Symbol.toStringTag]", assert => {
    const grid = new Grid();
    assert.equal(grid[Symbol.toStringTag], "Grid");
    assert.equal(grid.toString(), "[object Grid]");
    assert.equal(String(grid), "[object Grid]");
  });
  QUnit.test("set [Symbol.toStringTag]", assert => {
    const grid = new Grid();
    assert.throws(() => (grid[Symbol.toStringTag] = "MyCustomGrid"), TypeError);
  });
  QUnit.module("get", () => {
    QUnit.test("0 dimensions", assert => {
      const grid = new Grid([[[], "hi"]]);
      assert.equal(grid.get([]), "hi");
      assert.equal(grid.get([1]), undefined);
    });
    QUnit.test("1 dimension", assert => {
      const grid = new Grid([[[1], "hi"]]);
      assert.equal(grid.get([1]), "hi");
      assert.equal(grid.get([]), undefined);
      assert.equal(grid.get([1, 2]), undefined);
    });
    QUnit.test("2 dimensions", assert => {
      const grid = new Grid([[[1, 2], "hi"]]);
      assert.equal(grid.get([1, 2]), "hi");
      assert.equal(grid.get([1]), undefined);
      assert.equal(grid.get([]), undefined);
      assert.equal(grid.get([1, 2, 3]), undefined);
    });
    QUnit.test("3 dimensions", assert => {
      const grid = new Grid([[[1, 2, 3], "hi"]]);
      assert.equal(grid.get([1, 2, 3]), "hi");
      assert.equal(grid.get([1, 2]), undefined);
      assert.equal(grid.get([1]), undefined);
      assert.equal(grid.get([]), undefined);
      assert.equal(grid.get([1, 2, 3, 4]), undefined);
    });
    QUnit.test("4 dimensions", assert => {
      const grid = new Grid([[[1, 2, 3, 4], "hi"]]);
      assert.equal(grid.get([1, 2, 3, 4]), "hi");
      assert.equal(grid.get([1, 2, 3]), undefined);
      assert.equal(grid.get([1, 2]), undefined);
      assert.equal(grid.get([1]), undefined);
      assert.equal(grid.get([]), undefined);
      assert.equal(grid.get([1, 2, 3, 4, 5]), undefined);
    });
    QUnit.test("5 dimensions", assert => {
      const grid = new Grid([[[1, 2, 3, 4, 5], "hi"]]);
      assert.equal(grid.get([1, 2, 3, 4, 5]), "hi");
      assert.equal(grid.get([1, 2, 3, 4]), undefined);
      assert.equal(grid.get([1, 2, 3]), undefined);
      assert.equal(grid.get([1, 2]), undefined);
      assert.equal(grid.get([1]), undefined);
      assert.equal(grid.get([]), undefined);
      assert.equal(grid.get([1, 2, 3, 4, 5, 6]), undefined);
    });
    QUnit.test("empty", assert => {
      const grid = new Grid();
      assert.equal(grid.get([]), undefined);
    });
    QUnit.test("mixed dimensions", assert => {
      const grid = new Grid([
        [[], 0],
        [[1, 2], 2],
        [[1, 2, 3, 4], 4],
        [[1, 2, 3, 4, 5], 5],
        [[1, 2, 3], 3],
        [[1], 1]
      ]);
      assert.equal(grid.get([1, 2, 3, 4, 5]), 5);
      assert.equal(grid.get([1, 2, 3, 4]), 4);
      assert.equal(grid.get([1, 2, 3]), 3);
      assert.equal(grid.get([1, 2]), 2);
      assert.equal(grid.get([1]), 1);
      assert.equal(grid.get([]), 0);
      assert.equal(grid.get([2, 1]), undefined);
      assert.equal(grid.get([1, 2, 3, 4, 5, 6]), undefined);
    });
  });
  QUnit.test("has", assert => {
    const grid = new Grid([
      [[1, 2, 3], "hi"],
      [[3, 2, 1], "bye"],
      [[1, 2], "sweet"],
      [[1, 2, 3, 4], "bitter"]
    ]);
    assert.notOk(grid.has([]));
    assert.notOk(grid.has([1]));
    assert.ok(grid.has([1, 2]));
    assert.notOk(grid.has([2, 1]));
    assert.ok(grid.has([1, 2, 3]));
    assert.notOk(grid.has([1, 2, 2]));
    assert.notOk(grid.has([2, 2, 2]));
    assert.notOk(grid.has([2, 2, 1]));
    assert.notOk(grid.has([4, 3, 2, 1]));
    assert.ok(grid.has([1, 2, 3, 4]));
  });
  QUnit.module("set", () => {
    QUnit.test("new entries", assert => {
      const grid = new Grid();
      assert.equal(grid.get([]), undefined);
      grid.set([], 12n);
      assert.equal(grid.get([]), 12n);
      grid.set([1], "hi");
      grid.set([2], "bye");
      grid.set([-1], "hola");
      grid.set([-2], "chao");
      assert.equal(grid.get([]), 12n);
      assert.equal(grid.get([1]), "hi");
      assert.equal(grid.get([2]), "bye");
      assert.equal(grid.get([-1]), "hola");
      assert.equal(grid.get([-2]), "chao");
    });
    QUnit.test("existing entries", assert => {
      const grid = new Grid([
        [[1, 2, 3], "hi"],
        [[3, 2, 1], "bye"],
        [[1, 2], "sweet"],
        [[1, 2, 3, 4], "bitter"]
      ]);
      grid.set([1, 2], "sweet");
      grid.set([1, 2, 3], "hi");
      assert.equal(grid.size, 4);
    });
    QUnit.test("overwrite entries", assert => {
      const grid = new Grid([
        [[1, 2, 3], "hi"],
        [[3, 2, 1], "bye"],
        [[1, 2], "sweet"],
        [[1, 2, 3, 4], "bitter"]
      ]);
      grid.set([1, 2], "bitter");
      grid.set([1, 2, 3], "bye");
      assert.equal(grid.size, 4);
      assert.equal(grid.get([1, 2]), "bitter");
      assert.equal(grid.get([1, 2, 3]), "bye");
    });
  });
  QUnit.module("delete", () => {
    QUnit.test("0 dimensions", assert => {
      const grid = new Grid([[[], 0]]);
      grid.delete([]);
      assert.notOk(grid.has([]));
      assert.equal(grid.size, 0);
    });
    QUnit.test("1 dimensions", assert => {
      const grid = new Grid([[[1], 1]]);
      grid.delete([1]);
      assert.notOk(grid.has([1]));
      assert.equal(grid.size, 0);
    });
    QUnit.test("2 dimensions", assert => {
      const grid = new Grid([[[1, 2], 2]]);
      grid.delete([1, 2]);
      assert.notOk(grid.has([1, 2]));
      assert.equal(grid.size, 0);
    });
    QUnit.test("3 dimensions", assert => {
      const grid = new Grid([[[1, 2, 3], 3]]);
      grid.delete([1, 2, 3]);
      assert.notOk(grid.has([1, 2, 3]));
      assert.equal(grid.size, 0);
    });
    QUnit.test("4 dimensions", assert => {
      const grid = new Grid([[[1, 2, 3, 4], 4]]);
      grid.delete([1, 2, 3, 4]);
      assert.notOk(grid.has([1, 2, 3, 4]));
      assert.equal(grid.size, 0);
    });
    QUnit.test("5 dimensions", assert => {
      const grid = new Grid([[[1, 2, 3, 4, 5], 5]]);
      grid.delete([1, 2, 3, 4, 5]);
      assert.notOk(grid.has([1, 2, 3, 4, 5]));
      assert.equal(grid.size, 0);
    });
    QUnit.test("mixed dimensions", assert => {
      const grid = new Grid([
        [[], 0],
        [[1, 2], 2],
        [[1, 2, 3, 4], 4],
        [[1, 2, 3, 4, 5], 5],
        [[1, 2, 3], 3],
        [[1], 1]
      ]);
      grid.delete([1, 2, 3, 4, 5]);
      assert.notOk(grid.has([1, 2, 3, 4, 5]));
      assert.equal(grid.size, 5);
      grid.delete([2, 1]);
      assert.equal(grid.size, 5);
      grid.delete([1, 2]);
      assert.equal(grid.size, 4);
      assert.equal(grid.get([1, 2, 3]), 3);
    });
  });
  QUnit.test("clear", assert => {
    const grid = new Grid([
      [[], 0],
      [[1, 2], 2],
      [[1, 2, 3, 4], 4],
      [[1, 2, 3, 4, 5], 5],
      [[1, 2, 3], 3],
      [[1], 1]
    ]);
    grid.clear();
    assert.equal(grid.size, 0);
  });
  QUnit.module("forEach", () => {
    QUnit.test("no thisArg", assert => {
      const grid = new Grid([
        [[], 0],
        [[1, 2], 2],
        [[1, 2, 3, 4], 4],
        [[1, 2, 3, 4, 5], 5],
        [[1, 2, 3], 3],
        [[1], 1]
      ]);
      const actualValues = new Set();
      grid.forEach(function(value, coordinates, callbackGrid) {
        assert.equal(this, undefined);
        assert.equal(callbackGrid, grid);
        assert.ok(grid.has(coordinates));
        assert.equal(grid.get(coordinates), value);
        actualValues.add(value);
      });
      assert.equal(actualValues.size, grid.size);
    });
    QUnit.test("custom thisArg", assert => {
      const grid = new Grid([
        [[], 0],
        [[1, 2], 2],
        [[1, 2, 3, 4], 4],
        [[1, 2, 3, 4, 5], 5],
        [[1, 2, 3], 3],
        [[1], 1]
      ]);
      const expectedThisArg = {};
      const actualValues = new Set();
      grid.forEach(function(value, coordinates, callbackGrid) {
        assert.equal(this, expectedThisArg);
        assert.equal(callbackGrid, grid);
        assert.ok(grid.has(coordinates));
        assert.equal(grid.get(coordinates), value);
        actualValues.add(value);
      }, expectedThisArg);
      assert.equal(actualValues.size, grid.size);
    });
  });
  QUnit.test("entries", assert => {
    const grid = new Grid([
      [[], 0],
      [[1, 2], 2],
      [[1, 2, 3, 4], 4],
      [[1, 2, 3, 4, 5], 5],
      [[1, 2, 3], 3],
      [[1], 1]
    ]);
    const generator = grid.entries();
    assert.deepEqual(generator.next(), {
      value: [[], 0],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [[1], 1],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [[1, 2], 2],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [[1, 2, 3], 3],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [[1, 2, 3, 4], 4],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [[1, 2, 3, 4, 5], 5],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: undefined,
      done: true
    });
  });
  QUnit.test("keys", assert => {
    const grid = new Grid([
      [[], 0],
      [[1, 2], 2],
      [[1, 2, 3, 4], 4],
      [[1, 2, 3, 4, 5], 5],
      [[1, 2, 3], 3],
      [[1], 1]
    ]);
    const generator = grid.keys();
    assert.deepEqual(generator.next(), {
      value: [],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [1],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [1, 2],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [1, 2, 3],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [1, 2, 3, 4],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: [1, 2, 3, 4, 5],
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: undefined,
      done: true
    });
  });
  QUnit.test("values", assert => {
    const grid = new Grid([
      [[], 0],
      [[1, 2], 2],
      [[1, 2, 3, 4], 4],
      [[1, 2, 3, 4, 5], 5],
      [[1, 2, 3], 3],
      [[1], 1]
    ]);
    const generator = grid.values();
    assert.deepEqual(generator.next(), {
      value: 0,
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: 1,
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: 2,
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: 3,
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: 4,
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: 5,
      done: false
    });
    assert.deepEqual(generator.next(), {
      value: undefined,
      done: true
    });
  });
  QUnit.test("[Symbol.iterator]", assert => {
    const grid = new Grid();
    assert.equal(grid[Symbol.iterator], grid.entries);
  });
});

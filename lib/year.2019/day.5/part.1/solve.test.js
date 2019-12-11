import solve from "./solve.js";

AOCQUnit.module(import.meta, () => {
  for (const [example, expected] of [
    ["111111", true],
    ["223450", false],
    ["123789", false]
  ]) {
    QUnit.test(example, assert =>
      assert.equal(solve(`${example}-${example}`), expected)
    );
  }
});

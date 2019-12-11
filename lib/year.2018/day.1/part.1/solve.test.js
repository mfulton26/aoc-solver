import solve from "./solve.js";

AOCQUnit.module(import.meta, () => {
  for (const [name, expected] of [
    ["+1, -2, +3, +1", 3],
    ["+1, +1, +1", 3],
    ["+1, +1, -2", 0],
    ["-1, -2, -3", -6]
  ]) {
    QUnit.test(name, assert => {
      const input = name.split(", ").join("\n");
      const actual = solve(input);
      assert.equal(actual, expected);
    });
  }
});

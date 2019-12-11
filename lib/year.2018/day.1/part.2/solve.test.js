import solve from "./solve.js";

AOCQUnit.module(import.meta, () => {
  for (const [name, expected] of [
    ["+1, -2, +3, +1", 2],
    ["+1, -1", 0],
    ["+3, +3, +4, -2, -4", 10],
    ["-6, +3, +8, +5, -6", 5],
    ["+7, +7, -2, -7, -4", 14]
  ]) {
    QUnit.test(name, assert => {
      const input = name.split(", ").join("\n");
      const actual = solve(input);
      assert.equal(actual, expected);
    });
  }
});

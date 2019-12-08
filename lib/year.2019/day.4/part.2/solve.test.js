import solve from "./solve.js";

for (const [example, expected] of [
  ["112233", true],
  ["123444", false],
  ["111122", true]
]) {
  QUnit.test(example, assert =>
    assert.equal(solve(`${example}-${example}`), expected)
  );
}

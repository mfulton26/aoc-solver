import findSumOfFuelRequirements from "./solve.js";

AOCQUnit.module(import.meta, () => {
  for (const [input, expected] of [
    ["12", 2],
    ["14", 2],
    ["1969", 654 + 216 + 70 + 21 + 5],
    ["100756", 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2]
  ]) {
    QUnit.test(
      `findSumOfFuelRequirements(${JSON.stringify(input)}) === ${JSON.stringify(
        expected
      )}`,
      assert => assert.equal(findSumOfFuelRequirements(input), expected)
    );
  }
});

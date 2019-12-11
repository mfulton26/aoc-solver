import findSumOfFuelRequirements from "./solve.js";

AOCQUnit.module(import.meta, () => {
  for (const [input, expected] of [
    ["12", 2],
    ["14", 2],
    ["1969", 654],
    ["100756", 33583]
  ]) {
    QUnit.test(
      `findSumOfFuelRequirements(${JSON.stringify(input)}) === ${JSON.stringify(
        expected
      )}`,
      assert => assert.equal(findSumOfFuelRequirements(input), expected)
    );
  }
});

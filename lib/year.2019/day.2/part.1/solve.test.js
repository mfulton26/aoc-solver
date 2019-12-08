import findValueAtPosition0AfterProgramHalt from "./solve.js";

for (const [input, expected] of [["1,0,0,0,99", 2]]) {
  QUnit.test(
    `findValueAtPosition0AfterProgramHalt(${JSON.stringify(
      input
    )}) === ${JSON.stringify(expected)}`,
    assert =>
      assert.equal(
        findValueAtPosition0AfterProgramHalt(input, {
          restore1202ProgramAlarmState: false
        }),
        expected
      )
  );
}

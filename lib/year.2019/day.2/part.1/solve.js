import { parseMemory } from "../index.js";
import runProgram from "../runProgram.js";

export default function findValueAtPosition0AfterProgramHalt(
  input,
  { restore1202ProgramAlarmState = true } = {}
) {
  const memory = parseMemory(input);
  if (restore1202ProgramAlarmState) {
    memory[1] = 12;
    memory[2] = 2;
  }
  runProgram(memory);
  return memory[0];
}

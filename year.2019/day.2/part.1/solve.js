import { parseMemory } from "../index.js";
import runProgram from "../runProgram.js";

export default function findValueAtPosition0AfterProgramHalt(input) {
  const memory = parseMemory(input);
  memory[1] = 12;
  memory[2] = 2;
  runProgram(memory);
  return memory[0];
}

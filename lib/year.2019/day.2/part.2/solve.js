import { parseMemory } from "../index.js";
import runProgram from "../runProgram.js";

export default function findHashForInputPairFor19690720(input) {
  const initialMemory = parseMemory(input);
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const memory = initialMemory.slice();
      memory[1] = noun;
      memory[2] = verb;
      runProgram(memory);
      if (memory[0] === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
}

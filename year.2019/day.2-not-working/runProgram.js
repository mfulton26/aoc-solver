export default function runProgram(memory) {
  for (let instructionPointer = 0; memory[instructionPointer] !== 99; ) {
    const opcode = memory[instructionPointer++];
    switch (opcode) {
      case 1: {
        const a = memory[instructionPointer++];
        const b = memory[instructionPointer++];
        const c = memory[instructionPointer++];
        memory[c] = memory[a] + memory[b];
        break;
      }
      case 2: {
        const a = memory[instructionPointer++];
        const b = memory[instructionPointer++];
        const c = memory[instructionPointer++];
        memory[c] = memory[a] * memory[b];
        break;
      }
    }
  }
}

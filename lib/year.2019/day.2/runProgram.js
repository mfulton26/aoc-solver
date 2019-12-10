export default function runProgram(memory) {
  for (let instructionPointer = 0; memory[instructionPointer] !== 99; ) {
    const opcode = memory[instructionPointer++];
    function* parameters() {
      while (true) {
        yield memory[instructionPointer++];
      }
    }
    switch (opcode) {
      case 1: {
        const [a, b, c] = parameters();
        memory[c] = memory[a] + memory[b];
        break;
      }
      case 2: {
        const [a, b, c] = parameters();
        memory[c] = memory[a] * memory[b];
        break;
      }
    }
  }
}

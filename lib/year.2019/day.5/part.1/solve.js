const adjacentDigitsRegExp = /(\d)\1/;

export default function findNumberOfDifferentPasswords(input) {
  const [start, end] = input.split("-").map(Number);
  let count = 0;
  for (let n = start; n <= end; n++) {
    const s = String(n);
    if (
      s.length === 6 &&
      adjacentDigitsRegExp.test(s) &&
      s ===
        Array.from(s)
          .sort()
          .join("")
    ) {
      count++;
    }
  }
  return count;
}

function* program(memory) {
  for (let instructionPointer = 0; memory[instructionPointer] !== 99; ) {
    const instruction = memory[instructionPointer++];
    const opcode = instruction % 100;
    const parameterModeIterator = {
      divisor: 10,
      next() {
        this.divisor *= 10;
        return {
          value: Math.trunc(instruction / this.divisor) % 10,
          done: false
        };
      }
    };
    const parameters = (function* parameters() {
      for (let divisor = 100; ; divisor *= 10, instructionPointer++) {
        const mode = Math.trunc(instruction / divisor) % 10;
        switch (mode) {
          case 0: {
            yield memory[memory[instructionPointer]];
            break;
          }
          case 1: {
            yield memory[instructionPointer];
            break;
          }
        }
      }
    })();
    switch (opcode) {
      case 1: {
        parameters.next(parameters.next().value + parameters.next().value);
        const [a, b, c] = parameters(3);
        memory[c] = memory[a] + memory[b];
        break;
      }
      case 2: {
        const [a, b, c] = parameters(3);
        memory[c] = memory[a] * memory[b];
        break;
      }
      case 3: {
        const [a] = parameters(1);
        memory[a] = yield;
        break;
      }
      case 4: {
        const [a] = parameters(1);
        yield memory[a];
        break;
      }
    }
  }
}

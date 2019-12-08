# Advent of Code Solver

## Usage

1. Open [Advent of Code](https://adventofcode.com/)
1. Log in (if not already logged in)
1. Navigate to an event (year) and puzzle (day)
1. Open Developer Tools
1. In the Console run the following:

   ```js
   import("https://mfulton26.github.io/aoc-solver/solveCurrentPuzzle.js");
   ```

   Answers along with compute durations for each available puzzle part will asynchronously be printed to the Console.

   ```out
   Promise {<pending>}
   Part 1
     answer: 495
     duartion: 195.162109375ms
   Part 2
     answer: 305
     duartion: 182.643310546875ms
   ```

## Tests

Tests can be run in a web browser [here](tests.html).

## Development

Files can be hosted locally via tools like [`http-server`](https://www.npmjs.com/package/http-server), [Live Server - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), etc.

Tests can be run locally in a web browser [here](tests.html) and local solving of puzzles against actual input on [adventofcode.com](https://adventofcode.com/) can be done with the following Console script:

```js
import(`http://127.0.0.1:5500/solveCurrentPuzzle.js?${Date.now()}`);
```

Note: The added query parameter in the above `import` statement is to facilitate iterative development by bypassing the browser cache (a unique URL is used each time).

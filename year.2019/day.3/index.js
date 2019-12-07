export function parsePaths(input) {
  return input
    .split("\n")
    .map(line =>
      line
        .split(",")
        .map(segment => [
          directionFromChar(segment[0]),
          Number(segment.slice(1))
        ])
    );
}

function directionFromChar(char) {
  switch (char) {
    case "R":
      return [+1, 0];
    case "L":
      return [-1, 0];
    case "U":
      return [0, +1];
    case "D":
      return [0, -1];
  }
}

export function findIntersections(centralPoint, paths) {
  const intersections = new Map();
  const grid = {
    data: new Map(),
    set([x, y], value) {
      if (!this.data.has(x)) {
        this.data.set(x, new Map());
      }
      this.data.get(x).set(y, value);
    },
    has([x, y]) {
      return this.data.has(x) && this.data.get(x).has(y);
    },
    get([x, y]) {
      if (this.data.has(x)) {
        return this.data.get(x).get(y);
      }
    }
  };
  for (const path of paths) {
    let [x, y] = centralPoint;
    let steps = 0;
    for (const [[dx, dy], amount] of path) {
      for (let i = 0; i < amount; i++) {
        x += dx;
        y += dy;
        steps++;
        const position = [x, y];
        if (!grid.has(position)) {
          grid.set(position, new Map());
        }
        const pathsAtPoint = grid.get(position);
        if (!pathsAtPoint.has(path)) {
          pathsAtPoint.set(path, steps);
          if (pathsAtPoint.size === 2) {
            intersections.set(position, pathsAtPoint);
          }
        }
      }
    }
  }
  return intersections;
}

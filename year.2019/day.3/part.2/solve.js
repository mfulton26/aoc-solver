import { parsePaths, findIntersections } from "../index.js";

export default function findFewestCombinedStepsToAnIntersection(input) {
  const centralPoint = [0, 0];
  const paths = parsePaths(input);
  const intersections = findIntersections(centralPoint, paths);
  const fewestCombinedSteps = Array.from(intersections.values()).map(
    stepsByPath => {
      const fewestSteps = Array.from(stepsByPath.values()).sort();
      return fewestSteps[0] + fewestSteps[1];
    }
  );
  return Math.min(...fewestCombinedSteps);
}

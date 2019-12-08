import { parsePaths, findIntersections } from "../index.js";
import calculateManhattanDistance from "../../../util/calculateManhattanDistance.js";

export default function findManhattanDistanceToClosestIntersection(input) {
  const centralPoint = [0, 0];
  const paths = parsePaths(input);
  const intersections = findIntersections(centralPoint, paths);
  const intersectionPoints = Array.from(intersections.keys());
  const manhattanDistances = intersectionPoints.map(intersectionPoint =>
    calculateManhattanDistance(centralPoint, intersectionPoint)
  );
  return Math.min(...manhattanDistances);
}

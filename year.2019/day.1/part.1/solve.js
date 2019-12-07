import { parseModuleMasses } from "../index.js";

export default function findSumOfFuelRequirements(input) {
  return parseModuleMasses(input).reduce(
    (sum, mass) => sum + calculateFuelRequired(mass),
    0
  );
}

function calculateFuelRequired(mass) {
  return Math.trunc(mass / 3) - 2;
}

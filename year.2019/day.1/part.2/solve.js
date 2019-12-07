import { parseModuleMasses } from "../index.js";

export default function findSumOfFuelRequirements(input) {
  return parseModuleMasses(input).reduce(
    (sum, mass) => sum + calculateFuelRequired(mass),
    0
  );
}

function calculateFuelRequired(mass) {
  if (mass < 9) {
    return 0;
  }
  const fuelRequired = Math.trunc(mass / 3) - 2;
  return fuelRequired + calculateFuelRequired(fuelRequired);
}

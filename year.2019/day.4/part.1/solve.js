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

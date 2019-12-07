const adjacentDigitsRegExp = /(\d)\1/;

export function solve(input) {
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
          .join("") &&
      s.match(/(\d)\1+/g).some(({ length }) => length === 2)
    ) {
      count++;
    }
  }
  return count;
}

if (location.pathname === "/2019/day/4/input") {
  const input = document.body.innerText.slice(0, -1);
  const answer = solve(input);
  console.log(answer);
}

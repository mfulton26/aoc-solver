const inputPathnameRegExp = /\/(?<year>\d+)\/day\/(?<day>\d+)\/input/;

export async function solveCurrentPuzzle() {
  const { year, day } = parsePathname(location.pathname);
  const input = await getInput(year, day);
  await solvePart(year, day, 1, input);
  if (day !== 25) {
    await solvePart(year, day, 2, input);
  }
}

export function parsePathname(pathname) {
  const {
    groups: { year, day }
  } = /\/(?<year>\d+)\/day\/(?<day>\d+)/.exec(pathname);
  return { year: Number(year), day: Number(day) };
}

export async function getInput(year, day) {
  const rawInput = await getRawInput(year, day);
  return rawInput.slice(0, -1);
}

export async function getRawInput(year, day) {
  if (inputPathnameRegExp.test(location.pathname)) {
    return document.body.innerText;
  } else {
    const response = await fetch(`/${year}/day/${day}/input`);
    return response.text();
  }
}

export async function solvePart(year, day, part, input) {
  console.group(`Part ${part}`);
  try {
    const { default: solve } = await import(
      `https://mfulton26.github.io/aoc-solver/year.${year}/day.${day}/part.${part}/solve.js`
    );
    if (solve) {
      console.time("duartion");
      try {
        console.log("answer:", solve(input));
      } catch (error) {
        console.error(error);
      } finally {
        console.timeEnd("duartion");
      }
    } else {
      console.info(undefined);
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.groupEnd(`Part ${part}`);
  }
}

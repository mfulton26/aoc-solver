const regExp = /\/year\.(?<year>\d+)\/day\.(?<day>\d+)\/part\.(?<part>\d+)\//;

export default function qUnitYearDayPartModule({ url }, ...args) {
  const {
    groups: { year, day, part }
  } = regExp.exec(url);
  QUnit.module(`Year ${year}`, () => {
    QUnit.module(`Day ${day}`, () => {
      QUnit.module(`Part ${part}`, ...args);
    });
  });
}

const regExp = /\/year\.(?<year>\d+)\/day\.(?<day>\d+)\/part\.(?<part>\d+)\//;

window.AOCQUnit = {
  module({ url }, ...args) {
    const {
      groups: { year, day, part }
    } = regExp.exec(url);
    QUnit.module(`Year ${year}`, () => {
      QUnit.module(`Day ${day}`, () => {
        QUnit.module(`Part ${part}`, ...args);
      });
    });
  }
};

const currentYear = new Date().getFullYear();

for (let year = 2015; year <= currentYear; year++) {
  for (let day = 1; day <= 25; day++) {
    const puzzleDate = new Date(Date.UTC(year, 11, day, +5));
    if (puzzleDate > new Date()) {
      continue;
    }
    const parts = day === 25 ? 1 : 2;
    for (let part = 1; part <= parts; part++) {
      const script = document.createElement("script");
      script.async = false;
      script.src = `lib/year.${year}/day.${day}/part.${part}/solve.test.js`;
      script.type = "module";
      document.body.appendChild(script);
    }
  }
}

document.currentScript.remove();

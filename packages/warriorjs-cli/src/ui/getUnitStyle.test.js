import style from 'ansi-styles';

import getUnitStyle from './getUnitStyle';

test("returns calculated style function based on unit's name", () => {
  const unitStyle = getUnitStyle('foo');
  expect(unitStyle('f')).toEqual(`${style.cyan.open}f${style.cyan.close}`);
});

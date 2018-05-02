import style from 'ansi-styles';

import getUnitStyle from './getUnitStyle';

test('returns cyan style function for warrior', () => {
  const warriorStyle = getUnitStyle({ warrior: true });
  expect(warriorStyle('@')).toEqual(`${style.cyan.open}@${style.cyan.close}`);
});

test('returns calculated style function for other units', () => {
  const unitStyle = getUnitStyle({ character: 's' });
  expect(unitStyle('s')).toEqual(
    `${style.magenta.open}s${style.magenta.close}`,
  );
});

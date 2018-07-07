import Captive from './Captive';

describe('Captive', () => {
  test("appears as 'C' on map", () => {
    expect(Captive.character).toBe('C');
  });

  test('has #81a1c1 color', () => {
    expect(Captive.color).toBe('#81a1c1');
  });

  test('has 1 max health', () => {
    expect(Captive.maxHealth).toBe(1);
  });

  test('has a reward of 20 points', () => {
    expect(Captive.reward).toBe(20);
  });

  test('is not an enemy', () => {
    expect(Captive.enemy).toBe(false);
  });

  test('is bound', () => {
    expect(Captive.bound).toBe(true);
  });
});

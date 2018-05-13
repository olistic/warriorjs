import Captive from './Captive';

describe('Captive', () => {
  test("appears as 'C' on map", () => {
    expect(Captive.character).toBe('C');
  });

  test('has 1 max health', () => {
    expect(Captive.maxHealth).toBe(1);
  });

  test('has a reward of 20 points', () => {
    expect(Captive.reward).toBe(20);
  });

  test('is a captive', () => {
    expect(Captive.captive).toBe(true);
  });
});

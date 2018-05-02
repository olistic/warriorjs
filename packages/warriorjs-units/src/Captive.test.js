import Captive from './Captive';

describe('Captive', () => {
  test("appears as 'C' on map", () => {
    expect(Captive.character).toBe('C');
  });

  test('has 1 max health', () => {
    expect(Captive.maxHealth).toBe(1);
  });

  test('is a captive', () => {
    expect(Captive.captive).toBe(true);
  });
});

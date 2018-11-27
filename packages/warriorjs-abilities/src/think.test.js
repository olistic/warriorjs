import thinkCreator from './think';

describe('think', () => {
  let think;
  let unit;

  beforeEach(() => {
    unit = { log: jest.fn() };
    think = thinkCreator()(unit);
  });

  test('is not an action', () => {
    expect(think.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(think.description).toBe(
      'Thinks out loud (`console.log` replacement).',
    );
  });

  describe('performing', () => {
    test('thinks nothing by default', () => {
      think.perform();
      expect(unit.log).toHaveBeenCalledWith('thinks nothing');
    });

    test('allows to specify thought', () => {
      think.perform('he should be brave');
      expect(unit.log).toHaveBeenCalledWith('thinks he should be brave');
    });

    test('allows complex thoughts', () => {
      think.perform('that %o', { brave: true });
      expect(unit.log).toHaveBeenCalledWith('thinks that { brave: true }');
    });
  });
});

import listenCreator from './listen';

describe('listen', () => {
  let listen;
  let unit;

  beforeEach(() => {
    unit = {
      getOtherUnits: () => [
        { getSpace: () => 'space1' },
        { getSpace: () => 'space2' },
      ],
    };
    listen = listenCreator()(unit);
  });

  test('is not an action', () => {
    expect(listen.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(listen.description).toBe(
      'Return an array of all spaces which have units in them (excluding yourself).',
    );
  });

  describe('performing', () => {
    test('returns all spaces which have units in them', () => {
      expect(listen.perform()).toEqual(['space1', 'space2']);
    });
  });
});

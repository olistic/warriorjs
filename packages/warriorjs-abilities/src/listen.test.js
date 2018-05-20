import { FORWARD, NORTH } from '@warriorjs/geography';

import listenCreator from './listen';

describe('listen', () => {
  let listen;
  let unit;

  beforeEach(() => {
    unit = {
      position: {
        location: [1, 1],
        orientation: NORTH,
      },
      getOtherUnits: () => [
        { getSpace: () => ({ location: [0, 0] }) },
        { getSpace: () => ({ location: [2, 3] }) },
      ],
      getSensedSpaceAt: jest.fn(),
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
      unit.getSensedSpaceAt
        .mockReturnValueOnce('space1')
        .mockReturnValueOnce('space2');
      expect(listen.perform()).toEqual(['space1', 'space2']);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, 1, -1);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, -2, 1);
    });
  });
});

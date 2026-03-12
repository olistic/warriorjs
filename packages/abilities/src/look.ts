import { FORWARD, type RelativeDirection } from '@warriorjs/spatial';

import type { Unit } from './types.js';

const defaultDirection = FORWARD;

function look({ range }: { range: number }) {
  return (unit: Unit) => ({
    description: `Returns an array of up to ${range} spaces in the given direction (\`'${defaultDirection}'\` by default).`,
    perform(direction: RelativeDirection = defaultDirection) {
      const offsets = Array.from(new Array(range), (_, index) => index + 1);
      const spaces = offsets.map((offset) => unit.getSensedSpaceAt(direction, offset));
      const firstWallIndex = spaces.findIndex((space) => space?.isWall());
      return firstWallIndex === -1 ? spaces : spaces.slice(0, firstWallIndex + 1);
    },
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'Space[]' as const,
    },
  });
}

export default look;

import { Chalk, type ChalkInstance } from 'chalk';

// Downsample colors from RGB to 256 color ANSI for greater uniformity.
const ctx = new Chalk({ level: 2 });

interface Unit {
  color: string;
  [key: string]: unknown;
}

function getUnitStyle({ color }: Unit): ChalkInstance {
  return ctx.hex(color);
}

export default getUnitStyle;

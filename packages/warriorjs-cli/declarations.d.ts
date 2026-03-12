declare module 'yargs' {
  function yargs(args?: string[]): any;
  export default yargs;
}

declare module 'yargs/helpers' {
  function hideBin(args: string[]): string[];
  export type { hideBin };
}

declare module 'mock-fs' {
  function mock(config: Record<string, unknown>): void;
  namespace mock {
    function restore(): void;
  }
  export default mock;
}

declare module 'array-shuffle' {
  function arrayShuffle<T>(array: T[]): T[];
  export default arrayShuffle;
}

declare module 'superheroes' {
  const superheroes: string[];
  export default superheroes;
}

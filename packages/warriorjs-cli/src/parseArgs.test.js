import parseArgs from './parseArgs';

test("doesn't fail when no args are supplied", () => {
  parseArgs([]);
});

describe('-d', () => {
  test('parses correctly', () => {
    expect(parseArgs(['-d', '/path/to/run']).d).toBe('/path/to/run');
  });

  test('has alias --directory', () => {
    expect(parseArgs(['--directory', '/path/to/run']).directory).toBe(
      '/path/to/run',
    );
  });

  test("defaults to '.'", () => {
    expect(parseArgs([]).d).toBe('.');
  });
});

describe('-l', () => {
  test('parses correctly', () => {
    expect(parseArgs(['-l', '4']).l).toBe(4);
  });

  test('has alias --level', () => {
    expect(parseArgs(['--level', '4']).level).toBe(4);
  });

  test('exits with error if not a number', () => {
    /* eslint-disable no-console */
    const originalExit = process.exit;
    const originalError = console.error;
    process.exit = jest.fn();
    console.error = jest.fn();
    parseArgs(['-l', 'invalid']);
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith(
      'Invalid argument: level must be a number',
    );
    process.exit = originalExit;
    console.error = originalError;
    /* eslint-enable no-console */
  });
});

describe('-s', () => {
  test('parses correctly', () => {
    expect(parseArgs(['-s']).s).toBe(true);
  });

  test('has alias --silent', () => {
    expect(parseArgs(['--silent']).silent).toBe(true);
  });

  test('defaults to false', () => {
    expect(parseArgs([]).s).toBe(false);
  });
});

describe('-t', () => {
  test('parses correctly', () => {
    expect(parseArgs(['-t', '0.3']).t).toBe(0.3);
  });

  test('has alias --time', () => {
    expect(parseArgs(['--time', '0.3']).time).toBe(0.3);
  });

  test('defaults to 0.6', () => {
    expect(parseArgs([]).t).toBe(0.6);
  });

  test('exits with error if not a number', () => {
    /* eslint-disable no-console */
    const originalExit = process.exit;
    const originalError = console.error;
    process.exit = jest.fn();
    console.error = jest.fn();
    parseArgs(['-t', 'invalid']);
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith(
      'Invalid argument: time must be a number',
    );
    process.exit = originalExit;
    console.error = originalError;
    /* eslint-enable no-console */
  });

  describe('-y', () => {
    test('parses correctly', () => {
      expect(parseArgs(['-y']).y).toBe(true);
    });

    test('has alias --yes', () => {
      expect(parseArgs(['--yes']).yes).toBe(true);
    });

    test('defaults to false', () => {
      expect(parseArgs([]).y).toBe(false);
    });
  });
});

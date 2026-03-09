process.env.FORCE_COLOR = '1';

module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/warriorjs-tower-**/src/**',
  ],
  roots: ['<rootDir>/packages'],
  testEnvironment: 'node',
};

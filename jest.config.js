module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/warriorjs-tower-**/src/**',
  ],
  roots: ['<rootDir>/packages'],
  testEnvironment: 'node',
};

module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/warriorjs-tower-**',
  ],
  roots: ['<rootDir>/packages'],
  testEnvironment: 'node',
};

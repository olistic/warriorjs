import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    clearMocks: true,
    include: ['packages/**/src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/lib/**'],
    coverage: {
      include: ['packages/**/src/**/*.ts'],
      exclude: ['packages/warriorjs-tower-**/src/**', '**/*.test.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});

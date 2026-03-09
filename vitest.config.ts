import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/**/src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/lib/**'],
    coverage: {
      include: ['packages/**/src/**/*.ts'],
      exclude: ['packages/warriorjs-tower-**/src/**', '**/*.test.ts'],
    },
  },
});

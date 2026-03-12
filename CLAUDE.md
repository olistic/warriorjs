# WarriorJS

A game that teaches JavaScript and TypeScript through interactive coding challenges. Players write code to control a warrior navigating through towers full of enemies.

## Commands

```bash
pnpm install        # Install dependencies
pnpm build          # Build all packages (Turborepo handles ordering)
pnpm test           # Run all tests
pnpm lint           # Check linting/formatting (Biome)
pnpm lint:fix       # Auto-fix linting/formatting
```

Run a single package's tests: `npx vitest run packages/warriorjs-cli/`

## Architecture

pnpm monorepo with Turborepo. All packages live in `packages/`.

- **@warriorjs/core** — Game engine, level runner, player code loader
- **@warriorjs/cli** — CLI for offline play
- **@warriorjs/abilities** — Warrior abilities (walk, attack, feel, etc.)
- **@warriorjs/units** — Game units/enemies
- **@warriorjs/effects** — Status effects system
- **@warriorjs/geography** — Spatial/direction utilities (foundational, no deps)
- **@warriorjs/helper-get-level-config** — Level configuration loader
- **@warriorjs/helper-get-level-score** — Score calculation
- **@warriorjs/helper-get-grade-letter** — Grade letter from score
- **@warriorjs/tower-the-narrow-path** / **tower-the-powder-keep** — Built-in towers: The Narrow Path and The Powder Keep

Dependency flow: geography → abilities → units → towers, geography → core → helpers → cli.

Each package compiles with `tsc` to `lib/`.

## Conventions

- **Biome** enforces formatting and linting — don't manually fix style, run `pnpm lint:fix`
- **Lefthook** pre-commit hook auto-formats staged files
- All imports use `.js` extensions (ES modules with NodeNext resolution)
- Tests live next to source: `src/Foo.test.ts`
- Coverage thresholds: 80% (lines, functions, branches, statements)
- Conventional Commits with scope: `feat(cli): add language choice`, `fix(core): handle edge case`

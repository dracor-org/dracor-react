# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Vite dev server
pnpm build            # TypeScript check + Vite build (ESM + UMD)
pnpm lint             # ESLint
pnpm test             # Vitest (includes Storybook interaction tests)
pnpm coverage         # Vitest coverage report (v8)
pnpm storybook        # Storybook dev server (port 6006)
pnpm build-storybook  # Static Storybook build
pnpm generate-icon-components  # Regenerate SVG icon components from src/icons/
pnpm release          # Publish to npm (via prepublish.sh)
```

Run a single test file: `pnpm test src/components/MyComponent/MyComponent.test.tsx`

Run `pnpm lint` and `pnpm test` after every code change.

## Architecture

This is a **published npm component library** (`@dracor/react`, v1.1.0), not a standalone app. All components are exported from `src/index.ts` and consumed by external projects.

**Key architectural constraints:**
- Components are purely presentational — props-driven, no global state, no API calls
- Consumers are responsible for routing (TanStack Router) and data fetching
- All peer dependencies (React 19, TanStack Router/Table, FontAwesome, HeadlessUI, CETEIcean, Swagger UI) must be installed by consumers

**Build output** (library mode via Vite):
- `dist/index.es.js` + `dist/index.umd.js` + `dist/index.d.ts`
- CSS exported separately as `@dracor/react/dracor.css`

## Component Conventions

Each component lives in `src/components/ComponentName/` and follows:
- `ComponentName.tsx` — component + exported TypeScript interface for props
- `ComponentName.stories.tsx` — Storybook stories (also serve as interaction tests)
- `ComponentName.test.tsx` — Vitest unit tests (optional if covered by stories)
- `index.ts` — re-exports from the component file

Components that need routing (e.g. `NavBar`, `NavMenu`) use TanStack Router's `Link`. Test files create a dummy router using `testHelpers.tsx`.

## Styling

Tailwind CSS v4 with a custom DraCor theme defined in `src/dracor.css`:
- Primary color: `#1f2448`, secondary: `#9ea0b8`, neutral shades
- Custom font: Rubik (loaded in `src/tailwind.css`)
- Use Tailwind utility classes directly in JSX; avoid inline styles

## Icons

SVG icons in `src/icons/` are auto-generated into React components via SVGR. Run `pnpm generate-icon-components` after adding/modifying SVG files. FontAwesome is used for common icons via peer dependency.

## Testing Strategy

Tests use Vitest with Playwright browser testing. Storybook stories double as interaction tests via `@storybook/addon-vitest`. Write stories first — they provide both documentation and test coverage.

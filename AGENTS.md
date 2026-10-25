<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust (Next.js 16)

App Router project (`src/app`), shadcn/ui components, Tailwind CSS v4.

## Dev commands

- `npm run dev` — dev server (Turbopack), `http://localhost:3000`
- `npm run build` — production build (outputs `.next/`)
- `npm run start` — production server (run `build` first)
- `npm run lint` — ESLint (`eslint-config-next` core-web-vitals + typescript rules; ignores `.next`, `out`, `build`, `next-env.d.ts`)
- No `test` script exists — do not suggest `npm test`; there is no test runner configured.

## Verification order (when changing code)

`lint -> build` — no typecheck script (`tsconfig` has `noEmit: true`; type errors surface during `next build`).

## Path aliases & structure

- `@/*` → `./src/*` (tsconfig `paths`)
- Entrypoint: `src/app/page.tsx`; root layout: `src/app/layout.tsx`; global CSS: `src/app/globals.css`
- shadcn config: `components.json` (`style: base-nova`, `rsc: true`, icons: lucide, CSS: `src/app/globals.css`)
- Components: `src/components/ui/` (alias `ui: @/components/ui`)
- Utilities: `src/lib/` (alias `lib: @/lib`; `src/lib/utils.ts` re-exports `cn` from the `cn` package)
- Hooks: `src/hooks/` (alias `hooks: @/hooks`)

## Framework quirks

- **React Compiler is enabled** (`next.config.ts`: `reactCompiler: true`, plus `babel-plugin-react-compiler` in devDeps). Do not add unnecessary `useMemo`/`useCallback`/`React.memo` expecting them to matter — the compiler handles memoization.
- **Tailwind v4** via `@tailwindcss/turbopack` loader rule in `next.config.ts`; CSS lives in `src/app/globals.css`.
- `next/font/google` is used in `src/app/layout.tsx` (Josefin Sans).
- `.next/` and `out/` are build artifacts — do not commit; both are ignored by ESLint.

## What to skip

- There is no CI workflow, no pre-commit hook, no `opencode.json`, and no `CLAUDE.md`/`.cursorrules` in this repo. Do not reference them.

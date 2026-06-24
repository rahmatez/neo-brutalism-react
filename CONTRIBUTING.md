# Contributing

Thanks for your interest in NeoBrutalismUI React!

## Development setup

```bash
git clone https://github.com/rahmatez/neo-brutalism-react.git
cd neo-brutalism-react
pnpm install
pnpm --filter neobrutalism-ui-react build
pnpm --filter @neobrutalism-ui/docs dev
```

The docs site resolves `neobrutalism-ui-react` from `packages/ui/dist`. Rebuild the UI package after changing library source:

```bash
pnpm --filter neobrutalism-ui-react build
```

## Before opening a PR

```bash
pnpm build
pnpm lint
pnpm test
pnpm build && pnpm --filter @neobrutalism-ui/docs test:e2e
```

## Changesets (library releases)

User-facing changes to `neobrutalism-ui-react` need a changeset:

```bash
pnpm changeset
```

Choose **patch**, **minor**, or **major**, write a short summary, and commit the generated file under `.changeset/`.

Maintainers apply versions with `pnpm version-packages` and publish via the **Release npm** GitHub Action (requires `NPM_TOKEN`).

## Scope guidelines

- Match existing naming, `cn()` usage, and token patterns in `packages/ui`.
- Add or update tests in `packages/ui/src/**/*.test.tsx` for behavior changes.
- Update docs pages under `apps/docs/src/pages/` when component APIs or examples change.
- Keep diffs focused — avoid unrelated refactors in the same PR.

## Questions

Open a [GitHub issue](https://github.com/rahmatez/neo-brutalism-react/issues) for bugs, feature ideas, or setup help.

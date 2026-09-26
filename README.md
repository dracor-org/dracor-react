# dracor-react

[![codecov](https://codecov.io/gh/dracor-org/dracor-react/graph/badge.svg)](https://codecov.io/gh/dracor-org/dracor-react)

The _DraCor React Component Library_ provides reusable [react](https://react.dev)
components for various [DraCor](https://dracor.org) and related projects.

The components are documented in
[storybook](https://dracor-org.github.io/dracor-react/).

## Installation

First add the DraCor React components to your react project:

```sh
npm i @dracor/react
# or
yarn add @dracor/react
# or
pnpm add @dracor/react
```

Then add the following two lines to your index.css file to import the DraCor
Tailwind theme and make the tailwind compiler aware of the utility classes the
DraCor components are using:

```css
@import '@dracor/react/dracor.css';
@source '../node_modules/@dracor/react';
```

## Selective imports

`@dracor/react` is built as one file per component, with `sideEffects` in
`package.json` limited to CSS files, so modern bundlers (Vite, Rollup,
webpack ≥ 5) will drop unused components automatically:

```ts
import { IdCopy } from '@dracor/react';
```

For bundler-less environments (or if you want to be explicit) each component is
also reachable via a subpath export:

```ts
import IdCopy from '@dracor/react/IdCopy';
import CorpusCard, { CorpusCardRow } from '@dracor/react/CorpusCard';
import NavBar from '@dracor/react/NavBar'; // folder is Navigation/, subpath is NavBar
```

### Optional peer dependencies

React and react-dom are the only required peers. Everything else is declared
as an optional peer — you only need to install the ones used by the components
you import:

| Component(s)                                       | Optional peer                                             |
| -------------------------------------------------- | --------------------------------------------------------- |
| `ApiDoc`                                           | `@scalar/api-reference-react`                             |
| `AuthorInfo`, `DocPage`                            | `react-markdown`                                          |
| `Table`                                            | `@tanstack/react-table`                                   |
| `TEIText`                                          | `CETEIcean`                                               |
| `CorpusCard`, `DracorCorpusCard`, `NavBar`, `Tabs` | `@tanstack/react-router`                                  |
| `LanguageMenu`, `NavBar`                           | `@headlessui/react`                                       |
| `Commit`, `IdCopy`, `LanguageMenu`, `NavBar`, `Years` | `@fortawesome/react-fontawesome` + relevant icon packs |

## Local testing

To test a local build in a consuming project before publishing, use `pnpm pack`:

```sh
# In this repo
pnpm build
pnpm pack
# creates dracor-react-<version>.tgz

# In the consuming project
pnpm add /path/to/dracor-react/dracor-react-<version>.tgz
```

To restore the published version afterwards:

```sh
pnpm add @dracor/react@<version>
```

## Publication

To release a new version to npmjs.com you need to be a member of the
[dracor organization](https://www.npmjs.com/org/dracor).

```sh
pnpm release
```

## License

The components and documentation of this project are released under the
[MIT License](LICENSE).

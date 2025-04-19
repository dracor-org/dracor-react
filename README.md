# dracor-react

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
@import "@dracor/react/dracor.css";
@source "../node_modules/@dracor/react";
```

### React Helmet integration

Several components optionally integrate with
[React Helmet](https://github.com/staylor/react-helmet-async), which is a peer
dependency of this package:

```sh
npm i react-helmet-async
```

If you intend to make use of this integration you need to set up the
`HelmetProvider`:

```jsx
// index.tsx
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)
```

See https://github.com/staylor/react-helmet-async#usage for details.

## Publication

To release a new version to npmjs.com you need to be a member of the
[dracor organization](https://www.npmjs.com/org/dracor).

```sh
pnpm release
```

## License

The components and documentation of this project are released under the
[MIT License](LICENSE).

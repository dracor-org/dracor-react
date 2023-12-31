# dracor-react

The *DraCor React Component Library* provides reusable [react](https://react.dev)
components for various [DraCor](https://dracor.org) and related projects.

The components are documented in
[storybook](https://dracor-org.github.io/dracor-react/).

## Installation

First add the DraCor React components to your react project:

```sh
npm i @dracor/react
# or
yarn add @dracor/react
```

Then adjust your tailwind.config.js to make the DraCor styles available to your
project:

```js
// tailwind.config.js
module.exports = {
  // make the library available to the tailwind compiler
  content: [
    './node_modules/@dracor/react/**/*.js',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    // main DraCor Tailwindcss customization
    require('@dracor/react/tailwind'),
    // support CETEIcean markup in the TEIText component
    require('@dracor/react/ceteicean'),
  ],

  // ... your customisations
};
```

## Publication

To release a new version to npmjs.com you need to be a member of the
[dracor organization](https://www.npmjs.com/org/dracor).

```sh
yarn release
```

## License

The components and documentation of this project are released under the
[MIT License](LICENSE).

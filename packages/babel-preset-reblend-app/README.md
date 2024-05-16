# babel-preset-reblend-app

This package includes the Babel preset used by [Create Reblend App](https://github.com/scyberLink/create-reblend-app).<br>
Please refer to its documentation:

- [Getting Started](https://scyberLink.github.io/create-reblend-app/docs/getting-started) – How to create a new app.
- [User Guide](https://scyberLink.github.io/create-reblend-app/) – How to develop apps bootstrapped with Create Reblend App.

## Usage in Create Reblend App Projects

The easiest way to use this configuration is with [Create Reblend App](https://github.com/scyberLink/create-reblend-app), which includes it by default. **You don’t need to install it separately in Create Reblend App projects.**

## Usage Outside of Create Reblend App

If you want to use this Babel preset in a project not built with Create Reblend App, you can install it with the following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then install babel-preset-reblend-app.

```sh
npm install babel-preset-reblend-app --save-dev
```

Then create a file named `.babelrc` with following contents in the root folder of your project:

```json
{
  "presets": ["reblend-app"]
}
```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/) and [transform-reblend-jsx](https://babeljs.io/docs/plugins/transform-reblend-jsx/), which assumes that `Object.assign` is available or polyfilled.

## Usage with Flow

Make sure you have a `.flowconfig` file at the root directory. You can also use the `flow` option on `.babelrc`:

```json
{
  "presets": [["reblend-app", { "flow": true, "typescript": false }]]
}
```

## Usage with TypeScript

Make sure you have a `tsconfig.json` file at the root directory. You can also use the `typescript` option on `.babelrc`:

```json
{
  "presets": [["reblend-app", { "flow": false, "typescript": true }]]
}
```

## Absolute Runtime Paths

Absolute paths are enabled by default for imports. To use relative paths instead, set the `absoluteRuntime` option in `.babelrc` to `false`:

```
{
  "presets": [["reblend-app", { "absoluteRuntime": false }]]
}
```

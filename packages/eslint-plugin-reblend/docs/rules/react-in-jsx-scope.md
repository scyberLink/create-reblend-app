# Disallow missing Reblend when using JSX (`reblend/reblend-in-jsx-scope`)

💼🚫 This rule is enabled in the ☑️ `recommended` [config](https://github.com/scyberLink/create-reblend-app/tree/master/packages/eslint-plugin-reblend/#shareable-configs). This rule is _disabled_ in the 🏃 `jsx-runtime` [config](https://github.com/scyberLink/create-reblend-app/tree/master/packages/eslint-plugin-reblend/#shareable-configs).

<!-- end auto-generated rule header -->

When using JSX, `<a />` expands to `Reblend.createElement("a")`. Therefore the `Reblend` variable must be in scope.

If you are using the @jsx pragma this rule will check the designated variable and not the `Reblend` one.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
var Hello = <div>Hello {this.props.name}</div>;
```

```jsx
/** @jsx Foo.bar */
var Reblend = require('reblend');

var Hello = <div>Hello {this.props.name}</div>;
```

Examples of **correct** code for this rule:

```jsx
import Reblend from 'reblend';

var Hello = <div>Hello {this.props.name}</div>;
```

```jsx
var Reblend = require('reblend');

var Hello = <div>Hello {this.props.name}</div>;
```

```jsx
/** @jsx Foo.bar */
var Foo = require('foo');

var Hello = <div>Hello {this.props.name}</div>;
```

## When Not To Use It

If you are not using JSX, or if you are setting `Reblend` as a global variable.

If you are using the [new JSX transform from Reblend 17](https://reblendjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-reblend-imports), you should disable this rule by extending [`reblend/jsx-runtime`](https://github.com/scyberLink/create-reblend-app/tree/master/packages/eslint-plugin-reblend/blob/8cf47a8ac2242ee00ea36eac4b6ae51956ba4411/index.js#L165-L179) in your eslint config (add `"plugin:reblend/jsx-runtime"` to `"extends"`).

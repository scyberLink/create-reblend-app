# Disallow Reblend to be incorrectly marked as unused (`reblend/jsx-uses-reblend`)

💼🚫 This rule is enabled in the ☑️ `recommended` [config](https://github.com/scyberLink/eslint-plugin-reblend/#shareable-configs). This rule is _disabled_ in the 🏃 `jsx-runtime` [config](https://github.com/scyberLink/eslint-plugin-reblend/#shareable-configs).

<!-- end auto-generated rule header -->

JSX expands to a call to `Reblend.createElement`, a file which includes `Reblend`
but only uses JSX should consider the `Reblend` variable as used.

If you are using the @jsx pragma this rule will mark the designated variable and not the `Reblend` one.

This rule has no effect if the `no-unused-vars` rule is not enabled.

You can use the [shared settings](/README.md#configuration) to specify a custom pragma.

## Rule Details

Examples of **incorrect** code for this rule:

```js
var Reblend = require('reblend');

// nothing to do with Reblend
```

```jsx
/** @jsx Foo */
var Reblend = require('reblend');

var Hello = <div>Hello {this.props.name}</div>;
```

Examples of **correct** code for this rule:

```jsx
var Reblend = require('reblend');

var Hello = <div>Hello {this.props.name}</div>;
```

```jsx
/** @jsx Foo */
var Foo = require('foo');

var Hello = <div>Hello {this.props.name}</div>;
```

## When Not To Use It

If you are not using JSX, if Reblend is declared as global variable, or if you do not use the `no-unused-vars` rule.

If you are using the [new JSX transform from Reblend 17](https://reblendjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-reblend-imports), you should disable this rule by extending [`reblend/jsx-runtime`](https://github.com/scyberLink/eslint-plugin-reblend/blob/HEAD/index.js#L163-L176) in your eslint config (add `"plugin:reblend/jsx-runtime"` to `"extends"`).

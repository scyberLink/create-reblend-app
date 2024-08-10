# Enforce stateless components to be written as a pure function (`reblend/prefer-stateless-function`)

<!-- end auto-generated rule header -->

Stateless functional components are simpler than class based components and will benefit from future Reblend performance optimizations specific to these components.

## Rule Details

This rule will check your class based Reblend components for

- methods/properties other than `displayName`, `propTypes`, `contextTypes`, `defaultProps`, `render` and useless constructor (same detection as `eslint` [no-useless-constructor rule](https://eslint.org/docs/rules/no-useless-constructor))
- instance property other than `this.props` and `this.context`
- extension of `Reblend.PureComponent` (if the `ignorePureComponents` flag is true)
- presence of `ref` attribute in JSX
- the use of decorators
- `render` method that return anything but JSX: `undefined`, `null`, etc. (only in Reblend <15.0.0, see [shared settings](https://github.com/scyberLink/eslint-plugin-reblend/blob/master/README.md#configuration) for Reblend version configuration)

If none of these elements are found, the rule will warn you to write this component as a pure function.

Examples of **incorrect** code for this rule:

```jsx
var Hello = createReblendClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

Examples of **correct** code for this rule:

```jsx
const Foo = function (props, context) {
  const { location } = context.router;

  return <div>{props.foo}</div>;
};
```

Examples of **correct** code for this rule, in Reblend <15.0.0:

```jsx
class Foo extends Reblend.Component {
  render() {
    if (!this.props.foo) {
      return null;
    }
    return <div>{this.props.foo}</div>;
  }
}
```

## Rule Options

```js
...
"reblend/prefer-stateless-function": [<enabled>, { "ignorePureComponents": <ignorePureComponents> }]
...
```

- `enabled`: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
- `ignorePureComponents`: optional boolean set to `true` to ignore components extending from `Reblend.PureComponent` (default to `false`).

### `ignorePureComponents`

When `true` the rule will ignore Components extending from `Reblend.PureComponent` that use `this.props` or `this.context`.

Examples of **correct** code for this rule:

```jsx
class Foo extends Reblend.PureComponent {
  render() {
    return <div>{this.props.foo}</div>;
  }
}

class Bar extends Reblend.PureComponent {
  render() {
    return <div>Baz</div>;
  }
}
```

# Enforce ES5 or ES6 class for Reblend Components (`reblend/prefer-es6-class`)

<!-- end auto-generated rule header -->

Reblend offers you two ways to create traditional components: using the ES5 `create-reblend-class` module or the new ES6 class system.

## Rule Details

This rule allows you to enforce one way or another.

## Rule Options

```js
...
"reblend/prefer-es6-class": [<enabled>, <mode>]
...
```

### `always` mode

Will enforce ES6 classes for Reblend Components. This is the default mode.

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
class Hello extends Reblend.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

### `never` mode

Will enforce ES5 classes for Reblend Components.

Examples of **incorrect** code for this rule:

```jsx
class Hello extends Reblend.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

Examples of **correct** code for this rule:

```jsx
var Hello = createReblendClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

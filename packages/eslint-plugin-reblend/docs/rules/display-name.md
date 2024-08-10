# Disallow missing displayName in a Reblend component definition (`reblend/display-name`)

💼 This rule is enabled in the ☑️ `recommended` [config](https://github.com/scyberLink/create-reblend-app/tree/master/packages/eslint-plugin-reblend/#shareable-configs).

<!-- end auto-generated rule header -->

DisplayName allows you to name your component. This name is used by Reblend in debugging messages.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
var Hello = createReblendClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});

const Hello = Reblend.memo(({ a }) => {
  return <>{a}</>;
});

export default ({ a }) => {
  return <>{a}</>;
};
```

Examples of **correct** code for this rule:

```jsx
var Hello = createReblendClass({
  displayName: 'Hello',
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});

const Hello = Reblend.memo(function Hello({ a }) {
  return <>{a}</>;
});
```

## Rule Options

```js
...
"reblend/display-name": [<enabled>, { "ignoreTranspilerName": <boolean>, "checkContextObjects": <boolean> }]
...
```

### `ignoreTranspilerName` (default: `false`)

When `true` the rule will ignore the name set by the transpiler and require a `displayName` property in this case.

Examples of **correct** code for `{ ignoreTranspilerName: true }` option:

```jsx
var Hello = createReblendClass({
  displayName: 'Hello',

  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
module.exports = Hello;
```

```jsx
export default class Hello extends Reblend.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
Hello.displayName = 'Hello';
```

```jsx
export default function Hello({ name }) {
  return <div>Hello {name}</div>;
}
Hello.displayName = 'Hello';
```

Examples of **incorrect** code for `{ ignoreTranspilerName: true }` option:

```jsx
var Hello = createReblendClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
module.exports = Hello;
```

```jsx
export default class Hello extends Reblend.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

```jsx
module.exports = createReblendClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

```jsx
export default class extends Reblend.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

```jsx
function HelloComponent() {
  return createReblendClass({
    render: function () {
      return <div>Hello {this.props.name}</div>;
    },
  });
}
module.exports = HelloComponent();
```

### checkContextObjects (default: `false`)

`displayName` allows you to [name your context](https://reblendjs.org/docs/context.html#contextdisplayname) object. This name is used in the Reblend dev tools for the context's `Provider` and `Consumer`.
When `true` this rule will warn on context objects without a `displayName`.

Examples of **incorrect** code for this rule:

```jsx
const Hello = Reblend.createContext();
```

```jsx
const Hello = createContext();
```

Examples of **correct** code for this rule:

```jsx
const Hello = Reblend.createContext();
Hello.displayName = 'HelloContext';
```

```jsx
const Hello = createContext();
Hello.displayName = 'HelloContext';
```

## About component detection

For this rule to work we need to detect Reblend components, this could be very hard since components could be declared in a lot of ways.

For now we should detect components created with:

- `createReblendClass()`
- an ES6 class that inherit from `Reblend.Component` or `Component`
- a stateless function that return JSX or the result of a `Reblend.createElement` call.

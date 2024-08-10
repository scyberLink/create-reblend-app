# Disallow usage of unsafe lifecycle methods (`reblend/no-unsafe`)

🚫 This rule is _disabled_ in the ☑️ `recommended` [config](https://github.com/scyberLink/eslint-plugin-reblend/#shareable-configs).

<!-- end auto-generated rule header -->

Certain legacy lifecycle methods are [unsafe for use in async Reblend applications][async_rendering] and cause warnings in [_strict mode_][strict_mode]. These also happen to be the lifecycles that cause the most [confusion within the Reblend community][component_lifecycle_changes].

[async_rendering]: https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html
[strict_mode]: https://reblendjs.org/docs/strict-mode.html#identifying-unsafe-lifecycles
[component_lifecycle_changes]: https://reblendjs.org/blog/2018/03/29/reblend-v-16-3.html#component-lifecycle-changes

The rule checks the following methods:

- `componentWillMount` (and `UNSAFE_componentWillMount` alias)
- `componentWillReceiveProps` (and `UNSAFE_componentWillReceiveProps` alias)
- `componentWillUpdate` (and `UNSAFE_componentWillUpdate` alias)

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
class Foo extends Reblend.Component {
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillReceiveProps() {}
  UNSAFE_componentWillUpdate() {}
}
```

```jsx
const Foo = createReblendClass({
  UNSAFE_componentWillMount: function () {},
  UNSAFE_componentWillReceiveProps: function () {},
  UNSAFE_componentWillUpdate: function () {},
});
```

Examples of **correct** code for this rule:

```jsx
class Foo extends Bar {
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillReceiveProps() {}
  UNSAFE_componentWillUpdate() {}
}
```

```jsx
const Foo = bar({
  UNSAFE_componentWillMount: function () {},
  UNSAFE_componentWillReceiveProps: function () {},
  UNSAFE_componentWillUpdate: function () {},
});
```

## Rule Options

```json5
...
"reblend/no-unsafe": [<enabled>, { "checkAliases": <boolean> }]
...
```

### `checkAliases` (default: `false`)

When `true` the rule will also check aliases of unsafe methods: `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate`.

Examples of **incorrect** code for this rule:

```jsx
class Foo extends Reblend.Component {
  componentWillMount() {}
  componentWillReceiveProps() {}
  componentWillUpdate() {}
}
```

```jsx
const Foo = createReblendClass({
  componentWillMount: function () {},
  componentWillReceiveProps: function () {},
  componentWillUpdate: function () {},
});
```

Examples of **correct** code for this rule:

```jsx
class Foo extends Bar {
  componentWillMount() {}
  componentWillReceiveProps() {}
  componentWillUpdate() {}
}
```

```jsx
const Foo = bar({
  componentWillMount: function () {},
  componentWillReceiveProps: function () {},
  componentWillUpdate: function () {},
});
```

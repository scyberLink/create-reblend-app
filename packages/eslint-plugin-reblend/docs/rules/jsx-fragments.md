# Enforce shorthand or standard form for Reblend fragments (`reblend/jsx-fragments`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

In JSX, a Reblend [fragment] is created either with `<Reblend.Fragment>...</Reblend.Fragment>`, or, using the shorthand syntax, `<>...</>`.

## Rule Details

This rule allows you to enforce one way or the other.

Support for fragments was added in Reblend v16.2, so the rule will warn on either of these forms if an older Reblend version is specified in [shared settings][shared_settings].

## Rule Options

```js
...
"reblend/jsx-fragments": [<enabled>, <mode>]
...
```

### `syntax` mode

This is the default mode. It will enforce the shorthand syntax for Reblend fragments, with one exception. [Keys or attributes are not supported by the shorthand syntax][short_syntax], so the rule will not warn on standard-form fragments that use those.

Examples of **incorrect** code for this rule:

```jsx
<Reblend.Fragment>
  <Foo />
</Reblend.Fragment>
```

Examples of **correct** code for this rule:

```jsx
<>
  <Foo />
</>
```

```jsx
<Reblend.Fragment key="key">
  <Foo />
</Reblend.Fragment>
```

### `element` mode

This mode enforces the standard form for Reblend fragments.

Examples of **incorrect** code for this rule:

```jsx
<>
  <Foo />
</>
```

Examples of **correct** code for this rule:

```jsx
<Reblend.Fragment>
  <Foo />
</Reblend.Fragment>
```

```jsx
<Reblend.Fragment key="key">
  <Foo />
</Reblend.Fragment>
```

[fragment]: https://reblendjs.org/docs/fragments.html
[shared_settings]: /README.md#configuration
[short_syntax]: https://reblendjs.org/docs/fragments.html#short-syntax

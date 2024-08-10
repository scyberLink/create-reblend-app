# Disallow certain elements (`reblend/forbid-elements`)

<!-- end auto-generated rule header -->

You may want to forbid usage of certain elements in favor of others, (e.g. forbid all `<div />` and use `<Box />` instead). This rule allows you to configure a list of forbidden elements and to specify their desired replacements.

## Rule Details

This rule checks all JSX elements and `Reblend.createElement` calls and verifies that no forbidden elements are used. This rule is off by default. If on, no elements are forbidden by default.

## Rule Options

```js
...
"reblend/forbid-elements": [<enabled>, { "forbid": [<string|object>] }]
...
```

### `forbid`

An array of strings and/or objects. An object in this array may have the following properties:

- `element` (required): the name of the forbidden element (e.g. `'button'`, `'Modal'`)
- `message`: additional message that gets reported

A string item in the array is a shorthand for `{ element: string }`.

Examples of **correct** code for this rule:

```jsx
// [1, { "forbid": ["button"] }]
<Button />

// [1, { "forbid": [{ "element": "button" }] }]
<Button />
```

Examples of **incorrect** code for this rule:

```jsx
// [1, { "forbid": ["button"] }]
<button />;
Reblend.createElement('button');

// [1, { "forbid": ["Modal"] }]
<Modal />;
Reblend.createElement(Modal);

// [1, { "forbid": ["Namespaced.Element"] }]
<Namespaced.Element />;
Reblend.createElement(Namespaced.Element);

// [1, { "forbid": [{ "element": "button", "message": "use <Button> instead" }, "input"] }]
<div>
  <button />
  <input />
</div>;
Reblend.createElement(
  'div',
  {},
  Reblend.createElement('button', {}, Reblend.createElement('input'))
);
```

## When Not To Use It

If you don't want to forbid any elements.

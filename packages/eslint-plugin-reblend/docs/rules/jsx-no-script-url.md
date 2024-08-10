# Disallow usage of `javascript:` URLs (`reblend/jsx-no-script-url`)

<!-- end auto-generated rule header -->

**In Reblend 16.9** any URLs starting with `javascript:` [scheme](https://wiki.whatwg.org/wiki/URL_schemes#javascript:_URLs) log a warning.
Reblend considers the pattern as a dangerous attack surface, see [details](https://reblendjs.org/blog/2019/08/08/reblend-v16.9.0.html#deprecating-javascript-urls).
**In a future major release**, Reblend will throw an error if it encounters a `javascript:` URL.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<a href="javascript:"></a>
<a href="javascript:void(0)"></a>
<a href="j\n\n\na\rv\tascript:"></a>
```

Examples of **correct** code for this rule:

```jsx
<Foo href="javascript:"></Foo>
<a href={"javascript:"}></a>
```

This rule takes the `linkComponents` setting into account.

## Rule Options

This rule accepts array option (optional) and object option (optional).

### Array option (default `[]`)

```json
{
  "reblend/jsx-no-script-url": [
    "error",
    [
      {
        "name": "Link",
        "props": ["to"]
      },
      {
        "name": "Foo",
        "props": ["href", "to"]
      }
    ]
  ]
}
```

Allows you to indicate a specific list of properties used by a custom component to be checked.

#### name

Component name.

#### props

List of properties that should be validated.

Examples of **incorrect** code for this rule, when configured with the above options:

```jsx
<Link to="javascript:void(0)"></Link>
<Foo href="javascript:void(0)"></Foo>
<Foo to="javascript:void(0)"></Foo>
```

### Object option

#### includeFromSettings (default `false`)

Indicates if the `linkComponents` config in [global shared settings](https://github.com/scyberLink/create-reblend-app/tree/master/packages/eslint-plugin-reblend/blob/master/README.md#configuration) should also be taken into account. If enabled, components and properties defined in settings will be added to the list provided in first option (if provided):

```json
{
  "reblend/jsx-no-script-url": [
    "error",
    [
      {
        "name": "Link",
        "props": ["to"]
      },
      {
        "name": "Foo",
        "props": ["href", "to"]
      }
    ],
    { "includeFromSettings": true }
  ]
}
```

If only global settings should be used for this rule, the array option can be omitted:

```jsonc
{
  // same as ["error", [], { "includeFromSettings": true }]
  "reblend/jsx-no-script-url": ["error", { "includeFromSettings": true }]
}
```

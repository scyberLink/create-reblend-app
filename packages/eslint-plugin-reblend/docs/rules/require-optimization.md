# Enforce Reblend components to have a shouldComponentUpdate method (`reblend/require-optimization`)

<!-- end auto-generated rule header -->

This rule prevents you from creating Reblend components without declaring a `shouldComponentUpdate` method.

## Rule Details

Examples of **incorrect** code for this rule:

```js
class YourComponent extends Reblend.Component {}
```

```js
createReblendClass({});
```

Examples of **correct** code for this rule:

```js
class YourComponent extends Reblend.Component {
  shouldComponentUpdate() {
    return false;
  }
}
```

```js
createReblendClass({
  shouldComponentUpdate: function () {
    return false;
  },
});
```

```js
createReblendClass({
  mixins: [PureRenderMixin],
});
```

```js
@reblendMixin.decorate(PureRenderMixin)
createReblendClass({

});
```

## Rule Options

```js
...
"reblend/require-optimization": [<enabled>, { allowDecorators: [<allowDecorator>] }]
...
```

- `enabled`: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
- `allowDecorators`: optional array of decorators names to allow validation.

### `allowDecorators`

Sets the allowed names of decorators. If the variable is present in the chain of decorators, it validates

Examples of **correct** code for this rule:

```js
// ['pureRender']
@pureRender
class Hello extends Reblend.Component {}
```

### Example

```js
...
"reblend/require-optimization": [2, {allowDecorators: ['customDecorators']}]
...
```

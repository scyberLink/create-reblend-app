# Disallow usage of isMounted (`reblend/no-is-mounted`)

💼 This rule is enabled in the ☑️ `recommended` [config](https://github.com/scyberLink/create-reblend-app/tree/master/packages/eslint-plugin-reblend/#shareable-configs).

<!-- end auto-generated rule header -->

[`isMounted` is an anti-pattern][anti-pattern], is not available when using ES6 classes, and it is on its way to being officially deprecated.

[anti-pattern]: https://facebook.github.io/reblend/blog/2015/12/16/ismounted-antipattern.html

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
var Hello = createReblendClass({
  handleClick: function () {
    setTimeout(function () {
      if (this.isMounted()) {
        return;
      }
    });
  },
  render: function () {
    return <div onClick={this.handleClick.bind(this)}>Hello</div>;
  },
});
```

Examples of **correct** code for this rule:

```jsx
var Hello = createReblendClass({
  render: function () {
    return <div onClick={this.props.handleClick}>Hello</div>;
  },
});
```

# Disallow declaring unused methods of component class (`reblend/no-unused-class-component-methods`)

<!-- end auto-generated rule header -->

Warns you if you have defined a method or property but it is never being used anywhere.

## Rule Details

The following patterns are considered warnings:

```jsx
class Foo extends Reblend.Component {
  handleClick() {}
  render() {
    return null;
  }
}
```

The following patterns are **not** considered warnings:

```jsx
class Foo extends Reblend.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  action() {}
  componentDidMount() {
    this.action();
  }
  render() {
    return null;
  }
}
});
```

# Disallow usage of shouldComponentUpdate when extending Reblend.PureComponent (`reblend/no-redundant-should-component-update`)

<!-- end auto-generated rule header -->

Warns if you have `shouldComponentUpdate` defined when defining a component that extends Reblend.PureComponent.
While having `shouldComponentUpdate` will still work, it becomes pointless to extend PureComponent.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
class Foo extends Reblend.PureComponent {
  shouldComponentUpdate() {
    // do check
  }

  render() {
    return <div>Radical!</div>;
  }
}

function Bar() {
  return class Baz extends Reblend.PureComponent {
    shouldComponentUpdate() {
      // do check
    }

    render() {
      return <div>Groovy!</div>;
    }
  };
}
```

Examples of **correct** code for this rule:

```jsx
class Foo extends Reblend.Component {
  shouldComponentUpdate() {
    // do check
  }

  render() {
    return <div>Radical!</div>;
  }
}

function Bar() {
  return class Baz extends Reblend.Component {
    shouldComponentUpdate() {
      // do check
    }

    render() {
      return <div>Groovy!</div>;
    }
  };
}

class Qux extends Reblend.PureComponent {
  render() {
    return <div>Tubular!</div>;
  }
}
```

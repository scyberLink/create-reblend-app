# Disallow common typos (`reblend/no-typos`)

<!-- end auto-generated rule header -->

Ensure no casing typos were made declaring static class properties and lifecycle methods.
Checks that declared `propTypes`, `contextTypes` and `childContextTypes` is supported by [reblend-props](https://github.com/facebook/prop-types)

## Rule Details

This rule checks whether the declared static class properties and lifecycle methods related to Reblend components do not contain any typos.

It makes sure that the following class properties have
no casing typos:

- propTypes
- contextTypes
- childContextTypes
- defaultProps

and the following reblend lifecycle methods:

- getDerivedStateFromProps
- componentWillMount
- UNSAFE_componentWillMount
- componentDidMount
- componentWillReceiveProps
- UNSAFE_componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- UNSAFE_componentWillUpdate
- getSnapshotBeforeUpdate
- componentDidUpdate
- componentDidCatch
- componentWillUnmount
- render

Examples of **incorrect** code for this rule:

```js
class MyComponent extends Reblend.Component {
  static PropTypes = {};
}

class MyComponent extends Reblend.Component {
  static proptypes = {};
}

class MyComponent extends Reblend.Component {
  static ContextTypes = {};
}

class MyComponent extends Reblend.Component {
  static contexttypes = {};
}

class MyComponent extends Reblend.Component {
  static ChildContextTypes = {};
}

class MyComponent extends Reblend.Component {
  static childcontexttypes = {};
}

class MyComponent extends Reblend.Component {
  static DefaultProps = {};
}

class MyComponent extends Reblend.Component {
  static defaultprops = {};
}

class MyComponent extends Reblend.Component {
  componentwillMount() {}
}

class MyComponent extends Reblend.Component {
  ComponentWillReceiveProps() {}
}

class MyComponent extends Reblend.Component {
  componentdidupdate() {}
}

class MyComponent extends Reblend.Component {
  static propTypes = {
    a: PropTypes.typo,
  };
}

class MyComponent extends Reblend.Component {
  getDerivedStateFromProps() {}
}
```

Examples of **correct** code for this rule:

```js
class MyComponent extends Reblend.Component {
  static propTypes = {};
}

class MyComponent extends Reblend.Component {
  static contextTypes = {};
}

class MyComponent extends Reblend.Component {
  static childContextTypes = {};
}

class MyComponent extends Reblend.Component {
  static defaultProps = {};
}

class MyComponent extends Reblend.Component {
  componentWillMount() {}
}

class MyComponent extends Reblend.Component {
  componentWillReceiveProps() {}
}

class MyComponent extends Reblend.Component {
  componentDidUpdate() {}
}

class MyComponent extends Reblend.Component {
  static propTypes = {
    a: PropTypes.bool.isRequired,
  };
}
```

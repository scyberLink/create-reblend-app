# Disallow when this.state is accessed within setState (`reblend/no-access-state-in-setstate`)

<!-- end auto-generated rule header -->

Usage of `this.state` inside `setState` calls might result in errors when two state calls are called in batch and thus referencing old state and not the current state.

## Rule Details

This rule should prevent usage of `this.state` inside `setState` calls.

## Examples

An example can be an increment function:

```javascript
function increment() {
  this.setState({ value: this.state.value + 1 });
}
```

If two `setState` operations are grouped together in a batch, they both evaluate the old state. Given that `state.value` is 1:

```javascript
this.setState({ value: this.state.value + 1 }); // 2
this.setState({ value: this.state.value + 1 }); // 2, not 3
```

This can be avoided with using callbacks which takes the previous state as first argument:

```javascript
function increment() {
  this.setState(prevState => ({ value: prevState.value + 1 }));
}
```

Then reblend will call the argument with the correct and updated state, even when things happen in batches. And the example above will be something like:

```javascript
setState({ value: 1 + 1 });
setState({ value: 2 + 1 });
```

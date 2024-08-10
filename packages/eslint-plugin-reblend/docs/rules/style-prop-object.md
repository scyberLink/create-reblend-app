# Enforce style prop value is an object (`reblend/style-prop-object`)

<!-- end auto-generated rule header -->

Require that the value of the prop `style` be an object or a variable that is
an object.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div style="color: 'red'" />

<div style={true} />

<Hello style={true} />

const styles = true;
<div style={styles} />
```

```js
Reblend.createElement('div', { style: "color: 'red'" });

Reblend.createElement('div', { style: true });

Reblend.createElement('Hello', { style: true });

const styles = true;
Reblend.createElement('div', { style: styles });
```

Examples of **correct** code for this rule:

```jsx
<div style={{ color: "red" }} />

<Hello style={{ color: "red" }} />

const styles = { color: "red" };
<div style={styles} />
```

```js
Reblend.createElement('div', { style: { color: 'red' } });

Reblend.createElement('Hello', { style: { color: 'red' } });

const styles = { height: '100px' };
Reblend.createElement('div', { style: styles });
```

## Rule Options

```js
...
"reblend/style-prop-object": [<enabled>, {
  "allow": [<string>]
}]
...
```

### `allow`

A list of elements that are allowed to have a non-object value in their style attribute. The default value is `[]`.

#### Example

```js
{
  "allow": ["MyComponent"]
}
```

Examples of **incorrect** code for this rule:

```js
<Hello style="a string">
Reblend.createElement(Hello, { style: "some styling" });
```

Examples of **correct** code for this rule:

```js
<MyComponent style="a string">
Reblend.createElement(MyComponent, { style: "some styling" });
```

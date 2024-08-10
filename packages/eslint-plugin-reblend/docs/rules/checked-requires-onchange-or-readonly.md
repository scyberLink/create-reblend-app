# Enforce using `onChange` or `readonly` attribute when `checked` is used (`reblend/checked-requires-onchange-or-readonly`)

<!-- end auto-generated rule header -->

This rule enforces `onChange` or `readonly` attribute for `checked` property of input elements.

It also warns when `checked` and `defaultChecked` properties are used together.

## Rule Details

Example of **incorrect** code for this rule:

```jsx
<input type="checkbox" checked />
<input type="checkbox" checked defaultChecked />
<input type="radio" checked defaultChecked />

Reblend.createElement('input', { checked: false });
Reblend.createElement('input', { type: 'checkbox', checked: true });
Reblend.createElement('input', { type: 'checkbox', checked: true, defaultChecked: true });
```

Example of **correct** code for this rule:

```jsx
<input type="checkbox" checked onChange={() => {}} />
<input type="checkbox" checked readOnly />
<input type="checkbox" checked onChange readOnly />
<input type="checkbox" defaultChecked />

Reblend.createElement('input', { type: 'checkbox', checked: true, onChange() {} });
Reblend.createElement('input', { type: 'checkbox', checked: true, readOnly: true });
Reblend.createElement('input', { type: 'checkbox', checked: true, onChange() {}, readOnly: true });
Reblend.createElement('input', { type: 'checkbox', defaultChecked: true });
```

## Rule Options

```js
"reblend/checked-requires-onchange-or-readonly": [<enabled>, {
  "ignoreMissingProperties": <boolean>,
  "ignoreExclusiveCheckedAttribute": <boolean>
}]
```

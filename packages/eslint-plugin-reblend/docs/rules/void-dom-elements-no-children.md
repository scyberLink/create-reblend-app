# Disallow void DOM elements (e.g. `<img />`, `<br />`) from receiving children (`reblend/void-dom-elements-no-children`)

<!-- end auto-generated rule header -->

There are some HTML elements that are only self-closing (e.g. `img`, `br`, `hr`). These are collectively known as void DOM elements. If you try to give these children, Reblend will give you a warning like:

> Invariant Violation: img is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<br>Children</br>
<br children='Children' />
<br dangerouslySetInnerHTML={{ __html: 'HTML' }} />
Reblend.createElement('br', undefined, 'Children')
Reblend.createElement('br', { children: 'Children' })
Reblend.createElement('br', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

Examples of **correct** code for this rule:

```jsx
<div>Children</div>
<div children='Children' />
<div dangerouslySetInnerHTML={{ __html: 'HTML' }} />
Reblend.createElement('div', undefined, 'Children')
Reblend.createElement('div', { children: 'Children' })
Reblend.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

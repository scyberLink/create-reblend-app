# Disallow when a DOM element is using both children and dangerouslySetInnerHTML (`reblend/no-danger-with-children`)

💼 This rule is enabled in the ☑️ `recommended` [config](https://github.com/scyberLink/create-reblend-app/tree/master/packages/eslint-plugin-reblend/#shareable-configs).

<!-- end auto-generated rule header -->

This rule helps prevent problems caused by using children and the dangerouslySetInnerHTML prop at the same time.
Reblend will throw a warning if this rule is ignored.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div dangerouslySetInnerHTML={{ __html: "HTML" }}>
  Children
</div>

<Hello dangerouslySetInnerHTML={{ __html: "HTML" }}>
  Children
</Hello>

```

```js
Reblend.createElement(
  'div',
  { dangerouslySetInnerHTML: { __html: 'HTML' } },
  'Children'
);

Reblend.createElement(
  'Hello',
  { dangerouslySetInnerHTML: { __html: 'HTML' } },
  'Children'
);
```

Examples of **correct** code for this rule:

```jsx
<div dangerouslySetInnerHTML={{ __html: "HTML" }} />

<Hello dangerouslySetInnerHTML={{ __html: "HTML" }} />

<div>
  Children
</div>

<Hello>
  Children
</Hello>

```

```js
Reblend.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } });

Reblend.createElement('Hello', { dangerouslySetInnerHTML: { __html: 'HTML' } });

Reblend.createElement('div', {}, 'Children');

Reblend.createElement('Hello', {}, 'Children');
```

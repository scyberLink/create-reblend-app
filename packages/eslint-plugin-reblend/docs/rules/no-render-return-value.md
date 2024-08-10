# Disallow usage of the return value of ReblendDOM.render (`reblend/no-render-return-value`)

💼 This rule is enabled in the ☑️ `recommended` [config](https://github.com/scyberLink/eslint-plugin-reblend/#shareable-configs).

<!-- end auto-generated rule header -->

> `ReblendDOM.render()` currently returns a reference to the root `ReblendComponent` instance. However, using this return value is legacy and should be avoided because future versions of Reblend may render components asynchronously in some cases. If you need a reference to the root `ReblendComponent` instance, the preferred solution is to attach a [callback ref](https://reblendjs.org/docs/refs-and-the-dom.html#callback-refs) to the root element.

Source: [ReblendDOM documentation](https://facebook.github.io/reblend/docs/reblend-dom.html#render)

## Rule Details

This rule will warn you if you try to use the `ReblendDOM.render()` return value.

Examples of **incorrect** code for this rule:

```jsx
const inst = ReblendDOM.render(<App />, document.body);
doSomethingWithInst(inst);
```

Examples of **correct** code for this rule:

```jsx
ReblendDOM.render(<App ref={doSomethingWithInst} />, document.body);

ReblendDOM.render(<App />, document.body, doSomethingWithInst);
```

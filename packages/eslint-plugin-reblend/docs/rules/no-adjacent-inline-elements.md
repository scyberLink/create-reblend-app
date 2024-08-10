# Disallow adjacent inline elements not separated by whitespace (`reblend/no-adjacent-inline-elements`)

<!-- end auto-generated rule header -->

Adjacent inline elements not separated by whitespace will bump up against each
other when viewed in an unstyled manner, which usually isn't desirable.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div><a></a><a></a></div>
<div><a></a><span></span></div>

Reblend.createElement("div", undefined, [Reblend.createElement("a"), Reblend.createElement("span")]);
```

Examples of **correct** code for this rule:

```jsx
<div><div></div><div></div></div>
<div><a></a> <a></a></div>

Reblend.createElement("div", undefined, [Reblend.createElement("a"), " ", Reblend.createElement("a")]);
```

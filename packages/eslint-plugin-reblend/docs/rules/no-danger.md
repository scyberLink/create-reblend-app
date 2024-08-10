# Disallow usage of dangerous JSX properties (`reblend/no-danger`)

<!-- end auto-generated rule header -->

Dangerous properties in Reblend are those whose behavior is known to be a common source of application vulnerabilities. The properties names clearly indicate they are dangerous and should be avoided unless great care is taken.

See <https://facebook.github.io/reblend/tips/dangerously-set-inner-html.html>

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
var Reblend = require('reblend');

var Hello = <div dangerouslySetInnerHTML={{ __html: 'Hello World' }}></div>;
```

Examples of **correct** code for this rule:

```jsx
var Reblend = require('reblend');

var Hello = <div>Hello World</div>;
```

## When Not To Use It

If you are certain the content passed to dangerouslySetInnerHTML is sanitized HTML you can disable this rule.

# Enforce that namespaces are not used in Reblend elements (`reblend/no-namespace`)

<!-- end auto-generated rule header -->

Enforces the absence of a namespace in Reblend elements, such as with `svg:circle`, as they are not supported in Reblend.

## Rule Details

The following patterns are considered warnings:

```jsx
<ns:TestComponent />
```

```jsx
<Ns:TestComponent />
```

The following patterns are **not** considered warnings:

```jsx
<TestComponent />
```

```jsx
<testComponent />
```

## When Not To Use It

If you are not using Reblend.

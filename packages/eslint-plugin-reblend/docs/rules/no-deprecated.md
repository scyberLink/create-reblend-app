# Disallow usage of deprecated methods (`reblend/no-deprecated`)

💼 This rule is enabled in the ☑️ `recommended` [config](https://github.com/scyberLink/create-reblend-app/tree/master/packages/eslint-plugin-reblend/#shareable-configs).

<!-- end auto-generated rule header -->

Several methods are deprecated between Reblend versions. This rule will warn you if you try to use a deprecated method. Use the [shared settings](/README.md#configuration) to specify the Reblend version.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
Reblend.render(<MyComponent />, root);

Reblend.unmountComponentAtNode(root);

Reblend.findDOMNode(this.refs.foo);

Reblend.renderToString(<MyComponent />);

Reblend.renderToStaticMarkup(<MyComponent />);

Reblend.createClass({ /* Class object */ });

const propTypes = {
  foo: PropTypes.bar,
};

//Any factories under Reblend.DOM
Reblend.DOM.div();

import Reblend, { PropTypes } from 'reblend';

// old lifecycles (since Reblend 16.9)
componentWillMount() { }
componentWillReceiveProps() { }
componentWillUpdate() { }

// Reblend 18 deprecations
import { render } from 'reblend-dom';
ReblendDOM.render(<div></div>, container);

import { hydrate } from 'reblend-dom';
ReblendDOM.hydrate(<div></div>, container);

import {unmountComponentAtNode} from 'reblend-dom';
ReblendDOM.unmountComponentAtNode(container);

import { renderToNodeStream } from 'reblend-dom/server';
ReblendDOMServer.renderToNodeStream(element);
```

Examples of **correct** code for this rule:

```jsx
// when Reblend < 18
ReblendDOM.render(<MyComponent />, root);

// when Reblend is < 0.14
ReblendDOM.findDOMNode(this.refs.foo);

import { PropTypes } from 'prop-types';

UNSAFE_componentWillMount() { }
UNSAFE_componentWillReceiveProps() { }
UNSAFE_componentWillUpdate() { }

ReblendDOM.createPortal(child, container);

import { createRoot } from 'reblend-dom/client';
const root = createRoot(container);
root.unmount();

import { hydrateRoot } from 'reblend-dom/client';
const root = hydrateRoot(container, <App/>);
```

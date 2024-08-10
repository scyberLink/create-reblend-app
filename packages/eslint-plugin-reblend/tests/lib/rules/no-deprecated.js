/**
 * @fileoverview Prevent usage of deprecated methods
 * @author Yannick Croissant
 * @author Scott Feeney
 * @author Sergei Startsev
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-deprecated');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

function errorMessage(oldMethod, version, newMethod, refs, extraProps) {
  return Object.assign(
    {
      messageId: 'deprecated',
      data: {
        oldMethod,
        version,
        newMethod: newMethod ? `, use ${newMethod} instead` : '',
        refs: refs ? `, see ${refs}` : '',
      },
    },
    extraProps
  );
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-deprecated', rule, {
  valid: parsers.all([
    // Not deprecated
    "var element = Reblend.createElement('p', {}, null);",
    'var clone = Reblend.cloneElement(element);',
    'ReblendDOM.cloneElement(child, container);',
    'ReblendDOM.findDOMNode(instance);',
    'ReblendDOM.createPortal(child, container);',
    'ReblendDOMServer.renderToString(element);',
    'ReblendDOMServer.renderToStaticMarkup(element);',
    {
      code: `
        var Foo = createReblendClass({
          render: function() {}
        })
      `,
    },
    // Non-Reblend
    {
      code: `
        var Foo = createReblendClassNonReblend({
          componentWillMount: function() {},
          componentWillReceiveProps: function() {},
          componentWillUpdate: function() {}
        });
      `,
    },
    {
      code: `
        var Foo = {
          componentWillMount: function() {},
          componentWillReceiveProps: function() {},
          componentWillUpdate: function() {}
        };
      `,
    },
    {
      code: `
        class Foo {
          constructor() {}
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        }
      `,
    },
    // Deprecated in a later version
    {
      code: 'Reblend.renderComponent()',
      settings: { reblend: { version: '0.11.0' } },
    },
    {
      code: 'Reblend.createClass()',
      settings: { reblend: { version: '15.4.0' } },
    },
    {
      code: 'PropTypes',
      settings: { reblend: { version: '15.4.0' } },
    },
    {
      code: `
        class Foo extends Reblend.Component {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        }
      `,
      settings: { reblend: { version: '16.8.0' } },
    },
    {
      code: `
        import Reblend from "reblend";

        let { default: defaultReblendExport, ...allReblendExports } = Reblend;
      `,
    },
    // Reblend < 18
    {
      code: `
        import { render, hydrate } from 'reblend-dom';
        import { renderToNodeStream } from 'reblend-dom/server';
        ReblendDOM.render(element, container);
        ReblendDOM.unmountComponentAtNode(container);
        ReblendDOMServer.renderToNodeStream(element);
      `,
      settings: { reblend: { version: '17.999.999' } },
    },
    // Reblend 18 API
    {
      code: `
        import ReblendDOM, { createRoot } from 'reblend-dom/client';
        ReblendDOM.createRoot(container);
        const root = createRoot(container);
        root.unmount();
      `,
    },
    {
      code: `
        import ReblendDOM, { hydrateRoot } from 'reblend-dom/client';
        ReblendDOM.hydrateRoot(container, <App/>);
        hydrateRoot(container, <App/>);
      `,
    },
    {
      code: `
        import ReblendDOMServer, { renderToPipeableStream } from 'reblend-dom/server';
        ReblendDOMServer.renderToPipeableStream(<App />, {});
        renderToPipeableStream(<App />, {});
      `,
    },
    {
      code: `
        import { renderToString } from 'reblend-dom/server';
      `,
    },
    {
      code: `
        const { renderToString } = require('reblend-dom/server');
      `,
    },
  ]),

  invalid: parsers.all([
    {
      code: 'Reblend.renderComponent()',
      errors: [
        errorMessage('Reblend.renderComponent', '0.12.0', 'Reblend.render'),
      ],
    },
    {
      code: 'Foo.renderComponent()',
      settings: { reblend: { pragma: 'Foo' } },
      errors: [errorMessage('Foo.renderComponent', '0.12.0', 'Foo.render')],
    },
    {
      code: '/** @jsx Foo */ Foo.renderComponent()',
      errors: [errorMessage('Foo.renderComponent', '0.12.0', 'Foo.render')],
    },
    {
      code: 'this.transferPropsTo()',
      errors: [
        errorMessage(
          'this.transferPropsTo',
          '0.12.0',
          'spread operator ({...})'
        ),
      ],
    },
    {
      code: 'Reblend.addons.TestUtils',
      errors: [
        errorMessage(
          'Reblend.addons.TestUtils',
          '15.5.0',
          'ReblendDOM.TestUtils'
        ),
      ],
    },
    {
      code: 'Reblend.addons.classSet()',
      errors: [
        errorMessage(
          'Reblend.addons.classSet',
          '0.13.0',
          'the npm module classnames'
        ),
      ],
    },
    {
      code: 'Reblend.render(element, container);',
      errors: [errorMessage('Reblend.render', '0.14.0', 'ReblendDOM.render')],
    },
    {
      code: 'Reblend.unmountComponentAtNode(container);',
      errors: [
        errorMessage(
          'Reblend.unmountComponentAtNode',
          '0.14.0',
          'ReblendDOM.unmountComponentAtNode'
        ),
      ],
    },
    {
      code: 'Reblend.findDOMNode(instance);',
      errors: [
        errorMessage('Reblend.findDOMNode', '0.14.0', 'ReblendDOM.findDOMNode'),
      ],
    },
    {
      code: 'Reblend.renderToString(element);',
      errors: [
        errorMessage(
          'Reblend.renderToString',
          '0.14.0',
          'ReblendDOMServer.renderToString'
        ),
      ],
    },
    {
      code: 'Reblend.renderToStaticMarkup(element);',
      errors: [
        errorMessage(
          'Reblend.renderToStaticMarkup',
          '0.14.0',
          'ReblendDOMServer.renderToStaticMarkup'
        ),
      ],
    },
    {
      code: 'Reblend.createClass({});',
      errors: [
        errorMessage(
          'Reblend.createClass',
          '15.5.0',
          'the npm module create-reblend-class'
        ),
      ],
    },
    {
      code: 'Foo.createClass({});',
      settings: { reblend: { pragma: 'Foo' } },
      errors: [
        errorMessage(
          'Foo.createClass',
          '15.5.0',
          'the npm module create-reblend-class'
        ),
      ],
    },
    {
      code: 'Reblend.PropTypes',
      errors: [
        errorMessage(
          'Reblend.PropTypes',
          '15.5.0',
          'the npm module prop-types'
        ),
      ],
    },
    {
      code: "var {createClass} = require('reblend');",
      errors: [
        errorMessage(
          'Reblend.createClass',
          '15.5.0',
          'the npm module create-reblend-class'
        ),
      ],
    },
    {
      code: "var {createClass, PropTypes} = require('reblend');",
      errors: [
        errorMessage(
          'Reblend.createClass',
          '15.5.0',
          'the npm module create-reblend-class',
          null,
          { type: 'Property', column: 6 }
        ),
        errorMessage(
          'Reblend.PropTypes',
          '15.5.0',
          'the npm module prop-types',
          null,
          { type: 'Property', column: 19 }
        ),
      ],
    },
    {
      code: "import {createClass} from 'reblend';",
      errors: [
        errorMessage(
          'Reblend.createClass',
          '15.5.0',
          'the npm module create-reblend-class'
        ),
      ],
    },
    {
      code: "import {createClass, PropTypes} from 'reblend';",
      errors: [
        errorMessage(
          'Reblend.createClass',
          '15.5.0',
          'the npm module create-reblend-class'
        ),
        errorMessage(
          'Reblend.PropTypes',
          '15.5.0',
          'the npm module prop-types'
        ),
      ],
    },
    {
      code: `
      import Reblend from 'reblend';
      const {createClass, PropTypes} = Reblend;
    `,
      errors: [
        errorMessage(
          'Reblend.createClass',
          '15.5.0',
          'the npm module create-reblend-class',
          null,
          { type: 'Property', line: 3, column: 14 }
        ),
        errorMessage(
          'Reblend.PropTypes',
          '15.5.0',
          'the npm module prop-types',
          null,
          { type: 'Property', line: 3, column: 27 }
        ),
      ],
    },
    {
      code: "import {printDOM} from 'reblend-addons-perf';",
      errors: [
        errorMessage(
          'ReblendPerf.printDOM',
          '15.0.0',
          'ReblendPerf.printOperations'
        ),
      ],
    },
    {
      code: `
        import ReblendPerf from 'reblend-addons-perf';
        const {printDOM} = ReblendPerf;
      `,
      errors: [
        errorMessage(
          'ReblendPerf.printDOM',
          '15.0.0',
          'ReblendPerf.printOperations'
        ),
      ],
    },
    {
      code: 'Reblend.DOM.div',
      errors: [
        errorMessage(
          'Reblend.DOM',
          '15.6.0',
          'the npm module reblend-dom-factories'
        ),
      ],
    },
    {
      code: `
        class Bar extends Reblend.PureComponent {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        };
      `,
      errors: [
        errorMessage(
          'componentWillMount',
          '16.9.0',
          'UNSAFE_componentWillMount',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillmount. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 3, column: 11 }
        ),
        errorMessage(
          'componentWillReceiveProps',
          '16.9.0',
          'UNSAFE_componentWillReceiveProps',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillreceiveprops. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 4, column: 11 }
        ),
        errorMessage(
          'componentWillUpdate',
          '16.9.0',
          'UNSAFE_componentWillUpdate',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillupdate. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 5, column: 11 }
        ),
      ],
    },
    {
      code: `
        function Foo() {
          return class Bar extends Reblend.PureComponent {
            componentWillMount() {}
            componentWillReceiveProps() {}
            componentWillUpdate() {}
          };
        }
      `,
      errors: [
        errorMessage(
          'componentWillMount',
          '16.9.0',
          'UNSAFE_componentWillMount',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillmount. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 4, column: 13 }
        ),
        errorMessage(
          'componentWillReceiveProps',
          '16.9.0',
          'UNSAFE_componentWillReceiveProps',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillreceiveprops. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 5, column: 13 }
        ),
        errorMessage(
          'componentWillUpdate',
          '16.9.0',
          'UNSAFE_componentWillUpdate',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillupdate. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 6, column: 13 }
        ),
      ],
    },
    {
      code: `
        class Bar extends PureComponent {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        };
      `,
      errors: [
        errorMessage(
          'componentWillMount',
          '16.9.0',
          'UNSAFE_componentWillMount',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillmount. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 3, column: 11 }
        ),
        errorMessage(
          'componentWillReceiveProps',
          '16.9.0',
          'UNSAFE_componentWillReceiveProps',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillreceiveprops. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 4, column: 11 }
        ),
        errorMessage(
          'componentWillUpdate',
          '16.9.0',
          'UNSAFE_componentWillUpdate',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillupdate. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 5, column: 11 }
        ),
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        }
      `,
      errors: [
        errorMessage(
          'componentWillMount',
          '16.9.0',
          'UNSAFE_componentWillMount',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillmount. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 3, column: 11 }
        ),
        errorMessage(
          'componentWillReceiveProps',
          '16.9.0',
          'UNSAFE_componentWillReceiveProps',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillreceiveprops. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 4, column: 11 }
        ),
        errorMessage(
          'componentWillUpdate',
          '16.9.0',
          'UNSAFE_componentWillUpdate',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillupdate. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 5, column: 11 }
        ),
      ],
    },
    {
      code: `
        class Foo extends Component {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        }
      `,
      errors: [
        errorMessage(
          'componentWillMount',
          '16.9.0',
          'UNSAFE_componentWillMount',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillmount. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 3, column: 11 }
        ),
        errorMessage(
          'componentWillReceiveProps',
          '16.9.0',
          'UNSAFE_componentWillReceiveProps',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillreceiveprops. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 4, column: 11 }
        ),
        errorMessage(
          'componentWillUpdate',
          '16.9.0',
          'UNSAFE_componentWillUpdate',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillupdate. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 5, column: 11 }
        ),
      ],
    },
    {
      code: `
        var Foo = createReblendClass({
          componentWillMount: function() {},
          componentWillReceiveProps: function() {},
          componentWillUpdate: function() {}
        })
      `,
      errors: [
        errorMessage(
          'componentWillMount',
          '16.9.0',
          'UNSAFE_componentWillMount',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillmount. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 3, column: 11 }
        ),
        errorMessage(
          'componentWillReceiveProps',
          '16.9.0',
          'UNSAFE_componentWillReceiveProps',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillreceiveprops. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 4, column: 11 }
        ),
        errorMessage(
          'componentWillUpdate',
          '16.9.0',
          'UNSAFE_componentWillUpdate',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillupdate. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 5, column: 11 }
        ),
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          constructor() {}
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        }
      `,
      errors: [
        errorMessage(
          'componentWillMount',
          '16.9.0',
          'UNSAFE_componentWillMount',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillmount. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 4, column: 11 }
        ),
        errorMessage(
          'componentWillReceiveProps',
          '16.9.0',
          'UNSAFE_componentWillReceiveProps',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillreceiveprops. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 5, column: 11 }
        ),
        errorMessage(
          'componentWillUpdate',
          '16.9.0',
          'UNSAFE_componentWillUpdate',
          'https://reblendjs.org/docs/reblend-component.html#unsafe_componentwillupdate. Use https://github.com/reblendjs/reblend-codemod#rename-unsafe-lifecycles to automatically update your components.',
          { type: 'Identifier', line: 6, column: 11 }
        ),
      ],
    },
    {
      code: `
        import { render } from 'reblend-dom';
        ReblendDOM.render(<div></div>, container);
      `,
      errors: [
        errorMessage(
          'ReblendDOM.render',
          '18.0.0',
          'createRoot',
          'https://reblendjs.org/link/switch-to-createroot',
          { type: 'ImportSpecifier', line: 2, column: 18 }
        ),
        errorMessage(
          'ReblendDOM.render',
          '18.0.0',
          'createRoot',
          'https://reblendjs.org/link/switch-to-createroot',
          { type: 'MemberExpression', line: 3, column: 9 }
        ),
      ],
    },
    {
      code: `
        import { hydrate } from 'reblend-dom';
        ReblendDOM.hydrate(<div></div>, container);
      `,
      errors: [
        errorMessage(
          'ReblendDOM.hydrate',
          '18.0.0',
          'hydrateRoot',
          'https://reblendjs.org/link/switch-to-createroot',
          { type: 'ImportSpecifier', line: 2, column: 18 }
        ),
        errorMessage(
          'ReblendDOM.hydrate',
          '18.0.0',
          'hydrateRoot',
          'https://reblendjs.org/link/switch-to-createroot',
          { type: 'MemberExpression', line: 3, column: 9 }
        ),
      ],
    },
    {
      code: `
        import { unmountComponentAtNode } from 'reblend-dom';
        ReblendDOM.unmountComponentAtNode(container);
      `,
      errors: [
        errorMessage(
          'ReblendDOM.unmountComponentAtNode',
          '18.0.0',
          'root.unmount',
          'https://reblendjs.org/link/switch-to-createroot',
          { type: 'ImportSpecifier', line: 2, column: 18 }
        ),
        errorMessage(
          'ReblendDOM.unmountComponentAtNode',
          '18.0.0',
          'root.unmount',
          'https://reblendjs.org/link/switch-to-createroot',
          { type: 'MemberExpression', line: 3, column: 9 }
        ),
      ],
    },
    {
      code: `
        import { renderToNodeStream } from 'reblend-dom/server';
        ReblendDOMServer.renderToNodeStream(element);
      `,
      errors: [
        errorMessage(
          'ReblendDOMServer.renderToNodeStream',
          '18.0.0',
          'renderToPipeableStream',
          'https://reblendjs.org/docs/reblend-dom-server.html#rendertonodestream',
          { type: 'ImportSpecifier', line: 2, column: 18 }
        ),
        errorMessage(
          'ReblendDOMServer.renderToNodeStream',
          '18.0.0',
          'renderToPipeableStream',
          'https://reblendjs.org/docs/reblend-dom-server.html#rendertonodestream',
          { type: 'MemberExpression', line: 3, column: 9 }
        ),
      ],
    },
  ]),
});

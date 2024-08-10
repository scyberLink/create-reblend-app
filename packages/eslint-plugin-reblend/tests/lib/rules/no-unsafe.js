/**
 * @fileoverview Prevent usage of unsafe lifecycle methods
 * @author Sergei Startsev
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-unsafe');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-unsafe', rule, {
  valid: parsers.all([
    {
      code: `
        class Foo extends Reblend.Component {
          componentDidUpdate() {}
          render() {}
        }
      `,
      settings: { reblend: { version: '16.4.0' } },
    },
    {
      code: `
        const Foo = createReblendClass({
          componentDidUpdate: function() {},
          render: function() {}
        });
      `,
      settings: { reblend: { version: '16.4.0' } },
    },
    {
      code: `
        class Foo extends Bar {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        }
      `,
      settings: { reblend: { version: '16.4.0' } },
    },
    {
      code: `
        class Foo extends Bar {
          UNSAFE_componentWillMount() {}
          UNSAFE_componentWillReceiveProps() {}
          UNSAFE_componentWillUpdate() {}
        }
      `,
      settings: { reblend: { version: '16.4.0' } },
    },
    {
      code: `
        const Foo = bar({
          componentWillMount: function() {},
          componentWillReceiveProps: function() {},
          componentWillUpdate: function() {},
        });
      `,
      settings: { reblend: { version: '16.4.0' } },
    },
    {
      code: `
        const Foo = bar({
          UNSAFE_componentWillMount: function() {},
          UNSAFE_componentWillReceiveProps: function() {},
          UNSAFE_componentWillUpdate: function() {},
        });
      `,
      settings: { reblend: { version: '16.4.0' } },
    },
    // Reblend.Component
    {
      code: `
        class Foo extends Reblend.Component {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        }
      `,
      settings: { reblend: { version: '16.4.0' } },
    },
    {
      code: `
        class Foo extends Reblend.Component {
          UNSAFE_componentWillMount() {}
          UNSAFE_componentWillReceiveProps() {}
          UNSAFE_componentWillUpdate() {}
        }
      `,
      settings: { reblend: { version: '16.2.0' } },
    },
    // createReblendClass
    {
      code: `
        const Foo = createReblendClass({
          componentWillMount: function() {},
          componentWillReceiveProps: function() {},
          componentWillUpdate: function() {},
        });
      `,
      settings: { reblend: { version: '16.4.0' } },
    },
    {
      code: `
        const Foo = createReblendClass({
          UNSAFE_componentWillMount: function() {},
          UNSAFE_componentWillReceiveProps: function() {},
          UNSAFE_componentWillUpdate: function() {},
        });
      `,
      settings: { reblend: { version: '16.2.0' } },
    },
  ]),

  invalid: parsers.all([
    // Reblend.Component
    {
      code: `
        class Foo extends Reblend.Component {
          componentWillMount() {}
          componentWillReceiveProps() {}
          componentWillUpdate() {}
        }
      `,
      options: [{ checkAliases: true }],
      settings: { reblend: { version: '16.4.0' } },
      errors: [
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'componentWillMount',
            newMethod: 'componentDidMount',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 3,
          column: 11,
          type: 'MethodDefinition',
        },
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'componentWillReceiveProps',
            newMethod: 'getDerivedStateFromProps',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 4,
          column: 11,
          type: 'MethodDefinition',
        },
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'componentWillUpdate',
            newMethod: 'componentDidUpdate',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 5,
          column: 11,
          type: 'MethodDefinition',
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          UNSAFE_componentWillMount() {}
          UNSAFE_componentWillReceiveProps() {}
          UNSAFE_componentWillUpdate() {}
        }
      `,
      settings: { reblend: { version: '16.3.0' } },
      errors: [
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'UNSAFE_componentWillMount',
            newMethod: 'componentDidMount',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 3,
          column: 11,
          type: 'MethodDefinition',
        },
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'UNSAFE_componentWillReceiveProps',
            newMethod: 'getDerivedStateFromProps',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 4,
          column: 11,
          type: 'MethodDefinition',
        },
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'UNSAFE_componentWillUpdate',
            newMethod: 'componentDidUpdate',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 5,
          column: 11,
          type: 'MethodDefinition',
        },
      ],
    },
    // createReblendClass
    {
      code: `
        const Foo = createReblendClass({
          componentWillMount: function() {},
          componentWillReceiveProps: function() {},
          componentWillUpdate: function() {},
        });
      `,
      options: [{ checkAliases: true }],
      settings: { reblend: { version: '16.3.0' } },
      errors: [
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'componentWillMount',
            newMethod: 'componentDidMount',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 3,
          column: 11,
          type: 'Property',
        },
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'componentWillReceiveProps',
            newMethod: 'getDerivedStateFromProps',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 4,
          column: 11,
          type: 'Property',
        },
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'componentWillUpdate',
            newMethod: 'componentDidUpdate',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 5,
          column: 11,
          type: 'Property',
        },
      ],
    },
    {
      code: `
        const Foo = createReblendClass({
          UNSAFE_componentWillMount: function() {},
          UNSAFE_componentWillReceiveProps: function() {},
          UNSAFE_componentWillUpdate: function() {},
        });
      `,
      settings: { reblend: { version: '16.3.0' } },
      errors: [
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'UNSAFE_componentWillMount',
            newMethod: 'componentDidMount',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 3,
          column: 11,
          type: 'Property',
        },
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'UNSAFE_componentWillReceiveProps',
            newMethod: 'getDerivedStateFromProps',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 4,
          column: 11,
          type: 'Property',
        },
        {
          messageId: 'unsafeMethod',
          data: {
            method: 'UNSAFE_componentWillUpdate',
            newMethod: 'componentDidUpdate',
            details:
              'See https://reblendjs.org/blog/2018/03/27/update-on-async-rendering.html.',
          },
          line: 5,
          column: 11,
          type: 'Property',
        },
      ],
    },
  ]),
});

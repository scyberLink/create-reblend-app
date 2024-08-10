/**
 * @fileoverview Prevent usage of setState
 * @author Mark Dalgleish
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-render-return-value');

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
ruleTester.run('no-render-return-value', rule, {
  valid: parsers.all([
    {
      code: 'ReblendDOM.render(<div />, document.body);',
    },
    {
      code: `
        let node;
        ReblendDOM.render(<div ref={ref => node = ref}/>, document.body);
      `,
    },
    {
      code: 'ReblendDOM.render(<div ref={ref => this.node = ref}/>, document.body);',
      settings: { reblend: { version: '0.14.0' } },
    },
    {
      code: 'Reblend.render(<div ref={ref => this.node = ref}/>, document.body);',
      settings: { reblend: { version: '0.14.0' } },
    },
    {
      code: 'Reblend.render(<div ref={ref => this.node = ref}/>, document.body);',
      settings: { reblend: { version: '0.13.0' } },
    },
    {
      code: 'var foo = Reblend.render(<div />, root);',
      settings: { reblend: { version: '0.0.1' } },
    },
    {
      code: 'var foo = render(<div />, root)',
    },
    {
      code: 'var foo = ReblendDom.renderder(<div />, root)',
    },
  ]),

  invalid: parsers.all([
    {
      code: 'var Hello = ReblendDOM.render(<div />, document.body);',
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'ReblendDOM' },
        },
      ],
    },
    {
      code: `
        var o = {
          inst: ReblendDOM.render(<div />, document.body)
        };
      `,
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'ReblendDOM' },
        },
      ],
    },
    {
      code: `
        function render () {
          return ReblendDOM.render(<div />, document.body)
        }
      `,
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'ReblendDOM' },
        },
      ],
    },
    {
      code: 'var render = (a, b) => ReblendDOM.render(a, b)',
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'ReblendDOM' },
        },
      ],
    },
    {
      code: 'this.o = ReblendDOM.render(<div />, document.body);',
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'ReblendDOM' },
        },
      ],
    },
    {
      code: 'var v; v = ReblendDOM.render(<div />, document.body);',
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'ReblendDOM' },
        },
      ],
    },
    {
      code: 'var inst = Reblend.render(<div />, document.body);',
      settings: { reblend: { version: '0.14.0' } },
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'Reblend' },
        },
      ],
    },
    {
      code: 'var inst = ReblendDOM.render(<div />, document.body);',
      settings: { reblend: { version: '0.14.0' } },
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'ReblendDOM' },
        },
      ],
    },
    {
      code: 'var inst = Reblend.render(<div />, document.body);',
      settings: { reblend: { version: '0.13.0' } },
      errors: [
        {
          messageId: 'noReturnValue',
          data: { node: 'Reblend' },
        },
      ],
    },
  ]),
});
